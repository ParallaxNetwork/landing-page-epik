import { GlobalConfig } from 'payload'

export const Recognition: GlobalConfig = {
  slug: 'recognition',

  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },

  fields: [
    {
      name: 'serialWinner',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Serial Winner',
        },
        {
          name: 'descriptions',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'text',
              type: 'textarea',
              required: true,
            },
          ],
          defaultValue: [
            { text: 'A testament to creative persistence.' },
            {
              text: "EPIK's experiments in the global hackathon circuit became proofs of concept for what's possible when imagination meets protocol.",
            },
            {
              text: "Recognized as a Top 8 Finalist at ETH Global and 1st Place Winner in the Lit Protocol category, EPIK's work embodies the spirit of exploration that defines the decentralized era.",
            },
            {
              text: 'Further wins at the Orbis Social Hackathon reaffirmed its belief: innovation is not a destination, but a continuous act of creation within the chaos of Web3.',
            },
          ],
        },
      ],
    },

    {
      name: 'localChapter',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Local Chapter',
        },
        {
          name: 'descriptions',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'text',
              type: 'textarea',
              required: true,
            },
          ],
          defaultValue: [
            { text: 'A bridge between the global and the grounded.' },
            {
              text: 'EPIK serves as the Indonesia Local Chapter for GreenPill, a regenerative crypto movement reimagining the intersection of value, community, and impact.',
            },
            {
              text: 'In close collaboration with the Ethereum Foundation, EPIK cultivates a space where builders grow, ideas converge, and ecosystems regenerate.',
            },
            {
              text: 'Rooted in Indonesia, connected to the world — EPIK continues to expand the frontier of the open internet, one collective act at a time.',
            },
          ],
        },
      ],
    },

    {
      name: 'centerText',
      type: 'text',
      required: true,
      defaultValue: 'Roots & Recognition',
      admin: {
        description: 'Vertical text displayed in the center',
      },
    },
  ],

  admin: {
    description: 'Manage Recognition section content',
  },
}
