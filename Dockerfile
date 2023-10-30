# ===============================================
FROM registry.access.redhat.com/ubi9/nodejs-18 AS appbase
# ===============================================

# install yarn
USER root
RUN curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo
RUN yum -y install yarn

WORKDIR /app

# Offical image has npm log verbosity as info. More info - https://github.com/nodejs/docker-node#verbosity
ENV NPM_CONFIG_LOGLEVEL warn

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Global npm deps in a non-root user directory
ENV NPM_CONFIG_PREFIX=/app/.npm-global
ENV PATH=$PATH:/app/.npm-global/bin

# Yarn
ENV YARN_VERSION 1.22.4
RUN yarn policies set-version ${YARN_VERSION}

# Copy package.json and package-lock.json/yarn.lock files
COPY package*.json *yarn* ./

# Install npm dependencies
ENV PATH /app/node_modules/.bin:$PATH

RUN yarn && yarn cache clean --force

# =============================
FROM appbase AS development
# =============================

# Set NODE_ENV to development in the development container
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

# copy in our source code last, as it changes the most
COPY --chown=default:root . .

# Bake package.json start command into the image
CMD ["react-scripts", "start"]

# ===================================
FROM appbase AS staticbuilder
# ===================================

ARG REACT_APP_API_URI
ARG REACT_APP_OIDC_AUTHORITY
ARG REACT_APP_OIDC_CLIENT_ID
ARG REACT_APP_OIDC_SCOPE
ARG REACT_APP_KUKKUU_API_OIDC_SCOPE
ARG REACT_APP_ENVIRONMENT
ARG REACT_APP_SENTRY_DSN
ARG REACT_APP_IS_TEST_ENVIRONMENT
ARG REACT_APP_FEATURE_FLAG_EXTERNAL_TICKET_SYSTEM_SUPPORT
ARG REACT_APP_BUILDTIME
ARG REACT_APP_RELEASE
ARG REACT_APP_COMMITHASH

# Use template and inject the environment variables into .prod/nginx.conf
ENV REACT_APP_BUILDTIME=${REACT_APP_BUILDTIME:-""}
ENV REACT_APP_RELEASE=${REACT_APP_RELEASE:-""}
ENV REACT_APP_COMMITHASH=${REACT_APP_COMMITHASH:-""}
COPY .prod/nginx.conf.template /tmp/.prod/nginx.conf.template
RUN export APP_VERSION=$(yarn --silent app:version) && \
    envsubst '${APP_VERSION},${REACT_APP_BUILDTIME},${REACT_APP_RELEASE},${REACT_APP_COMMITHASH}' < \
    "/tmp/.prod/nginx.conf.template" > \
    "/tmp/.prod/nginx.conf"

COPY . /app
RUN yarn build

# =============================
FROM nginx:1.22 AS production
# FROM registry.access.redhat.com/ubi9/nginx-122 AS production
# =============================
COPY --from=staticbuilder --chown=nginx:nginx /app/build /usr/share/nginx/html
COPY --from=staticbuilder --chown=nginx:nginx /tmp/.prod/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
