'use client'

import { motion } from 'framer-motion'
import { Check, Loader2, AlertCircle, ExternalLink } from 'lucide-react'
import type { OrchestrationStep } from '@/app/orchestrate/page'

type OrchestrationTimelineProps = {
  steps: OrchestrationStep[]
  isOrchestrating: boolean
}

export default function OrchestrationTimeline({ steps, isOrchestrating }: OrchestrationTimelineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="card-glow"
    >
      <h2 className="text-2xl font-bold text-neon-green mb-6">Orchestration Timeline</h2>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative pl-8 pb-6 ${
              index !== steps.length - 1 ? 'border-l-2' : ''
            } ${
              step.status === 'completed'
                ? 'border-neon-green/50'
                : step.status === 'active'
                ? 'border-neon-green animate-pulse'
                : 'border-gray-700'
            }`}
          >
            {/* Step Icon */}
            <div
              className={`absolute -left-3 top-0 w-6 h-6 rounded-full flex items-center justify-center ${
                step.status === 'completed'
                  ? 'bg-neon-green shadow-neon'
                  : step.status === 'active'
                  ? 'bg-neon-green/50 animate-pulse'
                  : step.status === 'error'
                  ? 'bg-red-500'
                  : 'bg-gray-700'
              }`}
            >
              {step.status === 'completed' && <Check className="w-4 h-4 text-black" />}
              {step.status === 'active' && <Loader2 className="w-4 h-4 text-black animate-spin" />}
              {step.status === 'error' && <AlertCircle className="w-4 h-4 text-white" />}
            </div>

            {/* Step Content */}
            <div>
              <h3
                className={`font-semibold mb-1 ${
                  step.status === 'completed'
                    ? 'text-neon-green'
                    : step.status === 'active'
                    ? 'text-neon-green'
                    : step.status === 'error'
                    ? 'text-red-400'
                    : 'text-gray-500'
                }`}
              >
                {step.id}. {step.title}
              </h3>

              {step.details && (
                <p className="text-sm text-gray-400 mb-2">{step.details}</p>
              )}

              {step.txSignature && (
                <a
                  href={`https://explorer.solana.com/tx/${step.txSignature}?cluster=devnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-neon-green hover:text-neon-green/80 transition-colors"
                >
                  View on Solana Explorer
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}

              {step.timestamp && (
                <p className="text-xs text-gray-600 mt-1">
                  {new Date(step.timestamp).toLocaleTimeString()}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {isOrchestrating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-4 bg-neon-green/5 border border-neon-green/20 rounded-lg"
        >
          <p className="text-sm text-gray-400 flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-neon-green" />
            Orchestration in progress...
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

