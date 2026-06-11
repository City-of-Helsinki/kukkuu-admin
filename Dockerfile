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

# 2. Generate a build-time public/env-config.js. Its *contents* are overwritten
# at container start by the base image's env.sh with the real runtime values.
# update-runtime-env only needs the script, the public/ output dir and the .env
# key templates, so copy just those — editing src/ won't invalidate this layer.
COPY --chown=default:root scripts ./scripts
COPY --chown=default:root public ./public
COPY --chown=default:root .env* ./
RUN pnpm update-runtime-env

# 3. Copy only the sources the production build (`tsc && vite build`) consumes.
# tsconfig "include" is ["src"]; the build also reads these root configs — Vite
# itself, the babel presets used by @vitejs/plugin-react, and the eslint/prettier
# configs run by @nabla/vite-plugin-eslint. Tests, docs, codegen and other
# tooling are intentionally left out (and also pruned via .dockerignore).
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
  ./
COPY --chown=default:root src ./src

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

# Produce a sanitized runtime env template for the production image. The base
# image's env.sh is a naive KEY=VALUE parser: it does NOT skip comments or blank
# lines, so any "# comment"/blank line in .env makes it emit an empty-key entry
# (`: ""`) or duplicate the previous key — corrupting env-config.js into invalid
# JavaScript (SyntaxError at load → window._env_ undefined → app can't boot).
# Keep only `KEY=VALUE` lines so env.sh always generates valid JS.
RUN grep -E '^[A-Za-z_][A-Za-z0-9_]*=' .env.example > .env.runtime

# ============================================================
# STAGE 4: Production runtime
# ============================================================
FROM helsinki.azurecr.io/ubi10/nginx-126-spa-standard AS production

# 1. Copy the compiled assets.
COPY --from=staticbuilder /app/build /usr/share/nginx/html

# 2. Runtime env injection inputs (env.sh from the base image reads these).
# .env lists which keys to expose in env-config.js; the values are overwritten
# at container start with the real runtime environment. Use the sanitized,
# comment-free template (see staticbuilder) — the base image's env.sh cannot
# parse comments/blank lines and would otherwise emit invalid JavaScript.
WORKDIR /usr/share/nginx/html
COPY --from=staticbuilder /app/.env.runtime ./.env

# 3. package.json powers the base image's /readiness version endpoint.
COPY package.json .

# Inherited from the base image:
#   - env.sh at /usr/share/nginx/html/env.sh
#   - USER 1001
#   - EXPOSE 8080
#   - ENTRYPOINT/CMD
