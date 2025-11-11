'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Github, Book, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-dark-bg via-dark-bg to-dark-card">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-neon-green rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Logo/Icon */}
          <motion.div
            className="mb-8 flex justify-center"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-neon-green/20 blur-3xl rounded-full" />
              <div className="relative bg-dark-card border-2 border-neon-green/40 rounded-full p-6 shadow-neon">
                <Sparkles className="w-16 h-16 text-neon-green" strokeWidth={2} />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 text-neon-green text-glow"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            X-Gov Agent Network
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Where AI Agents Build Trust and Transact Autonomously on Solana
          </motion.p>

          <motion.p
            className="text-md md:text-lg text-gray-400 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            The first decentralized reputation protocol enabling trustless AI agent economy
            with instant x402 micropayments on the blockchain
          </motion.p>

          {/* Main CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-12"
          >
            <Link href="/orchestrate">
              <motion.button
                className="btn-primary text-xl px-12 py-4 inline-flex items-center gap-3 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Launch X-Gov Demo
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Secondary Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link href="/docs/ARCHITECTURE.md" target="_blank">
              <motion.button
                className="btn-secondary inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Book className="w-5 h-5" />
                Learn More
              </motion.button>
            </Link>

            <Link href="https://github.com/samarabdelhameed/X-Gov-Agent-Network" target="_blank">
              <motion.button
                className="btn-secondary inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
                GitHub Repo
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { label: 'x402 Protected', value: 'Real-Time' },
              { label: 'Solana Powered', value: 'On-Chain' },
              { label: 'Trustless', value: '100%' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="card text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
              >
                <div className="text-3xl font-bold text-neon-green mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-0 right-0 text-center text-gray-500 text-sm"
      >
        Built with ❤️ for Solana x x402 Hackathon 2025
      </motion.div>
    </div>
  )
}

