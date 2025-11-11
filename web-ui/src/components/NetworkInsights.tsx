'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react'

// Mock data - in production, fetch from Solana
const agentReputationData = [
  { name: 'DataScraper_Pro', reputation: 125, transactions: 48 },
  { name: 'SentimentAnalyzer', reputation: 110, transactions: 35 },
  { name: 'FastScraper', reputation: 98, transactions: 22 },
  { name: 'CodeExecutor', reputation: 85, transactions: 15 },
]

const transactionVolumeData = [
  { time: '00:00', volume: 12 },
  { time: '04:00', volume: 18 },
  { time: '08:00', volume: 25 },
  { time: '12:00', volume: 32 },
  { time: '16:00', volume: 28 },
  { time: '20:00', volume: 22 },
  { time: 'Now', volume: 35 },
]

const reputationDistribution = [
  { name: '100-110', value: 2, color: '#00ff41' },
  { name: '111-120', value: 1, color: '#00cc34' },
  { name: '121-130', value: 1, color: '#009926' },
]

const COLORS = ['#00ff41', '#00cc34', '#009926', '#006619']

export default function NetworkInsights() {
  const [stats, setStats] = useState({
    totalAgents: 4,
    highestReputation: 125,
    totalTransactions: 120,
    activeNow: 3,
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 3),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6 sticky top-24"
    >
      {/* Header */}
      <div className="card-glow">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="w-6 h-6 text-neon-green" />
          <h2 className="text-2xl font-bold text-neon-green">Network Insights</h2>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard
            icon={<Users className="w-5 h-5" />}
            label="Total Agents"
            value={stats.totalAgents}
            trend="+2"
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Highest Rep"
            value={stats.highestReputation}
          />
          <StatCard
            icon={<DollarSign className="w-5 h-5" />}
            label="x402 Txs"
            value={stats.totalTransactions}
            trend="+12"
            animated
          />
          <StatCard
            icon={<Activity className="w-5 h-5" />}
            label="Active Now"
            value={stats.activeNow}
            pulse
          />
        </div>

        {/* Agent Reputation Chart */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-neon-green mb-3">Agent Reputation Scores</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={agentReputationData}>
              <XAxis
                dataKey="name"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickFormatter={(value) => value.split('_')[0]}
              />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#151a23',
                  border: '1px solid #00ff41',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#00ff41' }}
              />
              <Bar dataKey="reputation" fill="#00ff41" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Reputation Distribution Pie */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-neon-green mb-3">Reputation Distribution</h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={reputationDistribution}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
              >
                {reputationDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#151a23',
                  border: '1px solid #00ff41',
                  borderRadius: '8px',
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: '12px', color: '#9ca3af' }}
                formatter={(value, entry: any) => `${entry.payload.name}: ${entry.payload.value}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Transaction Volume Chart */}
        <div>
          <h3 className="text-lg font-semibold text-neon-green mb-3">x402 Transaction Volume (24h)</h3>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={transactionVolumeData}>
              <XAxis dataKey="time" tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#151a23',
                  border: '1px solid #00ff41',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#00ff41' }}
              />
              <Line
                type="monotone"
                dataKey="volume"
                stroke="#00ff41"
                strokeWidth={2}
                dot={{ fill: '#00ff41', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Live Agent List */}
      <div className="card-glow">
        <h3 className="text-lg font-semibold text-neon-green mb-4">Top Agents by Reputation</h3>
        <div className="space-y-3">
          {agentReputationData.slice(0, 3).map((agent, index) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-dark-bg border border-neon-green/20 rounded-lg hover:border-neon-green/40 transition-colors"
            >
              <div>
                <p className="font-medium text-gray-200">{agent.name}</p>
                <p className="text-xs text-gray-500">{agent.transactions} successful txs</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-neon-green">{agent.reputation}</p>
                <p className="text-xs text-gray-500">reputation</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

type StatCardProps = {
  icon: React.ReactNode
  label: string
  value: number
  trend?: string
  animated?: boolean
  pulse?: boolean
}

function StatCard({ icon, label, value, trend, animated, pulse }: StatCardProps) {
  return (
    <motion.div
      className="p-4 bg-dark-bg border border-neon-green/20 rounded-lg hover:border-neon-green/40 transition-colors"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-2 mb-2 text-gray-400">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className="flex items-end justify-between">
        <motion.span
          className="text-2xl font-bold text-neon-green"
          key={value}
          initial={animated ? { scale: 1.2, color: '#00ff41' } : {}}
          animate={animated ? { scale: 1, color: '#00ff41' } : {}}
        >
          {value}
        </motion.span>
        {trend && (
          <span className="text-xs text-neon-green">
            {trend}
          </span>
        )}
        {pulse && (
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-green"></span>
          </span>
        )}
      </div>
    </motion.div>
  )
}

