'use client'

import { motion } from 'framer-motion'
import { CheckCircle, XCircle, ExternalLink } from 'lucide-react'
import type { TaskResult } from '@/app/orchestrate/page'

type TaskOutputProps = {
  result: TaskResult
}

export default function TaskOutput({ result }: TaskOutputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="card-glow relative overflow-hidden"
    >
      {/* Success Animation Overlay */}
      {result.success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, times: [0, 0.5, 1] }}
          className="absolute inset-0 bg-gradient-to-r from-neon-green/20 via-neon-green/40 to-neon-green/20 pointer-events-none"
        />
      )}

      {/* Confetti Effect for Success */}
      {result.success && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 100 + '%',
                y: -20,
                opacity: 1,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{ 
                y: '120%',
                opacity: 0,
                rotate: Math.random() * 360
              }}
              transition={{ 
                duration: Math.random() * 2 + 2,
                delay: Math.random() * 0.5,
                ease: 'easeOut'
              }}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: `hsl(${Math.random() * 60 + 100}, 100%, ${Math.random() * 30 + 50}%)`,
                boxShadow: '0 0 10px rgba(0,255,65,0.5)'
              }}
            />
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        >
          {result.success ? (
            <CheckCircle className="w-8 h-8 text-neon-green drop-shadow-[0_0_10px_rgba(0,255,65,0.8)]" />
          ) : (
            <XCircle className="w-8 h-8 text-red-500" />
          )}
        </motion.div>
        <motion.h2 
          className="text-2xl font-bold text-neon-green text-glow"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {result.success ? '🎉 Task Completed Successfully!' : 'Task Failed'}
        </motion.h2>
      </div>

      {result.success ? (
        <div className="space-y-4">
          {/* Agent Info */}
          {result.agent && (
            <div className="p-4 bg-neon-green/5 border border-neon-green/20 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">Executed by Agent:</p>
              <p className="text-lg font-semibold text-neon-green">{result.agent}</p>
            </div>
          )}

          {/* Result Data */}
          {result.data && (
            <div className="p-4 bg-dark-bg border border-neon-green/20 rounded-lg">
              <h3 className="font-semibold text-neon-green mb-3">Analysis Result:</h3>
              <div className="space-y-2">
                {typeof result.data === 'object' ? (
                  Object.entries(result.data).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-gray-400 capitalize">{key}: </span>
                      <span className="text-gray-200">
                        {typeof value === 'number' ? value.toFixed(2) : String(value)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-200">{String(result.data)}</p>
                )}
              </div>
            </div>
          )}

          {/* Transaction Links */}
          <div className="flex flex-wrap gap-4">
            {result.paymentTx && (
              <a
                href={`https://explorer.solana.com/tx/${result.paymentTx}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/10 border border-neon-green/30 rounded-lg text-neon-green hover:bg-neon-green/20 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Payment Transaction on Solana Explorer
              </a>
            )}

            {/* Validation Transaction hidden - it's a mock/placeholder, not a real blockchain transaction */}
            {/* Real reputation updates would require on-chain program calls */}
          </div>
        </div>
      ) : (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-400">{result.error || 'Task execution failed'}</p>
        </div>
      )}
    </motion.div>
  )
}

