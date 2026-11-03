Anrotex: test an AWS Lambda rollback on your computer
https://www.anrotex.com/blog/aws-lambda-rollback-github-actions

Run the tests

You need Python 3.10 or later. These tests passed with Python 3.14.
Open a terminal in this folder and run:

  python3 -m unittest -v test_release

The five tests simulate AWS responses. You do not need an AWS account,
access keys, extra Python packages or a network connection.

You should see "Ran 5 tests" and "OK". A message containing
"event": "rollback" is expected: one test deliberately causes a failure.

What each file does

- release.py checks the new version, switches the live alias to it and
  tries to switch back if the application checks fail. An alias is a name
  that points to a particular version of the Lambda function.
- smoke.py checks the application through API Gateway. It is included so
  you can read the checks; it is not run by these five tests.
- test_release.py checks a successful release, failure before and after
  the switch, changes made by someone else, and aliases that split requests
  between versions.

Try a failing test

In test_release.py, change the expected restored FunctionVersion from "7"
to "8" in test_gateway_failure_rolls_back_previous_version. Run the tests
again. That test should fail because the script requests version 7.
Change the test back afterwards.

Before using the release script in AWS

The code comes from Anrotex's Cloud Operations project. The tests use
simulated AWS responses; they do not connect to AWS or deploy an application.
Test permissions and recovery in a separate AWS environment before real use.

Running release.py as a command needs the boto3 Python package, an application
ZIP file, and the AWS resources already set up. The script expects the
project's /health and /requests routes, AWS request authentication and a
code-version identifier. Adapt these checks to your own application first.

Switching code versions does not undo data or database changes. Keep the
previous version available. If the script stops or cannot switch back, an
engineer must check which version is running and restore service. Always
check that the application works after switching back.
