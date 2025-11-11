'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Sparkles } from 'lucide-react'

type TaskInputProps = {
  onSubmit: (task: string) => void
  isOrchestrating: boolean
}

const exampleTasks = [
  "Analyze SOL price trends and sentiment from recent news",
  "Scrape trading data for the last 48 hours and provide insights",
  "Monitor Solana network upgrades and assess community reaction",
]

export default function TaskInput({ onSubmit, isOrchestrating }: TaskInputProps) {
  const [task, setTask] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (task.trim() && !isOrchestrating) {
      onSubmit(task.trim())
    }
  }

  const useExample = (example: string) => {
    setTask(example)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-glow"
    >
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="w-6 h-6 text-neon-green" />
        <h2 className="text-2xl font-bold text-neon-green">Define Your Mission</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter your complex AI task here..."
            className="w-full h-32 bg-dark-bg border border-neon-green/30 rounded-lg p-4 text-gray-100 placeholder-gray-500 focus:border-neon-green/60 focus:outline-none focus:ring-2 focus:ring-neon-green/20 transition-all resize-none"
            disabled={isOrchestrating}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-400">Quick examples:</span>
          {exampleTasks.map((example, index) => (
            <button
              key={index}
              type="button"
              onClick={() => useExample(example)}
              disabled={isOrchestrating}
              className="text-xs px-3 py-1 rounded-full bg-neon-green/10 text-neon-green hover:bg-neon-green/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {example.slice(0, 30)}...
            </button>
          ))}
        </div>

        <motion.button
          type="submit"
          disabled={!task.trim() || isOrchestrating}
          className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={!isOrchestrating ? { scale: 1.02 } : {}}
          whileTap={!isOrchestrating ? { scale: 0.98 } : {}}
        >
          {isOrchestrating ? (
            <>
              <div className="spinner w-5 h-5" />
              Orchestrating...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Orchestrate Task
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}

