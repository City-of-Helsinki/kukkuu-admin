# ============================================================
# STAGE 1: Build base (install dependencies)
# ============================================================
FROM helsinki.azurecr.io/ubi9/nodejs-24-pnpm-builder-base AS appbase
WORKDIR /app

# Defaults to production; compose overrides this to development on build and run.
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# 1. Install dependencies (cached unless the manifests change).
# corepack in the base image uses the pnpm version from package.json's
# "packageManager" field automatically.
COPY --chown=default:root package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts && pnpm store prune

# 2. Copy the rest of the source.
COPY --chown=default:root . ./

# 3. Generate a build-time public/env-config.js. Its *contents* are overwritten
# at container start by the base image's env.sh with the real runtime values.
RUN pnpm update-runtime-env

# ============================================================
# STAGE 2: Development
# ============================================================
FROM appbase AS development
WORKDIR /app

ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

# Enable hot reload by default by polling for file changes.
#
# NOTE: Can be disabled by setting CHOKIDAR_USEPOLLING=false in file `.env`
#       if hot reload works on your system without polling to save CPU time.
ARG CHOKIDAR_USEPOLLING=true
ENV CHOKIDAR_USEPOLLING=${CHOKIDAR_USEPOLLING}

# `pnpm start` runs update-runtime-env then vite (port from PORT env, default 3001).
CMD ["pnpm", "start", "--no-open", "--host"]

# ============================================================
# STAGE 3: Static builder for production
# ============================================================
FROM appbase AS staticbuilder

# VITE_CSP_REPORT_URI is substituted into index.html's CSP at *build* time by
# Vite (it is not a runtime value). Default to empty so the placeholder is not
# left unreplaced in the output.
ARG VITE_CSP_REPORT_URI
ENV VITE_CSP_REPORT_URI=${VITE_CSP_REPORT_URI:-""}

RUN pnpm build

# ============================================================
# STAGE 4: Production runtime
# ============================================================
FROM helsinki.azurecr.io/ubi10/nginx-126-spa-standard AS production

# 1. Copy the compiled assets.
COPY --from=staticbuilder /app/build /usr/share/nginx/html

# 2. Runtime env injection inputs (env.sh from the base image reads these).
# .env lists which keys to expose in env-config.js; the values are overwritten
# at container start with the real runtime environment.
WORKDIR /usr/share/nginx/html
COPY .env.example ./.env

# 3. package.json powers the base image's /readiness version endpoint.
COPY package.json .

# Inherited from the base image:
#   - env.sh at /usr/share/nginx/html/env.sh
#   - USER 1001
#   - EXPOSE 8080
#   - ENTRYPOINT/CMD
