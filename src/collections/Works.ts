// collections/Works.ts
import { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Works: CollectionConfig = {
  slug: 'works',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'subtitle', 'status', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 32,
    },
    {
      name: 'subtitle',
      type: 'text',
      maxLength: 80,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({}),
    },
    {
      name: 'short_desc',
      type: 'textarea',
      maxLength: 300,
    },
    {
      name: 'long_desc',
      type: 'richText',
      editor: lexicalEditor({}),
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'social_links',
      type: 'relationship',
      relationTo: 'social_links',
      hasMany: true,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
    },
  ],
  timestamps: true,
}