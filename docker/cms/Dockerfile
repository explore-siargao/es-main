FROM --platform=linux/amd64 node:20.11.1-slim

ARG PAYLOAD_PORT
ARG PAYLOAD_DATABASE_URI
ARG PAYLOAD_SECRET
ARG PAYLOAD_PUBLIC_SERVER_URL
ARG PAYLOAD_NEXT_PUBLIC_SERVER_URL
ARG PAYLOAD_NEXT_PUBLIC_IS_LIVE
ARG PAYLOAD_PUBLIC_DRAFT_SECRET
ARG PAYLOAD_NEXT_PRIVATE_DRAFT_SECRET
ARG PAYLOAD_REVALIDATION_KEY
ARG PAYLOAD_NEXT_PRIVATE_REVALIDATION_KEY

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"

WORKDIR /usr/src/app

RUN echo "PAYLOAD_PORT=${PAYLOAD_PORT}" >> .env.cms && \
    echo "PAYLOAD_DATABASE_URI=${PAYLOAD_DATABASE_URI}" >> .env.cms && \
    echo "PAYLOAD_SECRET=${PAYLOAD_SECRET}" >> .env.cms && \
    echo "PAYLOAD_PUBLIC_SERVER_URL=${PAYLOAD_PUBLIC_SERVER_URL}" >> .env.cms && \
    echo "PAYLOAD_NEXT_PUBLIC_SERVER_URL=${PAYLOAD_NEXT_PUBLIC_SERVER_URL}" >> .env.cms && \
    echo "PAYLOAD_NEXT_PUBLIC_IS_LIVE=${PAYLOAD_NEXT_PUBLIC_IS_LIVE}" >> .env.cms && \
    echo "PAYLOAD_PUBLIC_DRAFT_SECRET=${PAYLOAD_PUBLIC_DRAFT_SECRET}" >> .env.cms && \
    echo "PAYLOAD_NEXT_PRIVATE_DRAFT_SECRET=${PAYLOAD_NEXT_PRIVATE_DRAFT_SECRET}" >> .env.cms && \
    echo "PAYLOAD_REVALIDATION_KEY=${PAYLOAD_REVALIDATION_KEY}" >> .env.cms && \
    echo "PAYLOAD_NEXT_PRIVATE_REVALIDATION_KEY=${PAYLOAD_NEXT_PRIVATE_REVALIDATION_KEY}" >> .env.cms

# Copy root folders files
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY .npmrc ./
COPY tsconfig.json ./
COPY turbo.json ./
 
# Copy sub folders files
COPY apps/cms ./apps/cms
COPY packages/eslint-config ./packages/eslint-config
COPY packages/typescript-config ./packages/typescript-config

# Install global packages
RUN npm install -g pnpm@8.14.1
RUN pnpm add -g typescript

# Run setup
RUN pnpm install
RUN pnpm run build
 
EXPOSE 5000
 
CMD [ "pnpm", "run", "start" ]