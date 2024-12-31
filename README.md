[![codecov](https://codecov.io/gh/City-of-Helsinki/kukkuu-admin/branch/develop/graph/badge.svg)](https://codecov.io/gh/City-of-Helsinki/kukkuu-admin)
![Build & Staging](https://github.com/City-of-Helsinki/kukkuu-admin/workflows/Build%20&%20Staging%20&%20Accept/badge.svg)

# Staff interface for Kulttuurin kummilapset / Culture Kids

:baby: Staff interface for Kulttuurin kummilapset / Culture Kids :violin:

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Service architecture](#service-architecture)
  - [Environments](#environments)
  - [Frameworks and Libraries](#frameworks-and-libraries)
- [Development](#development)
  - [Getting started](#getting-started)
  - [Authorizing login to kukkuu-admin and integrating to Kukkuu API](#authorizing-login-to-kukkuu-admin-and-integrating-to-kukkuu-api)
    - [Setup authorization service](#setup-authorization-service)
    - [Setup Kukkuu API backend](#setup-kukkuu-api-backend)
      - [Using local Kukkuu API backend](#using-local-kukkuu-api-backend)
      - [Using remote Kukkuu API backend](#using-remote-kukkuu-api-backend)
    - [JWT issuance for browser tests](#jwt-issuance-for-browser-tests)
- [Available Scripts](#available-scripts)
  - [`yarn start`](#yarn-start)
  - [`yarn build`](#yarn-build)
  - [`yarn generate:graphql`](#yarn-generategraphql)
  - [`yarn test`](#yarn-test)
  - [`yarn test:browser`](#yarn-testbrowser)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Service architecture

The Culture kids service consists of:

- **[Kukkuu API](https://github.com/City-of-Helsinki/kukkuu):** The API backend service - The primary source of data.
- **[Admin UI](https://github.com/City-of-Helsinki/kukkuu-admin):** (This service). A restricted UI where the events are maintained and published.
- **[Public UI](https://github.com/City-of-Helsinki/kukkuu-ui):** The frontend service where the kids can view and enrol in culture events.
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

### Frameworks and Libraries

This project is built using the following key frameworks and libraries:

- **[Vite](https://vite.dev/):** A modern frontend build tool that provides a fast and efficient development experience. It offers features like instant server start, hot module replacement, and optimized builds.
- **[React](https://react.dev/):** A JavaScript library for building user interfaces. It allows for the creation of reusable UI components and efficient management of application state.
- **[React Admin](https://marmelab.com/react-admin/):** A framework for building admin applications on top of React. It provides a set of reusable components and utilities for common admin tasks, such as creating data grids, forms, and navigation menus. React Admin simplifies the development of admin interfaces by providing a structured and opinionated approach.



## Development

### Getting started

1. Clone the repo.
2. `cp .env.example .env`
3. Use file `.env.local` to modify environment variables if needed. For more info, check [this](https://create-react-app.dev/docs/adding-custom-environment-variables#docsNav).
4. Run either
   - `yarn start` to run the app normally **or**
   - `docker compose up` to run the app in a Docker container. In the future, when there are changes that need rebuilding the container, run `docker compose up --build` instead.
5. Open [http://localhost:3001](http://localhost:3001) to view the app in the browser.

### Authorizing login to kukkuu-admin and integrating to Kukkuu API

You need to authorize the user you are trying to log in with to Kukkuu-Admin. In order to log in and get the staff / admin privileges, an authorization service is needed.

> **NOTE:** The Kukkuu API needs to be configured to use the same authorization service as the Kukkuu Admin UI is using, because only then the authorization can be verified.

#### Setup authorization service

Setup authorization service:
- **Use public test Keycloak**: The primary option. See [Using the Helsinki-Profile Keycloak](./docs/setup-keycloak.md).
- **Use a local Tunnistamo**: For a full local environment, see [Setting up Tunnistamo and Kukkuu API locally with Docker](./docs/setup-tunnistamo.md).


#### Setup Kukkuu API backend

You can use the public Kukkuu API from the test environment or set up a local Kukkuu API. It should be noted that in the public test environment, the data is shared with other users. If you want to test with your own data and have an isolated system, you need to set up a local API.

Choose the environment: 
- **Use a public test environment API**: Check that your environment variables are set correctly. The examples are given in [.env.example](./.env.example).
- **Setup Kukkuu API locally**: See [Use Kukkuu API locally](./docs/setup-local-kukkuu-api.md).

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

This section describes how JSON Web Tokens (JWT) are issued for browser tests.

In browser tests, we want to bypass the regular authentication flow and directly issue JWTs for testing user roles and permissions. This is achieved by mocking the authentication service and providing pre-generated JWTs with specific claims.

**How it works:**


- **[`clientUtils`](./browser-tests/utils/jwt/clientUtils/):** Contains helper functions that run within the Testcafe browser environment. These functions utilize Testcafe's [`ClientFunction`](https://testcafe.io/documentation/402832/guides/basic-guides/client-functions) to interact with the browser and manage JWTs.
- **[`mocks`](./browser-tests/utils/jwt/mocks/):** Provides functions to intercept network requests to the authentication service and replace them with mocked responses containing the test JWTs. This prevents actual authentication and allows us to control the user context during tests.
- **[`config`](./browser-tests/utils/jwt/config/):**  Holds configuration settings for the JWT library used in browser tests.
- **[`jwt`](./browser-tests/utils/jwt/jwt.ts):**  Contains utilities to create and sign JWTs symmetrically. The API needs to be configured with the same secret key to verify these tokens.
- **[`oidc`](./browser-tests/utils/jwt/oidc.ts):**  Adapts the generated JWTs to a format compatible with the OpenID Connect (OIDC) client used in the application.
- **[`services`](./browser-tests/utils/jwt/services.ts):**  Includes helper functions for managing test data, such as selecting an admin project for the test user. These functions make actual API calls (not mocked) to prepare the test environment.

**Key points:**

- The API and the Admin UI must share the same secret key (`BROWSER_TESTS_JWT_SIGN_SECRET`) for JWT verification.
- The `BROWSER_TESTS_JWT_AD_GROUP` environment variable defines the Active Directory group used for the test user, which should have admin privileges in the API.
- Several environment variables are used to configure the JWT mocking and testing environment.


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in development mode.
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn generate:graphql`

Fetches the GraphQL schema from the backend and updates typing information. The configuration is written in [codegen.ts](./codegen.ts). Check that the environment variables are set properly to match with your API.

### `yarn test`

Launches the `vitest` test runner.

### `yarn test:browser`

Runs browser tests against your local version of the application (assumes port `3001`).

- The `yarn test:browser:ci` variant of this command is meant to run in the CI, and it targets the staging server. It uses headless mode and may therefore behave differently compared to the local test runner.
- The deployment pipelines are running the browser tests as automated actions. They are run against PR and staging environments when after they have been built and deployed.
- See also [JWT issuance for browser tests](#jwt-issuance-for-browser-tests)

To run browser tests locally, you need to configure the browser testing environment:

1. Run a local Kukkuu API instance with the browser testing JWT features set on. This allows the UI client to issue new JWTs for authorization by itself.
2. Run a local Kukkuu Admin UI.
3. Carefully double-check that the UI instance is configured to use the local API. The browser test JWT token configurations also need to match in order to successfully verify the newly issued tokens. You can navigate through the UI manually to see that everything is working as expected.
4. Run the browser test with `yarn test:browser` or `yarn test:browser:ci`.

For configuration, check the following environment variables:

1. `BROWSER_TESTS_JWT_SIGN_SECRET` needs to be a valid 256 bits token and it needs to be configured the same in both the API and the Admin UI in order to verify the self-issued JWT for browser testing.
2. `BROWSER_TESTS_JWT_AD_GROUP` defines the AD group that should be used while running the browser tests. This value is used while issuing a JWT for an admin user. The AD group should be made in the API so that it gives admin permissions for the newly created user with this AD group for the (year) project that is created for browser testing. These AD groups and user groups can be managed from the API.
3. `BROWSER_TESTS_ENV_URL` tells Testcafe where the testable UI is located.
4. `VITE_API_URI` defines the Kukkuu API GraphQL endpoint. It's important in browser testing configuration for JWT mocking reasons.
5. `VITE_OIDC_KUKKUU_API_CLIENT_ID` OIDC config that is needed in JWT mocking.
6. `VITE_OIDC_CLIENT_ID` OIDC config that is needed in JWT mocking.
7. `VITE_OIDC_AUTHORITY` OIDC config that is needed in JWT mocking.

NOTE: There is an [.env.test.local.example](.env.test.local.example) that can be copied to a file named `.env.test.local`. If the `.env.test.local` is present, it will be used during the local Testcafe runs.


## License

This project is licensed under the **[MIT License](LICENSE.md)**.
