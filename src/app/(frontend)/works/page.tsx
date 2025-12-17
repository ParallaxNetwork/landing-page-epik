// src/app/(frontend)/works/page.tsx
import AllWorksGrid from '@/components/AllWorks'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function AllWorksPage() {
  const payload = await getPayload({ config })

  const worksData = await payload.find({
    collection: 'works',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit: 100,
    sort: '-createdAt',
    depth: 2,
  })

  return (
    <main className="min-h-screen bg-black">
      <AllWorksGrid works={worksData.docs as any} />
    </main>
  )
}

export const dynamic = 'force-dynamic'
