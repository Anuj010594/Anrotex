LAMBDA ROLLBACK WALKTHROUGH

72 seconds, 1080 x 1350, 30 fps. All information is on screen; no audio.
The video follows a local execution of the site's downloadable release/check code with simulated AWS responses. It does not record a live AWS deployment or claim a client result.

From the repository root:
python3 -B scripts/capture-lambda-demo.py

Saved run: public/media/lambda-rollback/demo-results.json
The composition uses src/demo-results.json, an identical copy of that run. Source SHA-256 values identify the two Python files used. If the release code changes, rerun and inspect the test before replacing both evidence files and rendering again.

In this video directory:
npm ci
npm run typecheck
npm run dev -- --no-open --port=8091
npx remotion render src/index.tsx LambdaRollback ../../../../public/media/lambda-rollback/rollback-walkthrough.mp4 --codec=h264 --crf=22 --pixel-format=yuv420p --concurrency=1
npx remotion still src/index.tsx LambdaRollback ../../../../public/media/lambda-rollback/rollback-poster.jpg --frame=100

The website uses a native video player with preload disabled and no autoplay. An expandable text walkthrough is included in the article. This project is separate from the website dependencies.
