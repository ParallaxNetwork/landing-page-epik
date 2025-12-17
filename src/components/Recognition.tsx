"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Solway, Courier_Prime } from "next/font/google";

const solway = Solway({ subsets: ["latin"], weight: ["700"] });
const courier = Courier_Prime({ subsets: ["latin"], weight: ["400"] });

const CORNERS = ["top-left", "top-right", "bottom-left", "bottom-right"];

const DEFAULT_DATA = {
  serialWinner: {
    title: "Serial Winner",
    descriptions: [
      { text: "A testament to creative persistence.", id: "1" },
      {
        text: "EPIK's experiments in the global hackathon circuit became proofs of concept for what's possible when imagination meets protocol.",
        id: "2",
      },
      {
        text: "Recognized as a Top 8 Finalist at ETH Global and 1st Place Winner in the Lit Protocol category, EPIK's work embodies the spirit of exploration that defines the decentralized era.",
        id: "3",
      },
      {
        text: "Further wins at the Orbis Social Hackathon reaffirmed its belief: innovation is not a destination, but a continuous act of creation within the chaos of Web3.",
        id: "4",
      },
    ],
  },
  localChapter: {
    title: "Local Chapter",
    descriptions: [
      { text: "A bridge between the global and the grounded.", id: "1" },
      {
        text: "EPIK serves as the Indonesia Local Chapter for GreenPill, a regenerative crypto movement reimagining the intersection of value, community, and impact.",
        id: "2",
      },
      {
        text: "In close collaboration with the Ethereum Foundation, EPIK cultivates a space where builders grow, ideas converge, and ecosystems regenerate.",
        id: "3",
      },
      {
        text: "Rooted in Indonesia, connected to the world — EPIK continues to expand the frontier of the open internet, one collective act at a time.",
        id: "4",
      },
    ],
  },
  centerText: "Roots & Recognition",
};

interface RecognitionProps {
  data?: {
    serialWinner?: {
      title?: string;
      descriptions?: Array<{ text: string; id?: string }>;
    };
    localChapter?: {
      title?: string;
      descriptions?: Array<{ text: string; id?: string }>;
    };
    centerText?: string;
  } | null;
}

const boxVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function RecognitionSection({ data }: RecognitionProps) {
  const serialWinner = data?.serialWinner || DEFAULT_DATA.serialWinner;
  const localChapter = data?.localChapter || DEFAULT_DATA.localChapter;
  const centerText = data?.centerText || DEFAULT_DATA.centerText;

  return (
    <section id="recognition" className="recognition-section">
      <div className="recognition-wrapper">
        <div className="recognition-divider">
          <span className={`${solway.className} divider-img`}>
            {centerText}
          </span>
        </div>

        <motion.div
          className="recognition-box"
          initial="hidden"
          whileInView="visible"
          variants={boxVariants}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          {CORNERS.map((corner, i) => (
            <motion.div
              key={corner}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Image
                src="/img/Subtract (1).png"
                alt="corner"
                width={32}
                height={32}
                className={`corner ${corner}`}
              />
            </motion.div>
          ))}

          <motion.h3
            className={`${solway.className} title`}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {serialWinner.title}
          </motion.h3>

          {serialWinner.descriptions?.map((desc, i) => (
            <motion.p
              key={desc.id || i}
              className={`${courier.className} description`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              style={i === 0 ? { color: "#FF00C3" } : {}}
            >
              {desc.text}
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          className="recognition-box"
          initial="hidden"
          whileInView="visible"
          variants={boxVariants}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          {CORNERS.map((corner, i) => (
            <motion.div
              key={corner}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Image
                src="/img/Subtract (1).png"
                alt="corner"
                width={32}
                height={32}
                className={`corner ${corner}`}
              />
            </motion.div>
          ))}

          <motion.h3
            className={`${solway.className} title`}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {localChapter.title}
          </motion.h3>

          {localChapter.descriptions?.map((desc, i) => (
            <motion.p
              key={desc.id || i}
              className={`${courier.className} description`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              style={i === 0 ? { color: "#FF00C3" } : {}}
            >
              {desc.text}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
