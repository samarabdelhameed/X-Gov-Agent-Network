// Real Solana Integration - Using REAL SDK (NO MOCKS!)

import { PublicKey } from '@solana/web3.js';
import XGovReputationSDK from '../../../client-libs/xgov-sdk-ts/src/index';

// Initialize REAL SDK
const sdk = new XGovReputationSDK(
  new PublicKey(process.env.NEXT_PUBLIC_REPUTATION_PROGRAM_ID || 'Fg6PaFpoGXkPABqLTSsAPoV2K1tTq2tL2R1fV9EFSGjM'),
  'devnet'
);

export interface AgentProfile {
  pubkey: string;
  name: string;
  reputation_score: number;
  total_successful_txs: number;
  owner: string;
}

// Fetch REAL agent profiles using SDK
export async function fetchAgentProfiles(): Promise<AgentProfile[]> {
  try {
    console.log('[UI] Fetching REAL agent profiles from Solana via SDK...');
    
    // Call REAL SDK function
    const agents = await sdk.getAllAgentProfiles();
    
    console.log(`[UI] Received ${agents.length} agents from blockchain`);
    
    // Transform to UI format
    return agents.map(agent => ({
      pubkey: agent.pubkey.toString(),
      name: agent.name,
      reputation_score: agent.reputationScore,
      total_successful_txs: agent.totalSuccessfulTxs,
      owner: agent.owner.toString(),
    }));
    
  } catch (error) {
    console.error('[UI] Error fetching agent profiles:', error);
    return [];
  }
}

// Get REAL transaction count using SDK
export async function getTransactionCount(): Promise<number> {
  try {
    console.log('[UI] Getting REAL transaction count via SDK...');
    const count = await sdk.getTransactionCount();
    console.log(`[UI] Total transactions: ${count}`);
    return count;
  } catch (error) {
    console.error('[UI] Error getting tx count:', error);
    return 0;
  }
}

// Get REAL network stats using SDK
export async function getNetworkStats() {
  try {
    console.log('[UI] Getting REAL network stats via SDK...');
    const stats = await sdk.getNetworkStats();
    console.log('[UI] Network stats:', stats);
    return stats;
  } catch (error) {
    console.error('[UI] Error getting network stats:', error);
    return null;
  }
}

// Export SDK instance for direct use
export { sdk };

