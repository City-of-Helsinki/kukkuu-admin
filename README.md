[![codecov](https://codecov.io/gh/City-of-Helsinki/kukkuu-admin/branch/develop/graph/badge.svg)](https://codecov.io/gh/City-of-Helsinki/kukkuu-admin)
![Build & Staging](https://github.com/City-of-Helsinki/kukkuu-admin/workflows/Build%20&%20Staging%20&%20Accept/badge.svg)

# Staff interface for Kulttuurin kummilapset / Culture Kids

:baby: Staff interface for Kulttuurin kummilapset / Culture Kids :violin:

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Deployments](#deployments)
- [See also](#see-also)
- [Development](#development)
  - [Getting started](#getting-started)
  - [Authorizing login to kukkuu-admin](#authorizing-login-to-kukkuu-admin)
    - [Using local kukkuu backend](#using-local-kukkuu-backend)
    - [Using remote kukkuu backend](#using-remote-kukkuu-backend)
  - [Setting up Tunnistamo and Kukkuu API locally with Docker](#setting-up-tunnistamo-and-kukkuu-api-locally-with-docker)
    - [Set Tunnistamo hostname](#set-tunnistamo-hostname)
    - [Create a new OAuth app on GitHub](#create-a-new-oauth-app-on-github)
    - [Install local Tunnistamo](#install-local-tunnistamo)
    - [Using the Helsinki-Profile Keycloak instead of Tunnistamo](#using-the-helsinki-profile-keycloak-instead-of-tunnistamo)
    - [Install Kukkuu API locally](#install-kukkuu-api-locally)
- [Available Scripts](#available-scripts)
  - [`yarn start`](#yarn-start)
  - [`yarn test`](#yarn-test)
  - [`yarn build`](#yarn-build)
  - [`yarn graphql-types`](#yarn-graphql-types)
  - [`yarn test:browser`](#yarn-testbrowser)
    - [Test JWT issuance for browser tests](#test-jwt-issuance-for-browser-tests)
- [Debugging](#debugging)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## About

More information about the Culture Kids project is available in the UI project:
https://github.com/City-of-Helsinki/kukkuu-ui/

## Deployments

Production environment:

- https://kummilapset-admin.hel.fi/

Testing environment:

- https://kukkuu-admin.test.kuva.hel.ninja/ (Deprecated KuVa environment)
- https://kukkuu-admin.test.hel.ninja/ (Platta environment)

Staging environment:

- https://kukkuu-admin.stage.hel.ninja/ (Platta environment)

## See also

The backend:

- https://github.com/City-of-Helsinki/kukkuu

The end user interface:

- https://github.com/City-of-Helsinki/kukkuu-ui

## Development

### Getting started

1. Clone the repo.
2. `cp .env.example .env`
3. Use file `.env.local` to modify environment variables if needed. For more info, check [this](https://create-react-app.dev/docs/adding-custom-environment-variables#docsNav).
4. Run either
   - `yarn start` to run the app normally **or**
   - `docker compose up` to run the app in a Docker container. In the future when there are changes that need rebuilding the container, run `docker compose up --build` instead.
5. Open [http://localhost:3001](http://localhost:3001) to view the app in the browser.

### Authorizing login to kukkuu-admin

You need to authorize the user you are trying to log in with to kukkuu-admin.

#### Using local kukkuu backend

If you have set up a local kukkuu backend i.e. in your `.env.local`

> VITE_API_URI=http://localhost:8081/graphql

You need to:

1.  Run the local backend
2.  Try to log in to kukkuu-admin at http://localhost:3001/login with some user
3.  Open the backend's django-admin interface at http://localhost:8000/admin/ using
    username `admin` and password `admin`
4.  Make the user you tried to log in to kukkuu-admin a superuser
    - The attempt to log in into kukkuu-admin should have created a user in the backend

After that you should be able to log in to kukkuu-admin with the user.

#### Using remote kukkuu backend

If you have set up a remote kukkuu backend i.e. in your `.env.local` e.g.

> VITE_API_URI=https://kukkuu.api.test.hel.ninja/graphql

You need to:

1.  Obtain credentials to log in to the django-admin interface of the backend from
    someone or something that has them or if you have credentials to the pod which runs
    the backend you can create a superuser to log in to the backend by running
    `python manage.py createsuperuser` in the pod's terminal. Then you can use those
    credentials to log in to the django-admin interface of the backend.
2.  Try to log in to kukkuu-admin at http://localhost:3001/login with some user
3.  Open the backend's django-admin interface at (e.g.
    https://kukkuu.api.test.hel.ninja/admin if your
    `VITE_API_URI=https://kukkuu.api.test.hel.ninja/graphql`) using the
    credentials you obtained from the previous steps
4.  Make the user you tried to log in with to kukkuu-admin—the attempt to log in into
    kukkuu-admin should have created a user in the backend—a superuser

After that you should be able to log in to kukkuu-admin with that user.

### Setting up Tunnistamo and Kukkuu API locally with Docker

#### Set Tunnistamo hostname

Add the following line to your hosts file (`/etc/hosts` on mac and linux):

    127.0.0.1 tunnistamo-backend

#### Create a new OAuth app on GitHub

Go to https://github.com/settings/developers/ and add a new app with the following settings:

- Application name: can be anything, e.g. local tunnistamo
- Homepage URL: http://tunnistamo-backend:8000
- Authorization callback URL: http://tunnistamo-backend:8000/accounts/github/login/callback/

Save. You'll need the created **Client ID** and **Client Secret** for configuring tunnistamo in the next step.

#### Install local Tunnistamo

Clone https://github.com/City-of-Helsinki/tunnistamo/.

Follow the instructions for setting up tunnistamo locally. Before running `docker compose up` set the following settings in tunnistamo roots `docker-compose.env.yaml`:

- SOCIAL_AUTH_GITHUB_KEY: **Client ID** from the GitHub OAuth app
- SOCIAL_AUTH_GITHUB_SECRET: **Client Secret** from the GitHub OAuth app

After you've got tunnistamo running locally, ssh to the tunnistamo docker container:

`docker compose exec django bash`

and execute the following four commands inside your docker container:

```bash
./manage.py add_oidc_client -n kukkuu-admin-ui -t "id_token token" -u "http://localhost:3001/callback" -i https://api.hel.fi/auth/kukkuu-admin-ui -m github -s dev
./manage.py add_oidc_client -n kukkuu-api -t "code" -u http://localhost:8081/return -i https://api.hel.fi/auth/kukkuu -m github -s dev -c
./manage.py add_oidc_api -n kukkuu -d https://api.hel.fi/auth -s email,profile -c https://api.hel.fi/auth/kukkuu
./manage.py add_oidc_api_scope -an kukkuu -c https://api.hel.fi/auth/kukkuu -n "Kulttuurin kummilapset" -d"Lorem ipsum"
./manage.py add_oidc_client_to_api_scope -asi https://api.hel.fi/auth/kukkuu -c https://api.hel.fi/auth/kukkuu-admin-ui
```

To make Kukkuu Admin use the local Tunnistamo set `VITE_OIDC_AUTHORITY="http://tunnistamo-backend:8000"` for example in file `.env.local`.

#### Using the Helsinki-Profile Keycloak instead of Tunnistamo

> The Tunnistamo has been replaced with Helsinki-Profile Keycloak during the autumn of 2024. The Tunnistamo is still a great choice as an auth service if a local authorization service is needed in a local development.

There is an [example of Keycloak environment variables](./.env.local.keycloak-example) that can be used, when a local Kukkuu Admin UI is wanted to be connected to the Helsinki-Profile Keycloak of a test environment.

The example file should include some what the following variables, that are telling the app to change the behavior of the authorization provider a bit, compared to how it is with Tunnistamo.

- `VITE_OIDC_SERVER_TYPE=KEYCLOAK` is to add some parameters to the token-request that the Keycloak service needs. As a comparison, by default it is working as `VITE_OIDC_SERVER_TYPE=TUNNISTAMO`).
- `VITE_OIDC_RETURN_TYPE=code` is to use authorization code flow instead of deprecated (and even removed from `oidc-client-ts`) implicit flow.
- `VITE_OIDC_AUTHORITY` tells where the authorization service is located and who the issuer of the JWT is.
- `VITE_OIDC_CLIENT_ID` is the unique client id that is used when the client is configured to auth service.
- `VITE_OIDC_SCOPE="openid profile"` tells that the Kukkuu Admin UI needs the openid and profile information to be included in the JWT.
- `VITE_OIDC_AUDIENCES=kukkuu-api-dev` means that when the authorization is given, the access is needed to these clients too, so the api-tokens needs to be generated.
- `VITE_OIDC_KUKKUU_API_CLIENT_ID` is used collect the proper auth token for communication between the Admin UI and the API.

Example configuration when a local Kukkuu API is used with a local Kukkuu Admin UI and Helsinki-Profile Keycloak from the test environment:

```shell
VITE_OIDC_SERVER_TYPE=KEYCLOAK
VITE_OIDC_RETURN_TYPE="code"
VITE_OIDC_AUTHORITY=https://tunnistus.test.hel.ninja/auth/realms/helsinki-tunnistus/
VITE_OIDC_CLIENT_ID="kukkuu-admin-ui-dev"
VITE_OIDC_KUKKUU_API_CLIENT_ID="kukkuu-api-dev"
VITE_OIDC_SCOPE="openid profile"
VITE_OIDC_AUDIENCES=kukkuu-api-dev
# VITE_API_URI=https://kukkuu.api.test.hel.ninja/graphql
VITE_API_URI=http://localhost:8081/graphql
```

#### Install Kukkuu API locally

Clone the repository (https://github.com/City-of-Helsinki/kukkuu). Follow the instructions for running kukkuu with docker. Before running `docker compose up` set the following settings in kukkuu roots `docker-compose.env.yaml`:

- DEBUG=1
- CORS_ORIGIN_ALLOW_ALL=1
- TOKEN_AUTH_AUTHSERVER_URL=http://tunnistamo-backend:8000/openid
- APPLY_MIGRATIONS=1
- TOKEN_AUTH_AUTHSERVER_URL=http://tunnistamo-backend:8000/openid
- MEDIA_ROOT=/app/var/

If you do not have a super user / admin to administrate the API yet, you can create one with `docker compose run django python manage.py add_admin_user -u admin -p admin -e admin@example.com`.

To make Kukkuu Admin use the local Kukkuu API set `VITE_API_URI="localhost:8081/graphql"` for example in file `.env.local`.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn generate:graphql`

Fetches the GraphQL schema from backend and updates typing information. The configuration is written in [codegen.ts](./codegen.ts). Check that the environment variables are set properly to match with your API.

### `yarn test`

Launches the `vitest` test runner.

### `yarn test:browser`

Runs browser tests against your local version of the application (assumes port `3001`).

The `yarn test:browser:ci` variant of this command is meant to run in the CI, and it targets the staging server. It uses headless mode and may therefore behave differently compared to the local test runner.

Browser tests are ran against PR and staging environments when after they have been built and deployed.

To run browser tests locally, you need to configure the browser testing environment:

1. Run a local Kukkuu API instance with the browser testing JWT features set on. Like that the UI client can issue new JWT for authorization by itself.
2. Run a local Kukkuu Admin UI.
3. Carefully double check that the UI instance is configured to use the local API. The browser test JWT token configurations also needs to match in order to successfully verify the newly issued tokens. You navigate through the UI manually to see that everything is working as expected.
4. Run the browser test with `yarn test:browser` or `yarn test:browser:ci`.

For configuration, check the following environment variables:

1. `BROWSER_TESTS_JWT_SIGN_SECRET` needs to be a valid 256 bits token and it needs to be configured the same in both, the API and in the Admin UI in order to verify the self issued JWT for browser testing.
2. `BROWSER_TESTS_JWT_AD_GROUP` defines the AD group that should be used while running the browser tests. This value is used while issuing a JWT for an admin user. The AD group should be madde in the API so that it gives admin permissions for the newly created user with this AD group for the (year) project that is created for browser testing. These AD groups and user groups can be managed from the API.
3. `BROWSER_TESTS_ENV_URL` tells for Testcafe where the testable UI is
4. `VITE_API_URI` defines the Kukkuu API GraphQL endpoint. It's important in browser testing configuration for JWT mocking reasons.
5. `VITE_OIDC_KUKKUU_API_CLIENT_ID` OIDC config that is needed in JWT mocking.
6. `VITE_OIDC_CLIENT_ID` OIDC config that is needed in JWT mocking.
7. `VITE_OIDC_AUTHORITY` OIDC config that is needed in JWT mocking.

There is an [.env.test.local.example](.env.test.local.example) that can be copied to a file named `.env.test.local`. If the `.env.test.local` is present, it will be used during the local Testcafe runs.

#### Test JWT issuance for browser tests

There is a ['library'](./browser-tests/utils/jwt/) that helps issuing symmetrically signed JWT tokens, that can be used only for browser testing.

How it should work:

- [clientUtils](./browser-tests/utils/jwt/clientUtils/) contains the scripts that will be ran in the Testcafe (headless) browser. The scripts there are sugared with the [Testcafes ClientFunction](https://testcafe.io/documentation/402832/guides/basic-guides/client-functions).
- [mocks](./browser-tests/utils/jwt/mocks/) contains the mocking functions that can be used to intercept the real OIDC client networking. The idea is that we never allow the Testcafe to succesfully connect to the configured authorization service. Instead of that, we mock the result with our browser testing JWT tools and populate that mocked data to the local storage or the session storage of the Testcafe browser.
- [config](./browser-tests/utils/jwt/config/) contains a class that serves the browser testing JWT library's configurations.
- [jwt](./browser-tests/utils/jwt/jwt.ts) has the utilities to create and sign a symmetrical JWT for browser testing purposes. Note that the API needs to have the same signature verification key configured.
- [oidc](./browser-tests/utils/jwt/oidc.ts) uses the JWT generators and offers the information in a format that can be used by the OIDC client.
- [services](./browser-tests/utils/jwt/services.ts) has some tools that are needed in order to select admin project, etc. _These functions makes real calls to the API (not mocked)_.

## Debugging

See instructions in the sister project: https://github.com/City-of-Helsinki/kukkuu-ui/
