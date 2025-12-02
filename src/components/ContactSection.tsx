'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react'

const CONTACT_INFO = {
  address: {
    line1:
      'Jl. RC. Veteran Raya No.68, RT.4/RW.10, Bintaro, Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240',
    maps: 'https://maps.google.com/?q=Jl.+Jurangmangu+Barat+no.8+Pondok+Aren',
  },
  phone: '+62812 3456 7890',
  email: 'hello@parallax.com',
}

const NAV_LINKS = [
  { label: 'About Us', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'What We Do', href: '#services' },
  { label: 'Clients & Partners', href: '#clients' },
  { label: 'Reach Us', href: '#contact' },
]

export default function ContactSection() {
  return (
    <section id="contact" className="relative bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20">
        {/* Main Grid - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          {/* Left Column - Contact Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-8" style={{ fontFamily: 'Solway, serif' }}>
              Contact Us
            </h3>

            {/* Address */}
            <div className="flex gap-4">
              <MapPin className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <div
                style={{ fontFamily: 'Courier Prime, monospace' }}
                className="text-gray-300 text-sm leading-relaxed"
              >
                <p>{CONTACT_INFO.address.line1}</p>

                <a
                  href={CONTACT_INFO.address.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  open in google maps
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <Phone className="w-5 h-5 text-purple-500 flex-shrink-0" />
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="text-gray-300 text-sm hover:text-white transition-colors"
                style={{ fontFamily: 'Courier Prime, monospace' }}
              >
                {CONTACT_INFO.phone}
              </a>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <Mail className="w-5 h-5 text-purple-500 flex-shrink-0" />
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-gray-300 text-sm hover:text-white transition-colors"
                style={{ fontFamily: 'Courier Prime, monospace' }}
              >
                {CONTACT_INFO.email}
              </a>
            </div>
          </motion.div>

          {/* Right Columns - Navigation Links (2 columns side by side) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-32 gap-y-6 lg:pl-12"
          >
            {NAV_LINKS.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.08 }}
                viewport={{ once: true }}
                className="group flex items-center gap-2 text-lg hover:text-gray-300 transition-colors"
                style={{ fontFamily: 'Solway, serif' }}
              >
                {link.label}
                <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Divider Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mt-16 mb-8"
        />

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-gray-600" style={{ fontFamily: 'Courier Prime, monospace' }}>
            Parallax Network © 2025 All Right Reserved. Website by Wizards
          </p>
        </motion.div>
      </div>
    </section>
  )
}
