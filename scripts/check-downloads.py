"""Check archive integrity and reject unreviewed files, without AWS or network access."""
from hashlib import sha256
from pathlib import Path
from shutil import copy2, copytree
from tempfile import TemporaryDirectory
from zipfile import ZipFile
import subprocess
import sys

ROOT = Path(__file__).resolve().parent.parent
DOWNLOADS = ROOT / "public/downloads"
MEMBERS = {"lambda-rollback/" + name for name in
           ["README.txt", "TERMS.txt", "release.py", "smoke.py", "test_release.py"]}

with ZipFile(DOWNLOADS / "lambda-rollback-tests.zip") as archive:
    assert set(archive.namelist()) == MEMBERS and len(archive.namelist()) == len(MEMBERS)
    assert archive.testzip() is None
    for info in archive.infolist():
        assert (info.external_attr >> 16) & 0o170000 == 0o100000
        assert archive.read(info.filename) == (DOWNLOADS / info.filename).read_bytes(), info.filename
    with TemporaryDirectory(prefix="anrotex-download-tests-") as directory:
        archive.extractall(directory)  # Only the exact, checked member names above.
        subprocess.run([sys.executable, "-B", "-m", "unittest", "-v", "test_release"],
                       cwd=Path(directory) / "lambda-rollback", check=True)

for line in (DOWNLOADS / "SHA256SUMS.txt").read_text().splitlines():
    fingerprint, name = line.split("  ")
    assert sha256((DOWNLOADS / name).read_bytes()).hexdigest() == fingerprint, name

with TemporaryDirectory(prefix="anrotex-package-checks-") as directory:
    fixture = Path(directory)
    (fixture / "scripts").mkdir()
    target = fixture / "public/downloads"
    copytree(DOWNLOADS, target)
    script = fixture / "scripts/prepare-downloads.mjs"
    copy2(ROOT / "scripts/prepare-downloads.mjs", script)

    def prepare(succeeds):
        result = subprocess.run(["node", str(script)], capture_output=True, text=True)
        assert (result.returncode == 0) is succeeds, result.stderr
        if not succeeds:
            assert "Unreviewed" in result.stderr or "symbolic link" in result.stderr

    prepare(True)
    assert (target / "lambda-rollback-tests.zip").read_bytes() == (DOWNLOADS / "lambda-rollback-tests.zip").read_bytes()
    (target / "lambda-rollback-tests.zip").write_bytes(b"stale or replaced archive")
    prepare(True)
    assert (target / "lambda-rollback-tests.zip").read_bytes() == (DOWNLOADS / "lambda-rollback-tests.zip").read_bytes()
    extra = target / "unexpected.py"
    extra.write_text("raise RuntimeError('must never ship or execute')")
    prepare(False)
    extra.unlink()
    workflow = target / "node-ci.yml"
    workflow.unlink()
    workflow.symlink_to(DOWNLOADS / "node-ci.yml")
    prepare(False)
    workflow.unlink()
    copy2(DOWNLOADS / "node-ci.yml", workflow)
    real = fixture / "reviewed-downloads"
    target.rename(real)
    target.symlink_to(real, target_is_directory=True)
    prepare(False)

print("Archive, fingerprints, isolated tests and package rejection checks passed.")
