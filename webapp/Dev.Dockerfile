FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN mkdir -p /var/www/html/web
WORKDIR /var/www/html/web
COPY package.json pnpm-lock.yaml ./

FROM base AS install
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base
COPY --from=install /var/www/html/web/node_modules /var/www/html/web/node_modules
COPY . /var/www/html/web
EXPOSE 5173
CMD ["npm", "run", "dev"]
