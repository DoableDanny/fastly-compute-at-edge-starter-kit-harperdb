# Empty Starter Kit for JavaScript

[![Deploy to Fastly](https://deploy.edgecompute.app/button)](https://deploy.edgecompute.app/deploy)

An empty application template for the Fastly Compute@Edge environment which simply returns a 200 OK response.

**For more details about other starter kits for Compute@Edge, see the [Fastly developer hub](https://developer.fastly.com/solutions/starters)**

## Security issues

Please see our [SECURITY.md](SECURITY.md) for guidance on reporting security-related issues.

## About this Starter Kit

This starter kit provides you with everything you need to begin interacting with your HarperDB database. The main `index.js` file shows you how you can build out an REST API with Compute@Edge. This starter shows you some example routes for different request types (e.g. /GET, /POST, /PUT, /DELETE) and paths, and shows you how you can interact with your HarperDB database to fetch and insert data, and then respond to the user.

## HarperDB setup

Follow the [HarperDB getting started instructions](https://docs.harperdb.io/docs/getting-started) to get your instance url and password. For local development, copy and paste the value of the HarperDB instance url into \[local_server.backends.harperdb\].url and HARPERDB_URL in the fastly.toml file. Also copy and paste in your HarperDB password into HARPERDB_PW.

For the example routes in this starter kit to work, in HarperDB create a schema called `blog`. Within the `blog` schema, create a table called `posts` with hash_attribute `id`.

## Test locally

`fastly compute serve --watch`

## Deploy using [Fastly CLI](https://developer.fastly.com/learning/compute/#install-the-fastly-cli)

**Deploy the project:**

`fastly compute init --from={YOUR REPO URL}`

Enter `y` when asked if you want to run the post_init script from the fastly.toml file.

`fastly compute publish`

When prompted, provide the following values:

- Create new service: [y/N] y

- Service name: [HarperDB-Starter-Kit] Whatever you want to call this

- Domain: [likely-enhanced-robin.edgecompute.app] leave as default or provide custom domain

- Backend (hostname or IP address, or leave blank to stop adding backends): your-harperdb-instance.harperdbcloud.com e.g. cloud-1-username.harperdbcloud.com

- Backend port number: [443] 443

- Backend name: [backend_1] harperdb

**Create a private dictionary using the [web interface](https://docs.fastly.com/en/guides/working-with-dictionaries-using-the-web-interface#creating-a-dictionary), [API](https://developer.fastly.com/reference/api/dictionaries/dictionary/#create-dictionary) or [fastly CLI](https://developer.fastly.com/reference/cli/dictionary/create/):**

Dictionary name = harperdb_env_variables
Set write-only = true
Create the following dictionary items:

HARPERDB_URL = <your-harperdb-url>
HARPERDB_PW = <your-harperdb-password>

## About HarperDB

HarperDB is a database, streaming broker, and application development platform. It has a flexible, component-based architecture, simple HTTP/S interface, and a high-performance single-model data store that accommodates any data structure.
