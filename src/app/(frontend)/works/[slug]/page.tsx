// src/app/(frontend)/works/[slug]/page.tsx
import WorkDetail from '@/components/WorksDetail'
import { getPayload } from 'payload'
import config from '@payload-config'

async function getWork(slug: string) {
  const payload = await getPayload({ config })

  const work = await payload.findByID({
    collection: 'works',
    id: slug,
    depth: 2,
  })

  return work
}

export default async function WorkDetailPage({ params }: { params: { slug: string } }) {
  const work = await getWork(params.slug)

  return <WorkDetail work={work} />
}

export const dynamic = 'force-dynamic'
