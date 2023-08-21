# ===============================================
FROM registry.access.redhat.com/ubi8/nodejs-14  as appbase
# ===============================================

# install yarn
USER 0
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
RUN yarn policies set-version $YARN_VERSION

# Copy package.json and package-lock.json/yarn.lock files
COPY package*.json *yarn* ./

# Install npm dependencies
ENV PATH /app/node_modules/.bin:$PATH

RUN yarn && yarn cache clean --force

# =============================
FROM appbase as development
# =============================

# Set NODE_ENV to development in the development container
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

# copy in our source code last, as it changes the most
COPY --chown=1001:1001 . .

# Use non-root user
USER 1001

# Bake package.json start command into the image
CMD ["react-scripts", "start"]

# ===================================
FROM appbase as staticbuilder
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

COPY . /app
RUN yarn build

# =============================
FROM nginx:1.17 as production
# =============================

# Nginx runs with user "nginx" by default
COPY --from=staticbuilder --chown=nginx:nginx /app/build /usr/share/nginx/html

COPY .prod/nginx.conf /etc/nginx/conf.d/default.conf

# Use non-root user
USER 1001

EXPOSE 8080
