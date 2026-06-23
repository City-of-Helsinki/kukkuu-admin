# ============================================================
# STAGE 1: Build base (install dependencies)
# ============================================================
FROM helsinki.azurecr.io/ubi9/nodejs-24-pnpm-builder-base AS appbase

# 1. Copy only necessary files for build
COPY --chown=default:root package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY --chown=default:root public ./public
COPY --chown=default:root scripts ./scripts
COPY --chown=default:root \
  index.html \
  vite.config.ts \
  tsconfig.json \
  vite-env.d.ts \
  .babelrc \
  .eslintrc.cjs \
  .eslintignore \
  .prettierrc.json \
  .prettierignore \
  .env* \
  ./
COPY --chown=default:root ./src ./src

# 2. Run the install and update-runtime-env script
# corepack in the base image will automatically use the version of pnpm
# defined in your package.json 'packageManager' field if present.
RUN pnpm install --frozen-lockfile --ignore-scripts && pnpm store prune
RUN pnpm update-runtime-env

# ============================================================
# STAGE 2: Development
# ============================================================
FROM appbase AS development

WORKDIR /app

# Set NODE_ENV to development in the development container
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

# Enable hot reload by default by polling for file changes.
#
# NOTE: Can be disabled by setting CHOKIDAR_USEPOLLING=false in file `.env`
#       if hot reload works on your system without polling to save CPU time.
ARG CHOKIDAR_USEPOLLING=true
ENV CHOKIDAR_USEPOLLING=${CHOKIDAR_USEPOLLING}

EXPOSE 8080

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

# 2. Setup Runtime Env Injection
# env.sh is provided by the base image
WORKDIR /usr/share/nginx/html
COPY .env .

# 3. Inject Versioning for the /readiness endpoint from package.json using base image
COPY package.json .

# - env.sh      (Inherited from base image at /usr/share/nginx/html/env.sh)
# - USER 1001   (Inherited from base image)
# - EXPOSE 8080 (Inherited from base image)
# - ENTRYPOINT/CMD (Inherited from base image)
