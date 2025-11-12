'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Users, TrendingUp, DollarSign, ExternalLink, Activity } from 'lucide-react'
import Link from 'next/link'
import agentsData from '@/data/agents.json'

type Agent = {
  agent_id: string
  pubkey: string
  reputation_score: number
  total_successful_txs: number
  api_url: string
  service_type: string
  owner: string
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAgents()
  }, [])

  const fetchAgents = async () => {
    try {
      setLoading(true)
      
      // Try to fetch from API first (if orchestrator is running)
      try {
        const apiUrl = process.env.NEXT_PUBLIC_ORCHESTRATOR_URL || 'http://localhost:5001'
        const response = await fetch(`${apiUrl}/api/agents`, {
          signal: AbortSignal.timeout(3000) // 3 second timeout
        })
        
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.agents) {
            setAgents(data.agents)
            setError(null)
            return
          }
        }
      } catch (apiError) {
        console.log('API not available, using static data:', apiError)
      }
      
      // Fallback to static data
      console.log('Loading agents from static data...')
      setAgents(agentsData.agents as Agent[])
      setError(null)
      
    } catch (err) {
      console.error('Error loading agents:', err)
      setError(err instanceof Error ? err.message : 'Failed to load agents')
    } finally {
      setLoading(false)
    }
  }

  const getServiceTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      data_scraper: 'text-neon-green',
      text_analyst: 'text-blue-400',
      image_processor: 'text-purple-400',
      code_executor: 'text-orange-400',
    }
    return colors[type] || 'text-gray-400'
  }

  const getServiceTypeBadge = (type: string) => {
    const badges: Record<string, string> = {
      data_scraper: 'bg-neon-green/10 border-neon-green/30 text-neon-green',
      text_analyst: 'bg-blue-400/10 border-blue-400/30 text-blue-400',
      image_processor: 'bg-purple-400/10 border-purple-400/30 text-purple-400',
      code_executor: 'bg-orange-400/10 border-orange-400/30 text-orange-400',
    }
    return badges[type] || 'bg-gray-400/10 border-gray-400/30 text-gray-400'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-bg to-dark-card">
      {/* Header */}
      <div className="border-b border-neon-green/20 bg-dark-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/orchestrate">
                <motion.button
                  className="text-neon-green hover:text-neon-green/80 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowLeft className="w-6 h-6" />
                </motion.button>
              </Link>
              <h1 className="text-2xl font-bold text-neon-green text-glow">
                Registered Agents Network
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
              <span className="text-sm text-gray-400">Live from Solana</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-glow"
          >
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-neon-green" />
              <span className="text-sm text-gray-400">Total Agents</span>
            </div>
            <div className="text-3xl font-bold text-neon-green">{agents.length}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-glow"
          >
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-neon-green" />
              <span className="text-sm text-gray-400">Highest Rep</span>
            </div>
            <div className="text-3xl font-bold text-neon-green">
              {agents.length > 0 ? Math.max(...agents.map(a => a.reputation_score)) : 0}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-glow"
          >
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-neon-green" />
              <span className="text-sm text-gray-400">Total Txs</span>
            </div>
            <div className="text-3xl font-bold text-neon-green">
              {agents.reduce((sum, a) => sum + a.total_successful_txs, 0)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-glow"
          >
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-5 h-5 text-neon-green" />
              <span className="text-sm text-gray-400">Active Now</span>
            </div>
            <div className="text-3xl font-bold text-neon-green">{agents.length}</div>
          </motion.div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="card-glow flex items-center justify-center h-96">
            <div className="text-center">
              <div className="spinner mx-auto mb-4" />
              <p className="text-gray-400">Loading agents from Solana blockchain...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="card-glow">
            <div className="p-8 text-center">
              <p className="text-red-400 mb-4">⚠️ {error}</p>
              <button
                onClick={fetchAgents}
                className="btn-primary"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* No Agents State */}
        {!loading && !error && agents.length === 0 && (
          <div className="card-glow">
            <div className="p-8 text-center">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-400 mb-2">No Agents Registered Yet</h3>
              <p className="text-gray-500 mb-4">
                No agents have been registered on-chain yet. Deploy the Solana program and register agents to see them here.
              </p>
              <Link href="/orchestrate">
                <button className="btn-secondary">
                  Go to Dashboard
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Agents Grid */}
        {!loading && !error && agents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.pubkey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-glow group hover:border-neon-green/60 transition-all"
              >
                {/* Agent Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-neon-green group-hover:text-glow transition-all">
                      {agent.agent_id}
                    </h3>
                    <span className={`text-xs ${getServiceTypeColor(agent.service_type)}`}>
                      {agent.service_type.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className={`px-3 py-1 border rounded-lg text-xs font-semibold ${getServiceTypeBadge(agent.service_type)}`}>
                    Active
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-dark-bg p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Reputation</div>
                    <div className="text-2xl font-bold text-neon-green">{agent.reputation_score}</div>
                  </div>
                  <div className="bg-dark-bg p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Successful Txs</div>
                    <div className="text-2xl font-bold text-gray-200">{agent.total_successful_txs}</div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div>
                    <div className="text-xs text-gray-500">Wallet Address</div>
                    <div className="text-sm text-gray-300 font-mono truncate">
                      {agent.pubkey}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">API Endpoint</div>
                    <div className="text-sm text-gray-300 font-mono truncate">
                      {agent.api_url}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <a
                    href={`https://explorer.solana.com/address/${agent.pubkey}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn-secondary text-xs justify-center"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View on Explorer
                  </a>
                  <a
                    href={`${agent.api_url}/info`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn-primary text-xs justify-center"
                  >
                    <Activity className="w-3 h-3 mr-1" />
                    Check Status
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-8 text-center text-xs text-gray-500">
          🔴 Real-time data from Solana Devnet • Program ID: Fg6PaFpoGXkPABqLTSsAPoV2K1tTq2tL2R1fV9EFSGjM
        </div>
      </div>
    </div>
  )
}

