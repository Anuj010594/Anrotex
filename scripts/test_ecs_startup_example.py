"""Exercise the exact Python source displayed in the ECS article."""
import os
from pathlib import Path
import select
import subprocess
import sys
import unittest
from urllib.error import HTTPError
from urllib.request import urlopen

APP = Path(__file__).resolve().parents[1] / "src/content/examples/ecs_startup.py"


class StartupExampleTests(unittest.TestCase):
    def test_missing_and_blank_settings_stop_before_serving(self):
        for value in (None, "", "   "):
            with self.subTest(message=value):
                env = {**os.environ, "DEMO_PORT": "0"}
                env.pop("APP_MESSAGE", None)
                if value is not None:
                    env["APP_MESSAGE"] = value
                result = subprocess.run(
                    [sys.executable, "-B", str(APP)], env=env,
                    capture_output=True, text=True, timeout=5,
                )
                self.assertEqual(result.returncode, 1)
                self.assertEqual(result.stderr, "Startup failed: APP_MESSAGE is required.\n")
                self.assertEqual(result.stdout, "")

    def test_configured_app_serves_health_and_requests(self):
        env = {**os.environ, "APP_MESSAGE": "hello", "DEMO_PORT": "0"}
        with subprocess.Popen(
            [sys.executable, "-B", str(APP)], env=env,
            stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True,
        ) as app:
            try:
                ready, _, _ = select.select([app.stdout], [], [], 5)
                self.assertTrue(ready, "Application did not report readiness")
                line = app.stdout.readline().strip()
                self.assertRegex(line, r"^Listening on http://127\.0\.0\.1:\d+$")
                base = line.removeprefix("Listening on ")
                for path, expected in [("/health", b"ok\n"), ("/", b"hello\n"), ("/health", b"ok\n")]:
                    with urlopen(base + path, timeout=3) as response:
                        self.assertEqual(response.status, 200)
                        self.assertEqual(response.read(), expected)
                with self.assertRaises(HTTPError) as missing:
                    urlopen(base + "/missing", timeout=3)
                self.assertEqual(missing.exception.code, 404)
                missing.exception.close()
                self.assertIsNone(app.poll(), "Application exited after handling requests")
            finally:
                app.terminate()
                try:
                    app.wait(timeout=5)
                except subprocess.TimeoutExpired:
                    app.kill()
                    app.wait(timeout=5)


if __name__ == "__main__":
    unittest.main()
