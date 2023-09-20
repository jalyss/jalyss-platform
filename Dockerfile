ARG NODE_VERSION=18
#ARG ALPINE_VERSION=3.15

FROM node:${NODE_VERSION}-alpine AS deps

RUN apk add --no-cache rsync libc6-compat

WORKDIR /workspace-install

#RUN yarn set version berry
COPY yarn.lock .yarnrc.yml ./
COPY .yarn/ ./.yarn/

RUN --mount=type=bind,target=/docker-context \
    rsync -amv --delete \
    --exclude='node_modules' \
    --exclude='*/node_modules' \
    --include='package.json' \
    --include='schema.prisma' \
    --include='*/' --exclude='*' \
    /docker-context/ /workspace-install/;

# @see https://www.prisma.io/docs/reference/api-reference/environment-variables-reference#cli-binary-targets
ENV PRISMA_CLI_BINARY_TARGETS=linux-musl

# To speed up installations, we override the default yarn cache folder
# and mount it as a buildkit cache mount (builkit will rotate it if needed)
# This strategy allows to exclude the yarn cache in subsequent docker
# layers (size benefit) and reduce packages fetches.
#
# PS:
#  1. Cache mounts can be used in CI (github actions)
#  2. To manually clear the cache
#     > docker builder prune --filter type=exec.cachemount
RUN --mount=type=cache,target=/root/.yarn-cache \
    YARN_CACHE_FOLDER=/root/.yarn-cache \
    yarn install --immutable --inline-builds

FROM node:${NODE_VERSION}-alpine AS builder

ARG REACT_APP_API_ENDPOINT

ENV REACT_APP_API_ENDPOINT=$REACT_APP_API_ENDPOINT 
  

WORKDIR /app
COPY . .
COPY --from=deps /workspace-install ./

#RUN yarn rebuild
RUN yarn workspaces foreach -ptR --from '{back,back-office}' run build

RUN --mount=type=cache,target=/root/.yarn-cache \
    YARN_CACHE_FOLDER=/root/.yarn-cache \
    yarn workspaces focus back --production

FROM node:${NODE_VERSION}-alpine AS production

WORKDIR /app
ENV NODE_ENV=production 
   

# disable npm update warnings
#RUN echo "update-notifier=false" >> ~/.npmrc

COPY --from=builder /app/apps/back-office/build ./apps/back-office/build
# COPY --from=builder /app/libs/prisma ./libs/prisma
COPY --from=builder /app/apps/back/package.json ./back/package.json
COPY --from=builder /app/apps/back/dist ./back/dist
COPY --from=builder /app/apps/back/configs ./back/configs
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3001

CMD ["node", "back/dist/main.js"]
