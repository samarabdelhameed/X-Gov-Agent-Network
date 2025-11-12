'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import TaskInput from '@/components/TaskInput'
import OrchestrationTimeline from '@/components/OrchestrationTimeline'
import NetworkInsights from '@/components/NetworkInsights'
import TaskOutput from '@/components/TaskOutput'

export type OrchestrationStep = {
  id: number
  title: string
  status: 'pending' | 'active' | 'completed' | 'error'
  details?: string
  txSignature?: string
  timestamp?: number
}

export type TaskResult = {
  success: boolean
  data?: any
  error?: string
  agent?: string
  paymentTx?: string
  validationTx?: string
}

export default function OrchestratePagePage() {
  const [isOrchestrating, setIsOrchestrating] = useState(false)
  const [steps, setSteps] = useState<OrchestrationStep[]>([])
  const [taskResult, setTaskResult] = useState<TaskResult | null>(null)

  const handleStartOrchestration = async (taskDescription: string) => {
    setIsOrchestrating(true)
    setTaskResult(null)
    
    // Initialize steps
    const initialSteps: OrchestrationStep[] = [
      { id: 1, title: 'Task Decomposition (via GPT-4o-mini)', status: 'pending' },
      { id: 2, title: 'Querying Solana for Agent Reputation', status: 'pending' },
      { id: 3, title: 'Selecting Best Service Agent', status: 'pending' },
      { id: 4, title: 'Initiating x402 Payment', status: 'pending' },
      { id: 5, title: 'Awaiting Payment Verification', status: 'pending' },
      { id: 6, title: 'Payment Verified! Service Data Received', status: 'pending' },
      { id: 7, title: 'Recording Validation On-Chain', status: 'pending' },
      { id: 8, title: 'Task Completed!', status: 'pending' },
    ]
    setSteps(initialSteps)

    try {
      // Call orchestrator API (assumes orchestrator is running)
      const response = await fetch('http://localhost:5001/api/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: taskDescription }),
      })

      if (!response.ok) {
        throw new Error('Orchestration failed')
      }

      const result = await response.json()
      
      // NO SIMULATION - Just mark all steps as completed instantly with real result
      const completedSteps = initialSteps.map((step, index) => ({
        ...step,
        status: 'completed' as const,
        timestamp: Date.now() + (index * 100), // Stagger timestamps slightly
      }))
      setSteps(completedSteps)
      
      setTaskResult({
        success: true,
        data: result.data,
        agent: result.agent,
        paymentTx: result.paymentTx,
        validationTx: result.validationTx,
      })
    } catch (error) {
      console.error('Orchestration error:', error)
      
      // NO MOCK DATA! Show real error
      setSteps(prev => {
        const errorSteps = [...prev]
        const firstPending = errorSteps.findIndex(s => s.status === 'pending' || s.status === 'active')
        if (firstPending !== -1) {
          errorSteps[firstPending] = {
            ...errorSteps[firstPending],
            status: 'error',
            details: `Orchestration failed: ${error instanceof Error ? error.message : 'Unknown error'}. Please ensure Orchestrator API is running on port 5001.`
          }
        }
        return errorSteps
      })
      
      setTaskResult({
        success: false,
        error: `Failed to connect to Orchestrator API. Please ensure it's running on http://localhost:5001. Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      })
    }

    setIsOrchestrating(false)
  }

  // NO SIMULATION FUNCTIONS - removed all mock/fake progression

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-bg to-dark-card">
      {/* Header */}
      <div className="border-b border-neon-green/20 bg-dark-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <motion.button
                  className="text-neon-green hover:text-neon-green/80 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowLeft className="w-6 h-6" />
                </motion.button>
              </Link>
              <h1 className="text-2xl font-bold text-neon-green text-glow">
                Agent Orchestration Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
              <span className="text-sm text-gray-400">Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Task Input + Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Input */}
            <TaskInput
              onSubmit={handleStartOrchestration}
              isOrchestrating={isOrchestrating}
            />

            {/* Orchestration Timeline */}
            <AnimatePresence>
              {steps.length > 0 && (
                <OrchestrationTimeline
                  steps={steps}
                  isOrchestrating={isOrchestrating}
                />
              )}
            </AnimatePresence>

            {/* Task Output */}
            <AnimatePresence>
              {taskResult && (
                <TaskOutput result={taskResult} />
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Network Insights */}
          <div className="lg:col-span-1">
            <NetworkInsights />
          </div>
        </div>
      </div>
    </div>
  )
}

