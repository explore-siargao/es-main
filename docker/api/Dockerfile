FROM --platform=linux/amd64 node:20.10.0-slim

RUN apt-get update
RUN apt-get install -y openssl

ARG API_PORT
ARG PASSWORD_ENCRYPT_KEY
ARG CARD_ENCRYPT_KEY
ARG CSRF_SIGN_KEY
ARG ALLOWED_CLIENTS
ARG WEB_URL
ARG API_URL
ARG API_MOCK_URL
ARG RECAPTCHA_KEY_SECRET
ARG AWS_ACCESS_KEY
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION
ARG AWS_S3_BUCKET
ARG XENDIT_URL
ARG XENDIT_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_SECRET_ID
ARG GOOGLE_APIS_URL
ARG EXCHANGERATE_API_KEY
ARG REDIS_URL
ARG WINDY_KEY
ARG MONGO_URL
ARG CLIENT_ORIGINS
ARG DATABASE_URL
ARG SHADOW_DATABASE_URL

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"

WORKDIR /usr/src/app

RUN echo "API_PORT=$API_PORT" > .env && \
    echo "PASSWORD_ENCRYPT_KEY=${PASSWORD_ENCRYPT_KEY}" >> .env && \
    echo "CARD_ENCRYPT_KEY=${CARD_ENCRYPT_KEY}" >> .env && \
    echo "CSRF_SIGN_KEY=${CSRF_SIGN_KEY}" >> .env && \
    echo "ALLOWED_CLIENTS=${ALLOWED_CLIENTS}" >> .env && \
    echo "WEB_URL=${WEB_URL}" >> .env && \
    echo "API_URL=${API_URL}" >> .env && \
    echo "API_MOCK_URL=${API_MOCK_URL}" >> .env && \
    echo "RECAPTCHA_KEY_SECRET=${RECAPTCHA_KEY_SECRET}" >> .env && \
    echo "AWS_ACCESS_KEY=${AWS_ACCESS_KEY}" >> .env && \
    echo "AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}" >> .env && \
    echo "AWS_REGION=${AWS_REGION}" >> .env && \
    echo "AWS_S3_BUCKET=${AWS_S3_BUCKET}" >> .env && \
    echo "XENDIT_URL=${XENDIT_URL}" >> .env && \
    echo "XENDIT_SECRET=${XENDIT_SECRET}" >> .env && \
    echo "GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}" >> .env && \
    echo "GOOGLE_SECRET_ID=${GOOGLE_SECRET_ID}" >> .env && \
    echo "GOOGLE_APIS_URL=${GOOGLE_APIS_URL}" >> .env && \
    echo "EXCHANGERATE_API_KEY=${EXCHANGERATE_API_KEY}" >> .env && \
    echo "REDIS_URL=${REDIS_URL}" >> .env && \
    echo "WINDY_KEY=${WINDY_KEY}" >> .env && \
    echo "CLIENT_ORIGINS=${CLIENT_ORIGINS}" >> .env && \
    echo "DATABASE_URL=${DATABASE_URL}" >> .env && \
    echo "SHADOW_DATABASE_URL=${SHADOW_DATABASE_URL}" >> .env && \
    echo "MONGO_URL=${MONGO_URL}" >> .env

# Copy root folders files
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY tsconfig.json ./
COPY turbo.json ./
 
# Copy sub folders files
COPY apps/api ./apps/api
COPY packages/contract ./packages/contract
COPY packages/contract-2 ./packages/contract-2
COPY packages/constants ./packages/constants
COPY packages/database ./packages/database
COPY packages/services ./packages/services
COPY packages/eslint-config ./packages/eslint-config
COPY packages/typescript-config ./packages/typescript-config

# Install global packages
RUN npm install -g pnpm@8.14.1
RUN pnpm add -g typescript

# Run setup
RUN pnpm install
RUN pnpm run build
 
EXPOSE 9000
 
CMD [ "pnpm", "run", "start" ]