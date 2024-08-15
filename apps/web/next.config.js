/** @type {import("next").NextConfig} */
require("dotenv").config({
  path: "../../.env",
})

module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/assets/:path*",
        destination: `${process.env.API_URL}/assets/:path*`,
      },
      {
        source: "/api/v1/:path*",
        destination: `${process.env.API_URL}/api/v1/:path*`,
      },
      {
        source: "/api/v2/:path*",
        destination: `${process.env.API_URL}/api/v2/:path*`,
      },
      {
        source: "/api/:category(posts|restaurants|locations)/:path*",
        destination: `${process.env.PAYLOAD_URL}/api/:category/:path*`,
      },
      {
        source: "/mock/v1/:path*",
        destination: `${process.env.API_URL}/mock/v1/:path*`,
      },
    ]
  },
  env: {
    API_URL: process.env.API_URL,
    API_AUTH_URL: process.env.API_AUTH_URL,
    API_MOCK_URL: process.env.API_MOCK_URL,
    WEB_URL: process.env.WEB_URL,
    RECAPTCHA_KEY: process.env.RECAPTCHA_KEY,
    RECAPTCHA_KEY_SECRET: process.env.RECAPTCHA_KEY_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_SECRET_ID: process.env.GOOGLE_SECRET_ID,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_SECRET_ID: process.env.FACEBOOK_SECRET_ID,
    CARD_ENCRYPT_KEY: process.env.CARD_ENCRYPT_KEY,
    PASSWORD_ENCRYPT_KEY: process.env.PASSWORD_ENCRYPT_KEY,
    WINDY_KEY: process.env.WINDY_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
}
