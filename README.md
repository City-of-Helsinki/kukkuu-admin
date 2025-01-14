[![codecov](https://codecov.io/gh/City-of-Helsinki/kukkuu-admin/branch/develop/graph/badge.svg)](https://codecov.io/gh/City-of-Helsinki/kukkuu-admin)
![Build & Staging](https://github.com/City-of-Helsinki/kukkuu-admin/workflows/Build%20&%20Staging%20&%20Accept/badge.svg)

# Staff interface for Kulttuurin kummilapset / Culture Kids

:baby: Staff interface for Kulttuurin kummilapset / Culture Kids :violin:

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Service architecture](#service-architecture)
  - [Environments](#environments)
  - [Frameworks and Libraries](#frameworks-and-libraries)
- [Development](#development)
  - [Requirements](#requirements)
  - [Getting started](#getting-started)
    - [Running using local Node.js](#running-using-local-nodejs)
    - [Running using Docker](#running-using-docker)
    - [Running the Kukkuu backend locally](#running-the-kukkuu-backend-locally)
  - [Authorizing login to kukkuu-admin and integrating to Kukkuu API](#authorizing-login-to-kukkuu-admin-and-integrating-to-kukkuu-api)
    - [Setup authorization service](#setup-authorization-service)
    - [Setup Kukkuu API backend](#setup-kukkuu-api-backend)
      - [Authorizing user for login to local backend](#authorizing-user-for-login-to-local-backend)
      - [Authorizing user for login to test environment's backend](#authorizing-user-for-login-to-test-environments-backend)
    - [JWT issuance for browser tests](#jwt-issuance-for-browser-tests)
  - [Husky Git Hooks](#husky-git-hooks)
    - [Pre-commit Hook](#pre-commit-hook)
    - [Commit-msg Hook](#commit-msg-hook)
- [Available Scripts](#available-scripts)
  - [`yarn start`](#yarn-start)
  - [`yarn build`](#yarn-build)
  - [`yarn generate:graphql`](#yarn-generategraphql)
  - [`yarn test`](#yarn-test)
  - [`yarn test:browser`](#yarn-testbrowser)
- [Releases, changelogs and deployments](#releases-changelogs-and-deployments)
  - [Conventional Commits](#conventional-commits)
  - [Releasable units](#releasable-units)
  - [Configuration](#configuration)
  - [Troubleshoting release-please](#troubleshoting-release-please)
    - [Fix merge conflicts by running release-please -action manually](#fix-merge-conflicts-by-running-release-please--action-manually)
  - [Deployments](#deployments)
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

### Requirements

Compatibility defined by [Dockerfile](./Dockerfile):

- Node.js 20.x
- Yarn 1.x

### Getting started

1. Clone this repository
2. Copy `.env.example` to `.env`
3. If you're new to multiple `.env*` files, read Vite's [Env Variables and Modes](https://vite.dev/guide/env-and-mode)
4. If you're new to multiple Docker compose files, read Docker's [Merge Compose Files](https://docs.docker.com/compose/how-tos/multiple-compose-files/merge/)
5. Follow the instructions below for your preferred way of running this app:
   - [Running using local Node.js](#running-using-local-nodejs) **or**
   - [Running using Docker & Docker compose](#running-using-docker)

#### Running using local Node.js

Using the following instructions you should be able to:

- Run this UI using local Node.js
- Run the Kukkuu backend locally in Docker or use the public test environment's backend
- Use the public test environments of Helsinki Profile and Keycloak for authentication
- Log in successfully to this UI using your user account

1. Install the [requirements](#requirements)
2. If you want to use the [public test environment's backend](https://kukkuu.api.test.hel.ninja/graphql):
   - Delete `.env.local` file, if you have it left over, so `.env` is used
3. If you want to run the Kukkuu backend locally:
   - Copy `.env.local.example` to `.env.local` (used as env_file for environment variables)
   - Set up the backend by following the steps in [Running the Kukkuu backend locally](#running-the-kukkuu-backend-locally)
4. Run `yarn` to install dependencies
5. Run `yarn start` to run the app
6. Authorize a user for login into the backend using either:
   - [Authorizing user for login to local backend](#authorizing-user-for-login-to-local-backend) **or**
   - [Authorizing user for login to test environment's backend](#authorizing-user-for-login-to-test-environments-backend)
7. Open http://localhost:3001 to view the app in the browser and log in as the authorized user

#### Running using Docker

Using the following instructions you should be able to:

- Run this UI using Docker & Docker compose
- Run the Kukkuu backend locally in Docker or use the public test environment's backend
- Use the public test environments of Helsinki Profile and Keycloak for authentication
- Log in successfully to this UI using your user account

1. If you want to run the Kukkuu backend locally:
   - Copy `compose.override.yaml.example` to `compose.override.yaml` (used for setting the env_file)
   - Copy `.env.local.example` to `.env.local` (used as env_file for environment variables)
   - Set up the backend by following the steps in [Running the Kukkuu backend locally](#running-the-kukkuu-backend-locally)
2. If you want to use the [public test environment's backend](https://kukkuu.api.test.hel.ninja/graphql):
   - Delete `compose.override.yaml`, if you have it left over, so `compose.yaml` is used
3. Run `docker compose up` to run the app
   - Later if there are changes that need rebuilding the container, run `docker compose up --build`
4. Authorize a user for login into the backend using either:
   - [Authorizing user for login to local backend](#authorizing-user-for-login-to-local-backend) **or**
   - [Authorizing user for login to test environment's backend](#authorizing-user-for-login-to-test-environments-backend)
5. Open http://localhost:3001 to view the app in the browser and log in as the authorized user

#### Running the Kukkuu backend locally

If you want to run the Kukkuu backend locally:

- Clone the [backend repo](https://github.com/City-of-Helsinki/kukkuu)
- Follow its README to run it locally in Docker
- After this the backend should be running at http://localhost:8081/graphql (i.e. the value of `VITE_API_URI`)
  using public Keycloak test environment for authentication.

### Authorizing login to kukkuu-admin and integrating to Kukkuu API

You need to authorize the user you are trying to log in with to Kukkuu-Admin. In order to log in and get the staff / admin privileges, an authorization service is needed.

> **NOTE:** The Kukkuu API needs to be configured to use the same authorization service as the Kukkuu Admin UI is using, because only then the authorization can be verified.

#### Setup authorization service

Setup authorization service:

- **Use public test Keycloak**: The default and primary option. See [Using the Helsinki-Profile Keycloak](./docs/setup-keycloak.md).
- **Use a local Tunnistamo**: For a full local environment, see [Setting up Tunnistamo and Kukkuu API locally with Docker](./docs/setup-tunnistamo.md).

#### Setup Kukkuu API backend

You can use the public Kukkuu API from the test environment or set up a local Kukkuu API. It should be noted that in the public test environment, the data is shared with other users. If you want to test with your own data and have an isolated system, you need to set up a local API.

Choose the environment:

- **Use a public test environment API**: Check that your environment variables are set correctly. The examples are given in [.env.example](./.env.example).
- **Setup Kukkuu API locally**: See [Use Kukkuu API locally](./docs/setup-local-kukkuu-api.md).

##### Authorizing user for login to local backend

If you're using a local Kukkuu API backend (`VITE_API_URI=http://localhost:8081/graphql`), you can easily grant superuser privileges to your user account. Here's how:

1. **Start the backend:** Ensure your local Kukkuu API backend is running.

2. **Access the Django admin interface:**

   - Open the Django admin interface: http://localhost:8081/admin/
   - Log in with the default credentials: username `admin`, password `admin`. If you don't have an admin user yet, you can create one with `python manage.py createsuperuser`.

3. **Grant superuser privileges:**
   - Attempt to log in to Kukkuu-admin at http://localhost:3001/login using your desired user account. This will create the user in the backend if it doesn't exist.
   - In the Django admin interface, locate the user you just created and grant them superuser status.

You should now be able to log in to Kukkuu-admin with that user.

##### Authorizing user for login to test environment's backend

If you're using the test environment's backend (`VITE_API_URI=https://kukkuu.api.test.hel.ninja/graphql`), you'll need to grant superuser privileges to your user account. Here's how:

1. **Obtain Django admin credentials:**

   - Contact the administrator of the test environment's backend to get the credentials to its Django admin **or**
   - If you have access to the [backend pod in OpenShift](https://console-openshift-console.apps.arodevtest.hel.fi/k8s/ns/hki-kuva-kukkuu-test/pods?name=kukkuu-api&orderBy=desc&sortBy=Status&rowFilter-pod-status=Running), you can create a superuser by running `python manage.py createsuperuser` in the pod's terminal.

2. **Access the Django admin interface:**

   - Open the Django admin interface for the test environment's backend at https://kukkuu.api.test.hel.ninja/admin
   - Log in using the credentials from step 1.

3. **Grant superuser privileges:**
   - Attempt to log in to Kukkuu-admin at http://localhost:3001/login. This will create a user account in the backend if one doesn't exist.
     - **NOTE**: If you get stuck at "Viimeistellään tunnistautumista" (i.e. "Finishing authentication") stage,
       log in again, and you should get in.
   - In the Django admin interface, find the user you just created and grant them superuser privileges.

You should now be able to log in to Kukkuu-admin with your user account.

#### JWT issuance for browser tests

This section describes how JSON Web Tokens (JWT) are issued for browser tests.

In browser tests, we want to bypass the regular authentication flow and directly issue JWTs for testing user roles and permissions. This is achieved by mocking the authentication service and providing pre-generated JWTs with specific claims.

**How it works:**

- **[`clientUtils`](./browser-tests/utils/jwt/clientUtils/):** Contains helper functions that run within the Testcafe browser environment. These functions utilize Testcafe's [`ClientFunction`](https://testcafe.io/documentation/402832/guides/basic-guides/client-functions) to interact with the browser and manage JWTs.
- **[`mocks`](./browser-tests/utils/jwt/mocks/):** Provides functions to intercept network requests to the authentication service and replace them with mocked responses containing the test JWTs. This prevents actual authentication and allows us to control the user context during tests.
- **[`config`](./browser-tests/utils/jwt/config/):** Holds configuration settings for the JWT library used in browser tests.
- **[`jwt`](./browser-tests/utils/jwt/jwt.ts):** Contains utilities to create and sign JWTs symmetrically. The API needs to be configured with the same secret key to verify these tokens.
- **[`oidc`](./browser-tests/utils/jwt/oidc.ts):** Adapts the generated JWTs to a format compatible with the OpenID Connect (OIDC) client used in the application.
- **[`services`](./browser-tests/utils/jwt/services.ts):** Includes helper functions for managing test data, such as selecting an admin project for the test user. These functions make actual API calls (not mocked) to prepare the test environment.

**Key points:**

- The API and the Admin UI must share the same secret key (`BROWSER_TESTS_JWT_SIGN_SECRET`) for JWT verification.
- The `BROWSER_TESTS_JWT_AD_GROUP` environment variable defines the Active Directory group used for the test user, which should have admin privileges in the API.
- Several environment variables are used to configure the JWT mocking and testing environment.

### Husky Git Hooks

This project uses [Husky](https://typicode.github.io/husky/#/) to manage Git hooks. Husky is configured to run specific scripts before committing changes to ensure code quality and consistency.

#### Pre-commit Hook

The pre-commit hook is configured to run the following commands:

```sh
yarn doctoc .
yarn lint-staged
```

- `yarn doctoc .`: This command updates the table of contents in your markdown files.
- `yarn lint-staged`: This command runs linting on staged files to ensure they meet the project's coding standards. The lint-staged configuration can be found from [.lintstagedrc.json](./.lintstagedrc.json).

> NOTE: `doctoc` and `husky` does not work seamlessly together, since the `doctoc` does update the TOCs of the markdown files, but does not reject the pre-commit hook execution, and only leaves the refactored files as unstaged in Git.

#### Commit-msg Hook

The commit-msg hook is configured to run the following command:

```sh
npx --no-install commitlint --edit "$1"
```

- `npx --no-install commitlint --edit "$1"`: This command uses [Commitlint](https://commitlint.js.org/#/) to lint commit messages based on the project's commit message conventions. This repo follows the [Conventional Commits](#conventional-commits).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in development mode.
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` directory.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [building for production](https://vitejs.dev/guide/build.html) and [CLI guide](https://vitejs.dev/guide/cli.html#vite-build) for more information.

### `yarn generate:graphql`

Fetches the GraphQL schema from the backend and updates typing information. The configuration is written in [codegen.ts](./codegen.ts). Check that the environment variables are set properly to match with your API.

### `yarn test`

Launches the `vitest` test runner. See the section about [Getting started](https://vitest.dev/guide/) for more information.

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

## Releases, changelogs and deployments

The used environments are listed in [Service environments](#service-environments).

The application uses automatic semantic versions and is released using [Release Please](https://github.com/googleapis/release-please).

> Release Please is a GitHub Action that automates releases for you. It will create a GitHub release and a GitHub Pull Request with a changelog based on conventional commits.

Each time you merge a "normal" pull request, the release-please-action will create or update a "Release PR" with the changelog and the version bump related to the changes (they're named like `release-please--branches--master--components--kukkuu-admin`).

To create a new release for an app, this release PR is merged, which creates a new release with release notes and a new tag. This tag will be picked by Azure pipeline and trigger a new deployment to staging. From there, the release needs to be manually released to production.

When merging release PRs, make sure to use the "Rebase and merge" (or "Squash and merge") option, so that Github doesn't create a merge commit. All the commits must follow the conventional commits format. This is important, because the release-please-action does not work correctly with merge commits (there's an open issue you can track: [Chronological commit sorting means that merged PRs can be ignored ](https://github.com/googleapis/release-please/issues/1533)).

See [Release Please Implementation Design](https://github.com/googleapis/release-please/blob/main/docs/design.md) for more details.

And all docs are available here: [release-please docs](https://github.com/googleapis/release-please/tree/main/docs).

### Conventional Commits

Use [Conventional Commits](https://www.conventionalcommits.org/) to ensure that the changelogs are generated correctly.

### Releasable units

Release please goes through commits and tries to find "releasable units" using commit messages as guidance - it will then add these units to their respective release PR's and figures out the version number from the types: `fix` for patch, `feat` for minor, `feat!` for major. None of the other types will be included in the changelog. So, you can use for example `chore` or `refactor` to do work that does not need to be included in the changelog and won't bump the version.

### Configuration

The release-please workflow is located in the [release-please.yml](./.github/workflows/release-please.yml) file.

The configuration for release-please is located in the [release-please-config.json](./release-please-config.json) file.
See all the options here: [release-please docs](https://github.com/googleapis/release-please/blob/main/docs/manifest-releaser.md).

The manifest file is located in the [release-please-manifest.json](./.release-please-manifest.json) file.

When adding a new app, add it to both the [release-please-config.json](./release-please-config.json) and [release-please-manifest.json](./.release-please-manifest.json) file with the current version of the app. After this, release-please will keep track of versions with [release-please-manifest.json](./.release-please-manifest.json).

### Troubleshoting release-please

If you were expecting a new release PR to be created or old one to be updated, but nothing happened, there's probably one of the older release PR's in pending state or action didn't run.

1. Check if the release action ran for the last merge to main. If it didn't, run the action manually with a label.
2. Check if there's any open release PR. If there is, the work is now included on this one (this is the normal scenario).
3. If you do not see any open release PR related to the work, check if any of the closed PR's are labeled with `autorelease: pending` - ie. someone might have closed a release PR manually. Change the closed PR's label to `autorelease: tagged`. Then go and re-run the last merge workflow to trigger the release action - a new release PR should now appear.
4. Finally check the output of the release action. Sometimes the bot can't parse the commit message and there is a notification about this in the action log. If this happens, it won't include the work in the commit either. You can fix this by changing the commit message to follow the [Conventional Commits](https://www.conventionalcommits.org/) format and rerun the action.

**Important!** If you have closed a release PR manually, you need to change the label of closed release PR to `autorelease: tagged`. Otherwise, the release action will not create a new release PR.

**Important!** Extra label will force release-please to re-generate PR's. This is done when action is run manually with prlabel -option

Sometimes there might be a merge conflict in release PR - this should resolve itself on the next push to main. It is possible run release-please action manually with label, it should recreate the PR's. You can also resolve it manually, by updating the [release-please-manifest.json](./.release-please-manifest.json) file.

#### Fix merge conflicts by running release-please -action manually

1. Open [release-please github action](https://github.com/City-of-Helsinki/kukkuu-admin/actions/workflows/release-please.yml)
2. Click **Run workflow**
3. Check Branch is **master**
4. Leave label field empty. New label is not needed to fix merge issues
5. Click **Run workflow** -button

There's also a CLI for debugging and manually running releases available for release-please: [release-please-cli](https://github.com/googleapis/release-please/blob/main/docs/cli.md)

### Deployments

When a Release-Please pull request is merged and a version tag is created (or a proper tag name for a commit is manually created), this tag will be picked by Azure pipeline, which then triggers a new deployment to staging. From there, the deployment needs to be manually approved to allow it to proceed to the production environment.

The tag name is defined in the [azure-pipelines-release.yml](./azure-pipelines-release.yml).

## License

This project is licensed under the **[MIT License](LICENSE.md)**.
