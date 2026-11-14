Anrotex: test an AWS Lambda rollback on your computer
https://www.anrotex.com/blog/aws-lambda-rollback-github-actions

Before running anything

This sample code is for learning and evaluation only. Production use, delivery
as part of client work and redistribution need Anrotex's written permission.

Read the code and TERMS.txt. Use a separate test environment without production
credentials or customer data. A separate folder does not isolate code from your
computer. Guidance and file fingerprints:
https://www.anrotex.com/downloads-policy

The test command below uses simulated responses. Running release.py or smoke.py
directly with AWS access can publish code, change the live alias, send network
requests and create test records. Cloud charges may apply.

Run the tests

You need Python 3.10 or later. These tests passed with Python 3.14.
Open a terminal in this folder and run:

  python3 -B -m unittest -v test_release

The 23 tests simulate AWS and application responses. You do not need an AWS
account, access keys, extra Python packages or a network connection. Network
connections are blocked while the tests run. The -B option prevents Python
from creating extra cache files.

You should see "Ran 23 tests" and "OK". A message containing
"event": "rollback" is expected: one test deliberately causes a failure.

What each file does

- release.py checks the new version, switches the live alias to it and
  tries to switch back if the application checks fail. An alias is a name
  that points to a particular version of the Lambda function.
- smoke.py checks the application through API Gateway. It is included so
  you can read the checks. Tests use simulated responses, not AWS requests.
- test_release.py checks a successful release, failure before and after
  the switch, changes made by someone else, and aliases that split requests
  between versions. It also checks account confirmation, destination addresses,
  response limits, record IDs and redirects.

Try a failing test

In test_release.py, change the expected restored FunctionVersion from "7"
to "8" in test_gateway_failure_rolls_back_previous_version. Run the tests
again. That test should fail because the script requests version 7.
Change the test back afterwards.

Before using the release script in AWS

The code comes from Anrotex's Cloud Operations project. The tests use
simulated AWS responses; they do not connect to AWS or deploy an application.
Evaluate permissions and recovery in a separate AWS test environment.

Running release.py as a command needs the boto3 Python package, an application
ZIP file, and the AWS resources already set up. The script expects the
project's /health and /requests routes, AWS request authentication and a
code-version identifier. Adapt these checks to your own application first.

Both release.py and smoke.py require --confirm-test-account followed by the
12-digit ID of your separate AWS test account. The commands check the address
and use AWS to confirm which account your credentials belong to before changing
resources or creating records. release.py accepts a function name, not an ARN.
These checks cannot tell whether an account contains production systems; verify
that it is suitable for testing yourself. Restrict the role to your test function
and API. Custom AWS service endpoint overrides are not used by these commands.

Switching code versions does not undo data or database changes. Keep the
previous version available. If the script stops or cannot switch back, an
engineer must check which version is running and restore service. Always
check that the application works after switching back.
