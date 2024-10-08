FROM --platform=linux/amd64 node:20.10.0-slim

RUN apt-get update
RUN apt-get install -y openssl

ARG PAYLOAD_PORT
ARG PAYLOAD_DATABASE_URI
ARG PAYLOAD_SECRET
ARG PAYLOAD_URL
ARG AWS_ACCESS_KEY
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION
ARG AWS_S3_BUCKET
ARG WEB_URL

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"

WORKDIR /usr/src/app

RUN echo "PAYLOAD_PORT=$PAYLOAD_PORT" > .env && \
    echo "PAYLOAD_DATABASE_URI=${PAYLOAD_DATABASE_URI}" >> .env && \
    echo "PAYLOAD_SECRET=${PAYLOAD_SECRET}" >> .env && \
    echo "PAYLOAD_URL=${PAYLOAD_URL}" >> .env && \
    echo "AWS_ACCESS_KEY=${AWS_ACCESS_KEY}" >> .env && \
    echo "AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}" >> .env && \
    echo "AWS_REGION=${AWS_REGION}" >> .env && \
    echo "AWS_S3_BUCKET=${AWS_S3_BUCKET}" >> .env && \
    echo "WEB_URL=${WEB_URL}" >> .env

# Copy root folders files
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
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
 
EXPOSE 3001
 
CMD [ "pnpm", "run", "start" ]