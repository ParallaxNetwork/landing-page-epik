// app/page.tsx
import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'

import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import Recognition from '@/components/Recognition'
import WorksSection from '@/components/WorkSection'
import ContactSection from '@/components/ContactSection'

async function getWorks() {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const result = await payload.find({
      collection: 'works',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-createdAt',
      depth: 3,
      limit: 10,
    })

    const normalizedWorks = result.docs.map((work: any) => ({
      id: work.id,
      title: work.title,
      subtitle: work.subtitle || '',
      short_desc: work.short_desc || '',
      long_desc: work.long_desc || null,
      slug: work.slug || '',
      status: work.status,
      media:
        work.media && typeof work.media === 'object'
          ? {
              id: work.media.id,
              url: work.media.url || '',
              alt: work.media.alt || work.title,
              filename: work.media.filename || '',
            }
          : null,
      social_links: Array.isArray(work.social_links)
        ? work.social_links
            .filter((s: any) => s && typeof s === 'object')
            .map((s: any) => ({
              type: s.type || 'other',
              icon: s.icon || null,
              url: s.url || '#',
            }))
        : [],
      tags: Array.isArray(work.tags)
        ? work.tags
            .filter((tag: any) => tag && typeof tag === 'object')
            .map((tag: any) => ({
              id: tag.id,
              name: tag.name || '',
            }))
        : [],
    }))

    return normalizedWorks
  } catch (error) {
    console.error('❌ Error fetching works:', error)
    return []
  }
}

// ✅ Function untuk fetch Recognition Global
async function getRecognition() {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const recognition = await payload.findGlobal({
      slug: 'recognition',
    })

    return recognition
  } catch (error) {
    console.error('❌ Error fetching recognition:', error)
    return null
  }
}

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { user } = await payload.auth({ headers })

  const works = await getWorks()
  const recognition = await getRecognition() // ✅ Fetch recognition data

  return (
    <>
      <main className="bg-black text-white">
        <HeroSection />
        <AboutSection />

        {/* ✅ Pass recognition data ke component */}
        <Recognition data={recognition} />

        <WorksSection works={works} />

        <ContactSection />
      </main>
    </>
  )
}
