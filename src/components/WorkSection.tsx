"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Globe,
  Instagram,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
} from "lucide-react";
import { Solway, Courier_Prime } from "next/font/google";

const solway = Solway({ subsets: ["latin"], weight: ["400", "700"] });
const courier = Courier_Prime({ subsets: ["latin"], weight: ["400"] });

const lexicalToText = (content: any): string => {
  if (!content) return "";
  if (typeof content === "string") return content;

  try {
    const parsed = typeof content === "string" ? JSON.parse(content) : content;
    if (parsed.root?.children) {
      return parsed.root.children
        .map((node: any) => {
          if (node.children) {
            return node.children.map((child: any) => child.text || "").join("");
          }
          return node.text || "";
        })
        .join("\n");
    }
  } catch (e) {
    console.error("Error parsing content:", e);
  }
  return "";
};

interface SocialLink {
  id: string;
  type: string;
  icon?: string | null;
  url: string;
}

interface Work {
  id: string;
  title: string;
  subtitle?: string;
  short_desc?: string;
  long_desc?: any;
  slug?: string;
  status: string;
  media?: {
    id: string;
    url: string;
    alt: string;
  } | null;
  social_links?: Array<SocialLink | string>; // Bisa berupa object atau ID string
  tags?: Array<{
    id: string;
    name: string;
  }>;
}

interface WorksSectionProps {
  works: Work[];
}

