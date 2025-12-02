'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Solway, Courier_Prime } from 'next/font/google'

const solway = Solway({ subsets: ['latin'], weight: ['400', '700'] })
const courier = Courier_Prime({ subsets: ['latin'], weight: ['400'] })

const TEXT_CONTENT = {
  title: 'EPIK',
  subtitle: '/ˈɛpɪk/ — (Noun) — Abbreviation of Enigma Paradox Inovasi Kreatif',
  definitions: [
    '1. A state of creative tension between code and culture;',
    '2. A Web3 Dev Studio born from the paradox of innovation;',
    '3. A collective of builders shaping order from digital chaos.',
  ],
  extended: {
    label: 'Definition (extended):',
    text: 'EPIK builds interoperable products and protocols that empower the Web3 ecosystem. From Indonesia to the world, it explores the new internet through design, strategy, and imagination — where technology becomes expression and creation becomes connection.',
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <video className="about-bg-video" autoPlay loop muted playsInline>
        <source src="/Particles.mp4" type="video/mp4" />
      </video>

      <motion.div
        className="about-text"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        <motion.h1
          className={`${solway.className} about-title`}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          {TEXT_CONTENT.title.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              viewport={{ once: true }}
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className={`${courier.className} about-subtext`}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          {TEXT_CONTENT.subtitle}
        </motion.p>

        <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
          {TEXT_CONTENT.definitions.map((def, i) => (
            <motion.p
              key={i}
              className={`${courier.className} about-subtext`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              style={{ marginBottom: i === TEXT_CONTENT.definitions.length - 1 ? '24px' : '8px' }}
            >
              {def}
            </motion.p>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
          <motion.p
            className={`${courier.className} about-definition`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <strong>{TEXT_CONTENT.extended.label}</strong>
            <br />
            {TEXT_CONTENT.extended.text}
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.div
        className="about-image"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
          whileHover={{ scale: 1.08 }}
        >
          <Image
            src="/Cone_01.svg"
            alt="About EPIK"
            width={489}
            height={489}
            className="about-img"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}