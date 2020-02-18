# Kukkuu admin

:baby: Staff interface for Kulttuurin kummilapset / Godchildren of Culture :violin:

## Getting started

1. Clone the repo.
2. Use file `.env.local` to modify environment variables if needed. For more info, check [this](https://create-react-app.dev/docs/adding-custom-environment-variables#docsNav).
3. Run either
    * `yarn start` to run the app normally **or**
    * `docker-compose up` to run the app in a Docker container. In the future when there are changes that need rebuilding the container, run `docker-compose up --build` instead.
4. Open [http://localhost:3001](http://localhost:3001) to view the app in the browser.

## Setting up Tunnistamo and Kukkuu API locally with Docker

### Set Tunnistamo hostname
Add the following line to your hosts file (`/etc/hosts` on mac and linux):

    127.0.0.1 tunnistamo-backend

### Create a new OAuth app on GitHub
Go to https://github.com/settings/developers/ and add a new app with the following settings:

- Application name: can be anything, e.g. local tunnistamo
- Homepage URL: http://tunnistamo-backend:8000
- Authorization callback URL: http://tunnistamo-backend:8000/accounts/github/login/callback/

Save. You'll need the created **Client ID** and **Client Secret** for configuring tunnistamo in the next step.

### Install local Tunnistamo
Clone https://github.com/City-of-Helsinki/tunnistamo/.

Follow the instructions for setting up tunnistamo locally. Before running `docker-compose up` set the following settings in tunnistamo roots `docker-compose.env.yaml`:

- SOCIAL_AUTH_GITHUB_KEY: **Client ID** from the GitHub OAuth app
- SOCIAL_AUTH_GITHUB_SECRET: **Client Secret** from the GitHub OAuth app

As of Nov 15 2019 there is a bug in tunnistamo with cors, a workaround is to set this line in `tunnistamo/settings.py`:
`CORS_URLS_REGEX = r'.*/(\.well-known/openid-configuration|v1|openid|api-tokens|jwt-token).*'`

After you've got tunnistamo running locally, ssh to the tunnistamo docker container:

`docker-compose exec django bash`

and execute the following four commands inside your docker container:

```bash
./manage.py add_oidc_client -n kukkuu-admin-ui -t "id_token token" -u "http://localhost:3001/callback" -i https://api.hel.fi/auth/kukkuu-admin-ui -m github -s dev
./manage.py add_oidc_client -n kukkuu-api -t "code" -u http://localhost:8081/return -i https://api.hel.fi/auth/kukkuu -m github -s dev -c
./manage.py add_oidc_api -n kukkuu -d https://api.hel.fi/auth -s email,profile -c https://api.hel.fi/auth/kukkuu
./manage.py add_oidc_api_scope -an kukkuu -c https://api.hel.fi/auth/kukkuu-admin-ui -n "Kulttuurin kummilapset Admin UI" -d"Lorem ipsum"
```

To make Kukkuu Admin use the local Tunnistamo set `REACT_APP_OIDC_AUTHORITY="http://tunnistamo-backend:8000"` for example in file `.env.local`.

### Install Kukkuu API locally
Clone the repository (https://github.com/City-of-Helsinki/kukkuu). Follow the instructions for running kukkuu with docker. Before running `docker-compose up` set the following settings in kukkuu roots `docker-compose.env.yaml`:

- CORS_ORIGIN_ALLOW_ALL=1
- TOKEN_AUTH_AUTHSERVER_URL=http://tunnistamo-backend:8000/openid

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

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
