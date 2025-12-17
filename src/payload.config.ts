import { buildConfig } from "payload";
import path from "path";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

// Collections
import { Users } from "./collections/Users";
import { Media } from "./collections/Media"; // ← Media harus SEBELUM Works
import { Works } from "./collections/Works";
import { SocialLinks } from "./collections/SocialLinks";

// Globals
import { Recognition } from "./globals/Recognition";

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET!,

  // ✅ URUTAN PENTING: Media harus sebelum Works
  collections: [
    Users,
    Media, // ← Harus pertama sebelum Works
    Works, // ← Baru Works (karena pakai relationship ke Media)
    SocialLinks, // ← Terakhir
  ],

  globals: [Recognition],

  // ✅ CORS & CSRF harus sama
  cors: [
    "http://localhost:3000",
    process.env.NEXT_PUBLIC_SERVER_URL || "",
  ].filter(Boolean),

  csrf: [
    "http://localhost:3000",
    process.env.NEXT_PUBLIC_SERVER_URL || "",
  ].filter(Boolean),

  db: mongooseAdapter({
    url: process.env.DATABASE_URI!,
  }),

  editor: lexicalEditor({}),

  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },

  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
});
