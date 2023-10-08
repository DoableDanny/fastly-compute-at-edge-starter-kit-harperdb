# Empty Starter Kit for JavaScript

[![Deploy to Fastly](https://deploy.edgecompute.app/button)](https://deploy.edgecompute.app/deploy)

An empty application template for the Fastly Compute@Edge environment which simply returns a 200 OK response.

**For more details about other starter kits for Compute@Edge, see the [Fastly developer hub](https://developer.fastly.com/solutions/starters)**

## Security issues

Please see our [SECURITY.md](SECURITY.md) for guidance on reporting security-related issues.

## Notes

To run locally:

`fastly compute serve --watch`

To setup your Fastly API key

`fastly profile create`

Deploy app:

`fastly compute deploy`

RESULT after deploying:

✓ Creating domain 'genuinely-trusty-tetra.edgecompute.app'
✓ Uploading package
✓ Activating service (version 1)
✗ Checking service availability (status: 500)

WARNING: The service has been successfully deployed and activated, but the service 'availability' check timed
out (we were looking for a non-500 status code but the last status code response was: 500). If using a custom domain,
please be sure to check your DNS settings. Otherwise, your application might be taking longer than usual to deploy
across our global network. Please continue to check the service URL and if still unavailable please contact Fastly
support.

Manage this service at:
https://manage.fastly.com/configure/services/3baRMwlQxAiuYpS0c0CeS7

View this service at:
https://genuinely-trusty-tetra.edgecompute.app

SUCCESS: Deployed package (service 3baRMwlQxAiuYpS0c0CeS7, version 1)
