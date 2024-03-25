[![codecov](https://codecov.io/gh/City-of-Helsinki/kukkuu-admin/branch/develop/graph/badge.svg)](https://codecov.io/gh/City-of-Helsinki/kukkuu-admin)
![Build & Staging](https://github.com/City-of-Helsinki/kukkuu-admin/workflows/Build%20&%20Staging%20&%20Accept/badge.svg)

# Staff interface for Kulttuurin kummilapset / Culture Kids

:baby: Staff interface for Kulttuurin kummilapset / Culture Kids :violin:

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
   - `docker-compose up` to run the app in a Docker container. In the future when there are changes that need rebuilding the container, run `docker-compose up --build` instead.
5. Open [http://localhost:3001](http://localhost:3001) to view the app in the browser.

### Authorizing login to kukkuu-admin

You need to authorize the user you are trying to log in with to kukkuu-admin.

#### Using local kukkuu backend

If you have set up a local kukkuu backend i.e. in your `.env.local`

> REACT_APP_API_URI=http://localhost:8081/graphql

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

> REACT_APP_API_URI=https://kukkuu.api.test.hel.ninja/graphql

You need to:

1.  Obtain credentials to log in to the django-admin interface of the backend from
    someone or something that has them or if you have credentials to the pod which runs
    the backend you can create a superuser to log in to the backend by running
    `python manage.py createsuperuser` in the pod's terminal. Then you can use those
    credentials to log in to the django-admin interface of the backend.
2.  Try to log in to kukkuu-admin at http://localhost:3001/login with some user
3.  Open the backend's django-admin interface at (e.g.
    https://kukkuu.api.test.hel.ninja/admin if your
    `REACT_APP_API_URI=https://kukkuu.api.test.hel.ninja/graphql`) using the
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

Follow the instructions for setting up tunnistamo locally. Before running `docker-compose up` set the following settings in tunnistamo roots `docker-compose.env.yaml`:

- SOCIAL_AUTH_GITHUB_KEY: **Client ID** from the GitHub OAuth app
- SOCIAL_AUTH_GITHUB_SECRET: **Client Secret** from the GitHub OAuth app

After you've got tunnistamo running locally, ssh to the tunnistamo docker container:

`docker-compose exec django bash`

and execute the following four commands inside your docker container:

```bash
./manage.py add_oidc_client -n kukkuu-admin-ui -t "id_token token" -u "http://localhost:3001/callback" -i https://api.hel.fi/auth/kukkuu-admin-ui -m github -s dev
./manage.py add_oidc_client -n kukkuu-api -t "code" -u http://localhost:8081/return -i https://api.hel.fi/auth/kukkuu -m github -s dev -c
./manage.py add_oidc_api -n kukkuu -d https://api.hel.fi/auth -s email,profile -c https://api.hel.fi/auth/kukkuu
./manage.py add_oidc_api_scope -an kukkuu -c https://api.hel.fi/auth/kukkuu -n "Kulttuurin kummilapset" -d"Lorem ipsum"
./manage.py add_oidc_client_to_api_scope -asi https://api.hel.fi/auth/kukkuu -c https://api.hel.fi/auth/kukkuu-admin-ui
```

To make Kukkuu Admin use the local Tunnistamo set `REACT_APP_OIDC_AUTHORITY="http://tunnistamo-backend:8000"` for example in file `.env.local`.

#### Install Kukkuu API locally

Clone the repository (https://github.com/City-of-Helsinki/kukkuu). Follow the instructions for running kukkuu with docker. Before running `docker-compose up` set the following settings in kukkuu roots `docker-compose.env.yaml`:

- DEBUG=1
- CORS_ORIGIN_ALLOW_ALL=1
- TOKEN_AUTH_AUTHSERVER_URL=http://tunnistamo-backend:8000/openid
- APPLY_MIGRATIONS=1
- CREATE_SUPERUSER=1
- TOKEN_AUTH_AUTHSERVER_URL=http://tunnistamo-backend:8000/openid
- MEDIA_ROOT=/app/var/

To make Kukkuu Admin use the local Kukkuu API set `REACT_APP_API_URI="localhost:8081/graphql"` for example in file `.env.local`.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn graphql-types`

Fetches the schema from backend and updates typing information.

### `yarn test:browser`

Runs browser tests against your local version of the application (assumes port `3001`).

For this command to work, you need to add the environment variables in the `kukkuu-admin_e2e-test-keys.txt` file in the secrets repo into your environment. The test script supports the `.env` file for setting up the environment.

The `yarn test:browser:ci` variant of this command is meant to run in the CI, and it targets the staging server. It uses headless mode and may therefore behave differently compared to the local test runner.

Browser tests are ran against PR and staging environments when after they have been built and deployed.

## Debugging

See instructions in the sister project: https://github.com/City-of-Helsinki/kukkuu-ui/
