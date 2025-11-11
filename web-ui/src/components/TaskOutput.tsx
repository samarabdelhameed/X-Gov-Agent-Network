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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="card-glow"
    >
      <div className="flex items-center gap-3 mb-6">
        {result.success ? (
          <CheckCircle className="w-6 h-6 text-neon-green" />
        ) : (
          <XCircle className="w-6 h-6 text-red-500" />
        )}
        <h2 className="text-2xl font-bold text-neon-green">Final Task Result</h2>
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
                View Payment Transaction
              </a>
            )}

            {result.validationTx && (
              <a
                href={`https://explorer.solana.com/tx/${result.validationTx}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/10 border border-neon-green/30 rounded-lg text-neon-green hover:bg-neon-green/20 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Validation Transaction
              </a>
            )}
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

