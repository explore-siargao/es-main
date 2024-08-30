FROM --platform=linux/amd64 node:20.11.1-slim

ARG API_URL
ARG API_AUTH_URL
ARG API_MOCK_URL
ARG WEB_URL
ARG RECAPTCHA_KEY
ARG RECAPTCHA_KEY_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_SECRET_ID
ARG FACEBOOK_CLIENT_ID
ARG FACEBOOK_SECRET_ID
ARG CARD_ENCRYPT_KEY
ARG PASSWORD_ENCRYPT_KEY
ARG WINDY_KEY
ARG PAYLOAD_URL

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"

WORKDIR /usr/src/app

RUN echo "API_URL=${API_URL}" >> .env && \
    echo "API_AUTH_URL=${API_AUTH_URL}" >> .env && \
    echo "API_MOCK_URL=${API_MOCK_URL}" >> .env && \
    echo "WEB_URL=${WEB_URL}" >> .env && \
    echo "RECAPTCHA_KEY=${RECAPTCHA_KEY}" >> .env && \
    echo "RECAPTCHA_KEY_SECRET=${RECAPTCHA_KEY_SECRET}" >> .env && \
    echo "GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}" >> .env && \
    echo "GOOGLE_SECRET_ID=${GOOGLE_SECRET_ID}" >> .env && \
    echo "FACEBOOK_CLIENT_ID=${FACEBOOK_CLIENT_ID}" >> .env && \
    echo "FACEBOOK_SECRET_ID=${FACEBOOK_SECRET_ID}" >> .env && \
    echo "CARD_ENCRYPT_KEY=${CARD_ENCRYPT_KEY}" >> .env && \
    echo "PASSWORD_ENCRYPT_KEY=${PASSWORD_ENCRYPT_KEY}" >> .env && \
    echo "WINDY_KEY=${WINDY_KEY}" >> .env && \
    echo "PAYLOAD_URL=${PAYLOAD_URL}" >> .env
 
# Copy root folders files
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY tsconfig.json ./
COPY turbo.json ./
 
# Copy sub folders files
COPY apps/web ./apps/web
COPY packages/contract ./packages/contract
COPY packages/constants ./packages/constants
COPY packages/services ./packages/services
COPY packages/eslint-config ./packages/eslint-config
COPY packages/typescript-config ./packages/typescript-config

# Install global packages
RUN npm install -g pnpm@8.14.1
RUN pnpm add -g typescript

# Run setup
RUN pnpm install
RUN pnpm run build
 
EXPOSE 3000
 
CMD [ "pnpm", "run", "start" ]