function WorkItemImage({ work }: { work: Work }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isVideo = (url: string) => url?.match(/\.(mp4|webm|ogg)$/i);

  return (
    <motion.div
      ref={containerRef}
      className="w-full"
      initial={{ opacity: 0.6, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-gray-800 overflow-hidden w-full max-w-[672px] h-auto aspect-video flex items-center justify-center relative mx-auto">
        {work.media?.url ? (
          <div className="w-full h-full relative">
            {isVideo(work.media.url) ? (
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                preload="metadata"
                autoPlay
              >
                <source src={work.media.url} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={work.media.url}
                alt={work.media.alt || work.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>
        ) : (
          <div className={`${courier.className} text-gray-500 text-center p-4`}>
            <p className="text-sm md:text-base lg:text-lg mb-2">
              ⚠️ No media available
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function WorksSection({ works }: WorksSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeWorkIndex, setActiveWorkIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // Calculate scroll progress within section
      const scrollTop = -rect.top;
      const scrollProgress = Math.max(
        0,
        Math.min(1, scrollTop / (sectionHeight - windowHeight))
      );

      const featuredCount = Math.min(works.length, 3);
      const index = Math.floor(scrollProgress * (featuredCount + 0.5));
      const clampedIndex = Math.max(0, Math.min(index, featuredCount - 1));

      setActiveWorkIndex(clampedIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [works.length]);

  // Helper function to get social links (handle both populated and unpopulated)
  // LIMIT: Maksimal 3 social links yang ditampilkan
  const getSocialLinks = (work: Work): SocialLink[] => {
    if (!work.social_links || work.social_links.length === 0) return [];

    // Filter out any string IDs and only keep populated objects
    const populatedLinks = work.social_links.filter(
      (link): link is SocialLink => typeof link === "object" && link !== null
    );

    // Return maksimal 3 social links
    return populatedLinks.slice(0, 3);
  };

  const getSocialIcon = (type: string) => {
    const icons = {
      website: <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />,
      instagram: (
        <Instagram className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
      ),
      github: <Github className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />,
      linkedin: (
        <Linkedin className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
      ),
      twitter: <Twitter className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />,
      tiktok: (
        <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
      ),
      other: (
        <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
      ),
    };
    return (
      icons[type as keyof typeof icons] || (
        <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
      )
    );
  };

  if (!works || works.length === 0) {
    return (
      <section
        id="works"
        className="w-full min-h-screen bg-black text-white flex items-center justify-center"
      >
        <div
          className={`${courier.className} text-gray-400 text-sm md:text-base lg:text-lg`}
        >
          No works available yet.
        </div>
      </section>
    );
  }

  const featuredWorks = works.slice(0, 3);
  const activeWork = featuredWorks[activeWorkIndex];
  const activeSocialLinks = getSocialLinks(activeWork);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="w-full min-h-[200vh] sm:min-h-[250vh] md:min-h-[300vh] bg-black text-white relative"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="pt-10 sm:pt-12 md:pt-16 pb-5 sm:pb-6 md:pb-8 text-center px-4"
      >
        <h1
          className={`${solway.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold`}
        >
          Our Works
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-8 px-3 sm:px-4 md:px-8 relative">
        {/* Left Sidebar - Hidden on mobile */}
        <div className="hidden md:block md:col-span-3">
          <div className="sticky top-1/2 -translate-y-1/2 pr-2 lg:pr-4 pl-6 lg:pl-16">
            <motion.div
              key={`left-${activeWorkIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-1 lg:gap-2"
            >
              <h2
                className={`${solway.className} text-lg lg:text-xl xl:text-2xl font-bold text-white`}
              >
                {activeWork.title}
              </h2>

              {activeSocialLinks.length > 0 && (
                <div className="mt-1 lg:mt-2 flex flex-col gap-0.5 lg:gap-1">
                  {activeSocialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${courier.className} flex items-center gap-1.5 lg:gap-2 text-[9px] lg:text-[10px] xl:text-xs text-white hover:text-pink-400 transition-colors`}
                    >
                      {getSocialIcon(link.type)}
                      <span className="text-[9px] lg:text-[10px] xl:text-xs truncate max-w-[120px] lg:max-w-[150px]">
                        {link.url.replace(/^https?:\/\//, "")}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Center - Main Content */}
        <div className="col-span-12 md:col-span-6 flex flex-col gap-1 md:gap-2 py-5 sm:py-6 md:py-8 md:-ml-16">
          {/* Mobile: Show ALL works info */}
          <div className="md:hidden space-y-8 mb-6 px-4">
            {featuredWorks.map((work, index) => {
              const workSocialLinks = getSocialLinks(work);

              return (
                <motion.div
                  key={`mobile-${work.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <h2
                    className={`${solway.className} text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3`}
                  >
                    {work.title}
                  </h2>

                  {work.short_desc && (
                    <p
                      className={`${courier.className} text-[11px] sm:text-xs leading-relaxed mb-2 sm:mb-3`}
                      style={{ color: "#FF00C3" }}
                    >
                      {work.short_desc}
                    </p>
                  )}

                  {workSocialLinks.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                      {workSocialLinks.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${courier.className} flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs text-white hover:text-pink-400 transition-colors`}
                        >
                          {getSocialIcon(link.type)}
                          <span className="text-[11px] sm:text-xs">
                            {link.type}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Work Images */}
          {featuredWorks.map((work) => (
            <WorkItemImage key={work.id} work={work} />
          ))}

          {/* All Works Button */}
          <div className="mt-10 sm:mt-12 md:mt-16 flex justify-center">
            <Link
              href="/works"
              className={`${courier.className} px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 border-2 border-white text-white text-[11px] sm:text-xs md:text-sm font-bold tracking-wider hover:bg-white hover:text-black transition-colors duration-300 rounded-md inline-block`}
            >
              ALL WORKS
            </Link>
          </div>
        </div>

        {/* Right Sidebar - Hidden on mobile */}
        <div className="hidden md:block md:col-span-3">
          <div className="sticky top-1/2 -translate-y-1/2 pl-2 lg:pl-4">
            <motion.div
              key={`right-${activeWorkIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-1 lg:gap-2 max-w-[130px] lg:max-w-[150px] xl:max-w-[200px] ml-2 lg:ml-3 xl:ml-6"
            >
              {activeWork.short_desc && (
                <p
                  className={`${courier.className} text-[11px] lg:text-xs xl:text-sm leading-relaxed line-clamp-6`}
                  style={{ color: "#FF00C3" }}
                >
                  {activeWork.short_desc}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
