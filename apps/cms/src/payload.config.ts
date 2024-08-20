import path from "path"

import { payloadCloud } from "@payloadcms/plugin-cloud"
import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { webpackBundler } from "@payloadcms/bundler-webpack"
import { slateEditor } from "@payloadcms/richtext-slate"
import { buildConfig } from "payload/config"

import Users from "./collections/Users"
import Surfs from "./collections/Surfs"
import Restaurants from "./collections/Restaurants"
import Locations from "./collections/Locations"
import Categories from "./collections/Categories"
import { Media } from "./collections/Media"

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  routes: {
    admin: "/cms/admin",
    api: "/cms/api",
  },
  editor: slateEditor({}),
  collections: [Surfs, Restaurants, Locations, Media, Categories, Users],
  cors: [process.env.PAYLOAD_URL || "", process.env.WEB_URL || ""].filter(
    Boolean
  ),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.PAYLOAD_DATABASE_URI,
  }),
})
