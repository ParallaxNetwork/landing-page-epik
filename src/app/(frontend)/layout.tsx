import React from 'react'
import { Solway } from 'next/font/google'
import Navbar from '@/components/Header'
import './globals.css' // Import dari folder yang sama dengan layout ini

const solway = Solway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})

export const metadata = {
  title: 'Epik',
  description: 'Creative branding agency portfolio website',
}

export default async function FrontendLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={`${solway.className} bg-black text-white`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
