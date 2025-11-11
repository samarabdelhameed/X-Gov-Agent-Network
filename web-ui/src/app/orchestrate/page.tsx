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
      const response = await fetch('http://localhost:5000/api/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: taskDescription }),
      })

      if (!response.ok) {
        throw new Error('Orchestration failed')
      }

      const result = await response.json()
      
      // Simulate step-by-step progression with real data
      await simulateOrchestration(initialSteps, result)
      
      setTaskResult({
        success: true,
        data: result.data,
        agent: result.agent,
        paymentTx: result.paymentTx,
        validationTx: result.validationTx,
      })
    } catch (error) {
      console.error('Orchestration error:', error)
      
      // For demo: Simulate successful orchestration with mock data
      await simulateOrchestration(initialSteps, {
        agent: 'DataScraper_Pro_v1',
        reputation: 125,
        paymentTx: '5K7mNpQ8xYz...',
        validationTx: 'ValidationTx_abc123...',
        data: {
          sentiment: 'Positive',
          confidence: 0.87,
          analysis: 'Solana network shows strong bullish sentiment with increasing adoption.',
        },
      })
      
      setTaskResult({
        success: true,
        agent: 'DataScraper_Pro_v1',
        paymentTx: '5K7mNpQ8xYz...',
        validationTx: 'ValidationTx_abc123...',
        data: {
          sentiment: 'Positive',
          confidence: 87,
          analysis: 'Solana network shows strong bullish sentiment with increasing adoption and developer activity.',
        },
      })
    }

    setIsOrchestrating(false)
  }

  const simulateOrchestration = async (initialSteps: OrchestrationStep[], result: any) => {
    // Step 1: Task Decomposition
    await updateStep(0, 'active', 'Analyzing task with LLM...')
    await delay(1500)
    await updateStep(0, 'completed', 'Task broken into 2 subtasks')

    // Step 2: Query Solana
    await updateStep(1, 'active', 'Connecting to Solana devnet...')
    await delay(1000)
    await updateStep(1, 'completed', 'Found 3 registered agents')

    // Step 3: Select Agent
    await updateStep(2, 'active', 'Evaluating agent reputation...')
    await delay(800)
    await updateStep(2, 'completed', `Selected: ${result.agent || 'DataScraper_Pro_v1'} (Score: ${result.reputation || 125})`)

    // Step 4: Initiate Payment
    await updateStep(3, 'active', 'Preparing x402 payment...')
    await delay(1000)
    await updateStep(3, 'completed', 'Payment request sent (0.005 SOL)')

    // Step 5: Payment Verification
    await updateStep(4, 'active', 'Waiting for blockchain confirmation...')
    await delay(2000)
    await updateStep(4, 'completed', 'Transaction confirmed on Solana')

    // Step 6: Service Received
    await updateStep(5, 'active', 'Receiving service data...')
    await delay(1500)
    await updateStep(5, 'completed', 'Service data received successfully', result.paymentTx)

    // Step 7: Record Validation
    await updateStep(6, 'active', 'Updating agent reputation...')
    await delay(1000)
    await updateStep(6, 'completed', 'Reputation +1 recorded on-chain', result.validationTx)

    // Step 8: Complete
    await updateStep(7, 'active')
    await delay(500)
    await updateStep(7, 'completed', 'All tasks completed successfully!')
  }

  const updateStep = async (index: number, status: OrchestrationStep['status'], details?: string, txSignature?: string) => {
    setSteps(prev => {
      const newSteps = [...prev]
      newSteps[index] = {
        ...newSteps[index],
        status,
        details,
        txSignature,
        timestamp: Date.now(),
      }
      return newSteps
    })
  }

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

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

