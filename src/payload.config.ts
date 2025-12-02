import { buildConfig } from 'payload'
import path from 'path'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

// Collections
import { Users } from './collections/Users'
import { Works } from './collections/Works'
import { Media } from './collections/Media'
import { SocialLinks } from './collections/SocialLinks'
import { Tags } from './collections/Tags'

// Globals
import { Recognition } from './globals/Recognition'

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET!,

  collections: [Users, Works, Media, SocialLinks, Tags],

  // ✅ Tambahkan globals di sini
  globals: [Recognition],

  cors: ['http://localhost:3000'],
  csrf: ['http://localhost:3000'],

  db: mongooseAdapter({
    url: process.env.DATABASE_URI!,
  }),

  editor: lexicalEditor({}),

  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },

  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
})
