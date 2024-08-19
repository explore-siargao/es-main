export const GRAPHQL_API_URL = process.env.NEXT_BUILD
  ? `http://127.0.0.1:${process.env.PAYLOAD_PORT || 3000}`
  : process.env.PAYLOAD_NEXT_PUBLIC_SERVER_URL
