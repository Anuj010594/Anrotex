# Copyright 2026 Anrotex IT Systems LLP.
# Learning and evaluation only: https://www.anrotex.com/downloads-policy
import os
import sys
from http.server import BaseHTTPRequestHandler, HTTPServer

message = os.environ.get("APP_MESSAGE", "").strip()
if not message:
    print("Startup failed: APP_MESSAGE is required.", file=sys.stderr)
    raise SystemExit(1)


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path not in ("/", "/health"):
            self.send_error(404)
            return
        body = ("ok\n" if self.path == "/health" else message + "\n").encode()
        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


port = int(os.environ.get("DEMO_PORT", "18080"))
with HTTPServer(("127.0.0.1", port), Handler) as server:
    print(f"Listening on http://127.0.0.1:{server.server_port}", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
