// collections/SocialLinks.ts
import type { CollectionConfig } from 'payload'

export const SocialLinks: CollectionConfig = {
  slug: 'social_links',
  admin: {
    useAsTitle: 'type',
    defaultColumns: ['type', 'url'],
  },
  access: {
    read: () => true,
  },
  fields: [
    // ❌ HAPUS field work
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Website', value: 'website' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'TikTok', value: 'tiktok' },
        { label: 'GitHub', value: 'github' },
        { label: 'LinkedIn', value: 'linkedin' },
        { label: 'Twitter', value: 'twitter' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Icon name or URL',
      },
    },
  ],
}
