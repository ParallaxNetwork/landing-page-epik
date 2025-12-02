'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const MENU_ITEMS = ['About', 'Recognition', 'Works', 'Partners', 'Articles', 'Contact']

const NAVBAR_STYLES = {
  scrolled: 'bg-black/90 backdrop-blur-xl h-20 shadow-lg',
  default: 'bg-black/90 backdrop-blur-md h-24',
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState('About')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleMenuClick = (item: string) => {
    setActiveItem(item)
    const sectionId = item === 'About' ? 'about' : item.toLowerCase()
    scrollToSection(sectionId)
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 flex items-center justify-center ${
        scrolled ? NAVBAR_STYLES.scrolled : NAVBAR_STYLES.default
      }`}
    >
      <div className="w-full max-w-[1400px] h-[60px] px-10 flex justify-between items-center">
        <motion.button
          onClick={() => scrollToSection('HeroSection')}
          className="cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Image
            src="/Logo.svg"
            alt="EPIK Logo"
            width={50}
            height={50}
            className="object-contain"
          />
        </motion.button>

        <motion.ul
          className="flex gap-8 text-xs tracking-widest uppercase text-white"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.06,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {MENU_ITEMS.map((item) => {
            const isActive = activeItem === item
            const isHovered = hoveredItem === item

            return (
              <motion.li
                key={item}
                className="relative cursor-pointer"
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0 },
                }}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleMenuClick(item)}
              >
                <motion.a
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => e.preventDefault()}
                  className={`transition-colors duration-200 ${
                    isActive ? 'text-cyan-400' : 'text-white/90'
                  }`}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item}
                </motion.a>

                <AnimatePresence>
                  {(isActive || isHovered) && (
                    <motion.div
                      layoutId={isActive ? 'activeUnderline' : undefined}
                      className={`absolute left-0 -bottom-1 h-[2px] w-full ${
                        isActive ? 'bg-cyan-400' : 'bg-cyan-400/60'
                      }`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </motion.header>
  )
}