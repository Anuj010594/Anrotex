Anrotex Cloud Operations: Lambda release tests
https://www.anrotex.com/blog/aws-lambda-rollback-github-actions

Run locally with Python 3.10 or later (verified with Python 3.14):
  python3 -m unittest -v test_release

Five tests exercise the real release() function using a mocked Lambda client.
No packages, AWS account, credentials or network connection are required.
A printed rollback event is expected during the failed-gateway test.

Files:
- release.py: candidate checks, version publication, alias promotion and rollback.
- smoke.py: the project's signed API Gateway probe; not called by these tests.
- test_release.py: tests for success, failed candidates, failed gateway checks,
  concurrent alias changes and weighted-alias rejection.

Source: Anrotex Cloud Operations, verified locally on 27 October 2026.
The release and gateway scripts are copied unchanged from that project.
The tests are its ReleaseTests class, with standalone standard-library imports.

The tests verify decisions and SDK arguments, not AWS behavior. They do not
prove IAM permissions, OIDC trust, Lambda readiness or gateway propagation.

The command-line release path requires boto3 and the project's already
provisioned API, live alias and packaged application. Candidate and gateway
checks expect its /health and /requests contracts, IAM authentication and
release identifier. Adapt those checks to your own app before any deployment.
Do not execute a release against production as part of this local exercise.

The alias rollback does not reverse database writes or migrations. A failed
alias restoration or cancelled runner needs an operator to inspect the alias,
restore the reviewed version and verify the endpoint. Retain previous versions.
