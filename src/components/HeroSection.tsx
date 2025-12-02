'use client'

import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Solway, Courier_Prime } from 'next/font/google'

const solway = Solway({ subsets: ['latin'], weight: ['400', '700'] })
const courier = Courier_Prime({ subsets: ['latin'], weight: ['400'] })

interface IconType {
  id: number
  src: string
  activeSrc: string
}

const ICONS: IconType[] = [
  {
    id: 1,
    src: '/img/epik-icon/Component1.svg',
    activeSrc: '/img/epik-icon/Property1=Success.svg',
  },
  {
    id: 2,
    src: '/img/epik-icon/Component2.svg',
    activeSrc: '/img/epik-icon/Property1=Success.svg',
  },
  { id: 3, src: '/img/epik-icon/Component3.svg', activeSrc: '/img/epik-icon/Property1=Zonk.svg' },
  {
    id: 4,
    src: '/img/epik-icon/Component4.svg',
    activeSrc: '/img/epik-icon/Property1=Success.svg',
  },
]

const RECTANGLES = [
  { id: 1, className: 'rectangle1', parallaxRange: [0, 100] },
  { id: 2, className: 'rectangle2', parallaxRange: [0, -80] },
  { id: 3, className: 'rectangle3', parallaxRange: [0, 60] },
  { id: 4, className: 'rectangle4', parallaxRange: [0, -50] },
]

export default function HeroSection() {
  const [activeIcons, setActiveIcons] = useState<number[]>([])
  const { scrollY } = useScroll()

  // Parallax transforms for each rectangle
  const rect1Y = useTransform(scrollY, [0, 500], [0, 100])
  const rect2Y = useTransform(scrollY, [0, 500], [0, -80])
  const rect3Y = useTransform(scrollY, [0, 500], [0, 60])
  const rect4Y = useTransform(scrollY, [0, 500], [0, -50])

  const parallaxTransforms = [rect1Y, rect2Y, rect3Y, rect4Y]

  const handleIconClick = (id: number) => {
    setActiveIcons((prev) =>
      prev.includes(id) ? prev.filter((iconId) => iconId !== id) : [...prev, id],
    )
  }

  return (
    <motion.section
      id="HeroSection"
      className="hero-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >

      {/* Parallax Rectangles */}
      {RECTANGLES.map((rect, i) => (
        <motion.div
          key={rect.id}
          style={{ y: parallaxTransforms[i] }}
          className={`rect ${rect.className}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
        >
          <motion.img
            src={`/Hero/Rectangle${rect.id}.svg`}
            alt={`rectangle-${rect.id}`}
            className="rect-image"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </motion.div>
      ))}

      {/* Hero Content */}
      <div className="hero-content">
        <motion.h1
          className={`${solway.className} hero-title`}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Enter the Enigma
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Embrace the Paradox
          </motion.span>
        </motion.h1>

        {/* Icons with Stagger Animation */}
        <motion.div
          className="hero-icons flex justify-center gap-6 mt-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.9,
              },
            },
          }}
        >
          {ICONS.map((icon) => {
            const isActive = activeIcons.includes(icon.id)
            return (
              <motion.button
                key={icon.id}
                onClick={() => handleIconClick(icon.id)}
                className="icon-btn relative p-3 rounded-full"
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.5 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.9 }}
                animate={
                  isActive
                    ? {
                        y: [0, -15, 0],
                        transition: {
                          duration: 0.8,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        },
                      }
                    : { y: 0 }
                }
              >
                <motion.img
                  key={isActive ? icon.activeSrc : icon.src}
                  src={isActive ? icon.activeSrc : icon.src}
                  alt={`icon-${icon.id}`}
                  width={40}
                  height={40}
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
            )
          })}
        </motion.div>

        {/* Subtext */}
        <motion.p
          className={`${courier.className} hero-subtext`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          Shaping order from digital chaos // building the foundations of a decentralized future.
        </motion.p>
      </div>
    </motion.section>
  )
}
