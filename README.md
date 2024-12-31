[![codecov](https://codecov.io/gh/City-of-Helsinki/kukkuu-admin/branch/develop/graph/badge.svg)](https://codecov.io/gh/City-of-Helsinki/kukkuu-admin)
![Build & Staging](https://github.com/City-of-Helsinki/kukkuu-admin/workflows/Build%20&%20Staging%20&%20Accept/badge.svg)

# Staff interface for Kulttuurin kummilapset / Culture Kids

:baby: Staff interface for Kulttuurin kummilapset / Culture Kids :violin:

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Service architecture](#service-architecture)
  - [Environments](#environments)
- [Development](#development)
  - [Getting started](#getting-started)
  - [Authorizing login to kukkuu-admin and integrating to Kukkuu API](#authorizing-login-to-kukkuu-admin-and-integrating-to-kukkuu-api)
    - [Setup authorization service](#setup-authorization-service)
    - [Setup Kukkuu API backend](#setup-kukkuu-api-backend)
      - [Using local Kukkuu API backend](#using-local-kukkuu-api-backend)
      - [Using remote kukkuu backend](#using-remote-kukkuu-backend)
    - [JWT issuance for browser tests](#jwt-issuance-for-browser-tests)
- [Available Scripts](#available-scripts)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Service architecture

The Culture kids service consists from:

- **[Kukkuu API](https://github.com/City-of-Helsinki/kukkuu):** The API backend service - The primary source of data.
- **[Admin UI](https://github.com/City-of-Helsinki/kukkuu-admin):** (This service). A restricted UI where the events are maintained and published.
- **[Public UI](https://github.com/City-of-Helsinki/kukkuu-ui):** The frontend service where the kids can view and enrol to culture events.
- **[Headless CMS](https://github.com/City-of-Helsinki/headless-cms):** Content Management Service that provides dynamic pages and dynamic content for the public UI. It also provides content for the header and the footer. A React component library can be found from https://github.com/City-of-Helsinki/react-helsinki-headless-cms.
- **[Notification Service API](https://github.com/City-of-Helsinki/notification-service-api):** A service used by the Kukkuu API to send SMS messages.
- **Mailer:** A service used by the Kukkuu API to send emails.


### Environments

The admin client environments (this service):
- **Production environment:** https://kummilapset-admin.hel.fi/
- **Staging environment:** https://kukkuu-admin.stage.hel.ninja/
- **Testing environment:** https://kukkuu-admin.test.hel.ninja/

The API environments:
- **Production environment:** https://kukkuu.api.hel.fi/graphql
- **Staging environment:** https://kukkuu.api.stage.hel.ninja/graphql
- **Testing environment:** https://kukkuu.api.test.hel.ninja/graphql

The public client environments:
- **Production environment:** https://kummilapset.hel.fi/
- **Staging environment:** https://kukkuu-ui.stage.hel.ninja/
- **Testing environment:** https://kukkuu-ui.test.hel.ninja/

The headless CMS environments:
- **Production environment:** https://kukkuu.content.api.hel.fi/graphql
- **Testing environment:** https://kukkuu.app-staging.hkih.hion.dev/graphql

## Development

### Getting started

1. Clone the repo.
2. `cp .env.example .env`
3. Use file `.env.local` to modify environment variables if needed. For more info, check [this](https://create-react-app.dev/docs/adding-custom-environment-variables#docsNav).
4. Run either
   - `yarn start` to run the app normally **or**
   - `docker compose up` to run the app in a Docker container. In the future when there are changes that need rebuilding the container, run `docker compose up --build` instead.
5. Open [http://localhost:3001](http://localhost:3001) to view the app in the browser.

### Authorizing login to kukkuu-admin and integrating to Kukkuu API

You need to authorize the user you are trying to log in with to Kukkuu-Admin. In order to login and get the staff / admin privileges, an authorization service is needed.

> NOTE: The Kukkuu API needs to be configured to use the same authorization service as the Kukkuu Admin UI is using, because only then the authorization can be verified.

#### Setup authorization service

Setup authorization service:
- **Use public test Keycloak**: The primary option. See [Using the Helsinki-Profile Keycloak](./docs/setup-keycloak.md) -docs.
- **Use a local Tunnistamo**: For full local env, see [Setting up Tunnistamo and Kukkuu API locally with Docker](./docs/setup-tunnistamo.md) -docs.


#### Setup Kukkuu API backend

You can use the public Kukkuu API from the test environment or setup a local Kukkuu API. It should be noted that in the public test environment, the data is shared with other users. If you want to test with your own data and have an isolated system, you need to setup a local API.

Choose the environment: 
- **Use a public test environment API**: Check that your environment variables are set correctly. The examples are given in [.env.example](./.env.example).
- **Setup Kukkuu API locally**: See [Use Kukkuu API locally](./docs/setup-local-kukkuu-api.md) -docs.

##### Using local Kukkuu API backend


If you're using a local Kukkuu API backend (`VITE_API_URI=http://localhost:8081/graphql`), you can easily grant staff privileges to your user account. Here's how:

1. **Start the backend:** Ensure your local Kukkuu API backend is running.

2. **Access the Django admin interface:**
   - Open the Django admin interface: `http://localhost:8000/admin/`
   - Log in with the default credentials: username `admin`, password `admin`.

3. **Grant superuser privileges:**
   - Attempt to log in to Kukkuu-admin (`http://localhost:3001/login`) using your desired user account. This will create the user in the backend if it doesn't exist.
   - In the Django admin interface, locate the user you just created and grant them superuser privileges.

You should now be able to log in to Kukkuu-admin with that user.

##### Using remote Kukkuu API backend

If you're using a remote Kukkuu backend (e.g., the test environment; `VITE_API_URI=https://kukkuu.api.test.hel.ninja/graphql`), you'll need to grant staff privileges to your user account. Here's how:

1. **Obtain Django admin credentials:**
   - Contact the administrator of the remote backend to get the credentials.
   - If you have access to the backend pod, you can create a superuser by running `python manage.py createsuperuser` in the pod's terminal.

2. **Access the Django admin interface:**
   - Open the Django admin interface for the remote backend (e.g., `https://kukkuu.api.test.hel.ninja/admin`).
   - Log in using the credentials from step 1.

3. **Grant superuser privileges:**
    - Attempt to log in to Kukkuu-admin (`http://localhost:3001/login`). This will create a user account in the backend if one doesn't exist.
    - In the Django admin interface, find the user you just created and grant them superuser privileges.

You should now be able to log in to Kukkuu-admin with your user account.

#### JWT issuance for browser tests

There is a ['library'](./browser-tests/utils/jwt/) that helps issuing symmetrically signed JWT tokens, that can be used only for browser testing.

How it should work:

- [clientUtils](./browser-tests/utils/jwt/clientUtils/) contains the scripts that will be ran in the Testcafe (headless) browser. The scripts there are sugared with the [Testcafes ClientFunction](https://testcafe.io/documentation/402832/guides/basic-guides/client-functions).
- [mocks](./browser-tests/utils/jwt/mocks/) contains the mocking functions that can be used to intercept the real OIDC client networking. The idea is that we never allow the Testcafe to succesfully connect to the configured authorization service. Instead of that, we mock the result with our browser testing JWT tools and populate that mocked data to the local storage or the session storage of the Testcafe browser.
- [config](./browser-tests/utils/jwt/config/) contains a class that serves the browser testing JWT library's configurations.
- [jwt](./browser-tests/utils/jwt/jwt.ts) has the utilities to create and sign a symmetrical JWT for browser testing purposes. Note that the API needs to have the same signature verification key configured.
- [oidc](./browser-tests/utils/jwt/oidc.ts) uses the JWT generators and offers the information in a format that can be used by the OIDC client.
- [services](./browser-tests/utils/jwt/services.ts) has some tools that are needed in order to select admin project, etc. _These functions makes real calls to the API (not mocked)_.



## Available Scripts

In the project directory, you can run:

- **`yarn start`**

    Runs the app in the development mode.
    Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

    The page will reload if you make edits. 
    You will also see any lint errors in the console.

- **`yarn build`**

    Builds the app for production to the `build` folder.
    It correctly bundles React in production mode and optimizes the build for the best performance.

    The build is minified and the filenames include the hashes.
    Your app is ready to be deployed!

    See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

- **`yarn generate:graphql`**

    Fetches the GraphQL schema from backend and updates typing information. The configuration is written in [codegen.ts](./codegen.ts). Check that the environment variables are set properly to match with your API.

- **`yarn test`**

    Runs the test** `yarn test`. Launches the `vitest` test runner.

- **`yarn test:browser`**

    Runs browser tests against your local version of the application (assumes port `3001`).

    The `yarn test:browser:ci` variant of this command is meant to run in the CI, and it targets the staging server. It uses headless mode and may therefore behave differently compared to the local test runner.

    > The deployment pipelines are running the browser tests as automated actions. They are ran against PR and staging environments when after they have been built and deployed.

    > See also [JWT issuance for browser tests](#jwt-issuance-for-browser-tests)

    To run browser tests locally, you need to configure the browser testing environment:
    1. Run a local Kukkuu API instance with the browser testing JWT features set on. Like that the UI client can issue new JWT for authorization by itself.
    2. Run a local Kukkuu Admin UI.
    3. Carefully double check that the UI instance is configured to use the local API. The browser test JWT token configurations also needs to match in order to successfully verify the newly issued tokens. You navigate through the UI manually to see that everything is working as expected.
    4. Run the browser test with `yarn test:browser` or `yarn test:browser:ci`.

    For configuration, check the following environment variables:
    1. `BROWSER_TESTS_JWT_SIGN_SECRET` needs to be a valid 256 bits token and it needs to be configured the same in both, the API and in the Admin UI in order to verify the self issued JWT for browser testing.
    2. `BROWSER_TESTS_JWT_AD_GROUP` defines the AD group that should be used while running the browser tests. This value is used while issuing a JWT for an admin user. The AD group should be made in the API so that it gives admin permissions for the newly created user with this AD group for the (year) project that is created for browser testing. These AD groups and user groups can be managed from the API.
    3. `BROWSER_TESTS_ENV_URL` tells for Testcafe where the testable UI is
    4. `VITE_API_URI` defines the Kukkuu API GraphQL endpoint. It's important in browser testing configuration for JWT mocking reasons.
    5. `VITE_OIDC_KUKKUU_API_CLIENT_ID` OIDC config that is needed in JWT mocking.
    6. `VITE_OIDC_CLIENT_ID` OIDC config that is needed in JWT mocking.
    7. `VITE_OIDC_AUTHORITY` OIDC config that is needed in JWT mocking.

    > NOTE: There is an [.env.test.local.example](.env.test.local.example) that can be copied to a file named `.env.test.local`. If the `.env.test.local` is present, it will be used during the local Testcafe runs.

