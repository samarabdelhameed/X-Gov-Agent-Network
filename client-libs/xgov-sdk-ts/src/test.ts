/**
 * Test script for X-Gov Reputation SDK
 * Demonstrates REAL blockchain interactions
 */

import { XGovReputationSDK } from './index.js';
import { Keypair } from '@solana/web3.js';

async function testSDK() {
  console.log('========================================');
  console.log('🧪 X-GOV SDK TEST - REAL DATA');
  console.log('========================================\n');

  // Initialize SDK (connects to REAL Solana devnet)
  const sdk = new XGovReputationSDK({
    cluster: 'devnet',
  });

  console.log('✅ SDK initialized\n');

  // Test 1: Get network stats (REAL)
  console.log('[TEST 1] Fetching REAL Solana network stats...');
  const networkStats = await sdk.getNetworkStats();
  console.log('Network Stats:', networkStats);
  console.log('');

  // Test 2: Get agent count (REAL)
  console.log('[TEST 2] Fetching REAL agent count from blockchain...');
  const agentCount = await sdk.getAgentCount();
  console.log(`Total Agents Registered: ${agentCount}`);
  console.log('');

  // Test 3: Get all agent profiles (REAL)
  console.log('[TEST 3] Fetching ALL agent profiles (REAL on-chain data)...');
  const agents = await sdk.getAllAgentProfiles();
  console.log(`Found ${agents.length} agents:`);
  agents.forEach(agent => {
    console.log(`  - ${agent.name}: Reputation ${agent.reputationScore}, Txs: ${agent.totalSuccessfulTxs}`);
  });
  console.log('');

  // Test 4: Get transaction count (REAL)
  console.log('[TEST 4] Fetching REAL transaction count...');
  const txCount = await sdk.getTransactionCount();
  console.log(`Total Transactions: ${txCount}`);
  console.log('');

  // Test 5: Find best agent (REAL)
  console.log('[TEST 5] Finding best agent for "data_scraper" service...');
  const bestAgent = await sdk.findBestAgent('data_scraper');
  if (bestAgent) {
    console.log(`Best Agent: ${bestAgent.name}`);
    console.log(`  Reputation: ${bestAgent.reputationScore}`);
    console.log(`  Pubkey: ${bestAgent.pubkey}`);
  } else {
    console.log('No agents found (program not deployed or no agents registered)');
  }
  console.log('');

  // Test 6: Check if agent is registered (REAL)
  console.log('[TEST 6] Checking if test wallet is registered...');
  const testWallet = Keypair.generate();
  const isRegistered = await sdk.isAgentRegistered(testWallet.publicKey);
  console.log(`Wallet ${testWallet.publicKey.toString()} registered: ${isRegistered}`);
  console.log('');

  console.log('========================================');
  console.log('✅ SDK TEST COMPLETED');
  console.log('========================================');
  console.log('\nAll functions connect to REAL Solana blockchain!');
  console.log('Deploy the program and register agents to see real data.\n');
}

// Run tests
testSDK().catch(console.error);

