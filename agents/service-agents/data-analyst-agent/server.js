import express from 'express';
import cors from 'cors';
import { Connection, PublicKey, Keypair, Transaction, SystemProgram } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction } from '@solana/spl-token';
import bs58 from 'bs58';
import dotenv from 'dotenv';

dotenv.config();

// ============================================================
// Configuration
// ============================================================
const PORT = process.env.PORT || 3001;
const AGENT_NAME = process.env.AGENT_NAME || 'DataAnalystAgent';
const SERVICE_TYPE = process.env.SERVICE_TYPE || 'data_scraper';

// Solana Configuration
const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com';
const connection = new Connection(SOLANA_RPC_URL, 'confirmed');

// Agent wallet (receives payments)
let agentWallet;
try {
  const privateKey = process.env.AGENT_WALLET_PRIVATE_KEY;
  if (privateKey) {
    agentWallet = Keypair.fromSecretKey(bs58.decode(privateKey));
  } else {
    console.log('⚠️  No private key provided, generating new wallet...');
    agentWallet = Keypair.generate();
    console.log('🔑 Generated Wallet Public Key:', agentWallet.publicKey.toString());
    console.log('🔑 Private Key (Base58):', bs58.encode(agentWallet.secretKey));
  }
} catch (error) {
  console.error('❌ Error loading wallet:', error);
  agentWallet = Keypair.generate();
}

// x402 Payment Configuration
const PAYMENT_AMOUNT_LAMPORTS = parseInt(process.env.PAYMENT_REQUIRED_LAMPORTS || '5000000'); // 0.005 SOL
const MIN_PAYMENT_USDC = parseFloat(process.env.MIN_PAYMENT_AMOUNT_USDC || '0.01');
const USDC_MINT = new PublicKey(
  process.env.USDC_MINT_ADDRESS || 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
); // USDC Devnet

// Reputation Program ID
const REPUTATION_PROGRAM_ID = new PublicKey(
  process.env.REPUTATION_PROGRAM_ID || 'Fg6PaFpoGXkPABqLTSsAPoV2K1tTq2tL2R1fV9EFSGjM'
);

// ============================================================
// In-Memory Payment Tracking (In production: use Redis/Database)
// ============================================================
const verifiedPayments = new Map();

// ============================================================
// Express App Setup
// ============================================================
const app = express();
app.use(cors());
app.use(express.json());

// ============================================================
// Middleware: x402 Payment Verification
// ============================================================
async function verifyX402Payment(req, res, next) {
  const paymentProof = req.headers['x-payment-proof'] || req.query.payment;
  
  if (!paymentProof) {
    // No payment proof provided - return 402 Payment Required
    return res.status(402).json({
      error: 'Payment Required',
      message: 'This service requires x402 payment',
      payment_details: {
        recipient: agentWallet.publicKey.toString(),
        amount_lamports: PAYMENT_AMOUNT_LAMPORTS,
        amount_sol: PAYMENT_AMOUNT_LAMPORTS / 1e9,
        amount_usdc: MIN_PAYMENT_USDC,
        currency: 'SOL or USDC',
        network: 'solana-devnet'
      },
      instructions: 'Send payment to recipient address and include transaction signature in X-Payment-Proof header'
    });
  }
  
  // Check if payment was already verified (caching)
  if (verifiedPayments.has(paymentProof)) {
    const cachedPayment = verifiedPayments.get(paymentProof);
    if (Date.now() - cachedPayment.timestamp < 3600000) { // Valid for 1 hour
      req.paymentInfo = cachedPayment;
      return next();
    }
  }
  
  try {
    // Verify payment on Solana blockchain
    console.log(`🔍 Verifying payment: ${paymentProof}`);
    const txSignature = paymentProof;
    
    const transaction = await connection.getTransaction(txSignature, {
      commitment: 'confirmed',
      maxSupportedTransactionVersion: 0
    });
    
    if (!transaction) {
      return res.status(400).json({
        error: 'Invalid Payment',
        message: 'Transaction not found on blockchain'
      });
    }
    
    // Verify payment recipient and amount
    const { meta, transaction: tx } = transaction;
    
    // Check if transaction was successful
    if (meta.err) {
      return res.status(400).json({
        error: 'Payment Failed',
        message: 'Transaction failed on blockchain'
      });
    }
    
    // Verify recipient (simplified check)
    const accountKeys = tx.message.staticAccountKeys || tx.message.accountKeys;
    const agentPubkeyIndex = accountKeys.findIndex(
      key => key.toString() === agentWallet.publicKey.toString()
    );
    
    if (agentPubkeyIndex === -1) {
      return res.status(400).json({
        error: 'Invalid Payment',
        message: 'Payment was not sent to this agent'
      });
    }
    
    // Verify amount (check balance changes)
    const postBalance = meta.postBalances[agentPubkeyIndex];
    const preBalance = meta.preBalances[agentPubkeyIndex];
    const amountReceived = postBalance - preBalance;
    
    if (amountReceived < PAYMENT_AMOUNT_LAMPORTS) {
      return res.status(400).json({
        error: 'Insufficient Payment',
        message: `Required: ${PAYMENT_AMOUNT_LAMPORTS} lamports, Received: ${amountReceived} lamports`
      });
    }
    
    // Payment verified successfully
    const paymentInfo = {
      txSignature,
      amount: amountReceived,
      payer: accountKeys[0].toString(),
      timestamp: Date.now(),
      verified: true
    };
    
    // Cache the verification
    verifiedPayments.set(paymentProof, paymentInfo);
    req.paymentInfo = paymentInfo;
    
    console.log(`✅ Payment verified: ${amountReceived / 1e9} SOL from ${paymentInfo.payer}`);
    next();
    
  } catch (error) {
    console.error('❌ Payment verification error:', error);
    return res.status(400).json({
      error: 'Payment Verification Failed',
      message: error.message
    });
  }
}

// ============================================================
// Service Endpoints (Protected by x402)
// ============================================================

// Health check (no payment required)
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    agent: AGENT_NAME,
    service_type: SERVICE_TYPE,
    wallet: agentWallet.publicKey.toString(),
    payment_required: true,
    price: {
      lamports: PAYMENT_AMOUNT_LAMPORTS,
      sol: PAYMENT_AMOUNT_LAMPORTS / 1e9,
      usdc: MIN_PAYMENT_USDC
    }
  });
});

// Main service endpoint - Data Scraping (x402 PROTECTED)
app.get('/scrape', verifyX402Payment, async (req, res) => {
  try {
    console.log('📊 Processing scraping request...');
    
    const query = req.query.q || 'default';
    
    // REAL SERVICE: Implement actual data scraping here
    // For demo: Return realistic data structure
    const scrapedData = {
      service: AGENT_NAME,
      query: query,
      timestamp: new Date().toISOString(),
      data: {
        // Real implementation would scrape actual data
        source: 'Solana Network Data',
        metrics: {
          total_transactions_24h: 145_230_000,
          average_tps: 2500,
          total_accounts: 89_450_000,
          active_validators: 1900
        },
        prices: {
          SOL_USD: 142.35,
          change_24h: 5.2,
          volume_24h: 2_450_000_000
        },
        recent_activity: [
          { type: 'NFT_SALE', value: 45.5, time: '2 mins ago' },
          { type: 'TOKEN_SWAP', value: 1250, time: '5 mins ago' },
          { type: 'STAKE', value: 500, time: '8 mins ago' }
        ]
      },
      payment: {
        tx_signature: req.paymentInfo.txSignature,
        amount_paid: req.paymentInfo.amount / 1e9,
        payer: req.paymentInfo.payer
      }
    };
    
    res.json({
      success: true,
      ...scrapedData
    });
    
  } catch (error) {
    console.error('❌ Service error:', error);
    res.status(500).json({
      success: false,
      error: 'Service execution failed',
      message: error.message
    });
  }
});

// Analysis endpoint (x402 PROTECTED)
app.post('/analyze', verifyX402Payment, async (req, res) => {
  try {
    console.log('🔬 Processing analysis request...');
    
    const { data, analysis_type } = req.body;
    
    // REAL SERVICE: Implement actual analysis here
    const analysisResult = {
      service: AGENT_NAME,
      analysis_type: analysis_type || 'sentiment',
      timestamp: new Date().toISOString(),
      result: {
        sentiment_score: 0.75,
        confidence: 0.89,
        classification: 'POSITIVE',
        key_insights: [
          'Strong bullish sentiment detected',
          'High engagement on positive news',
          'Institutional interest increasing'
        ]
      },
      payment: {
        tx_signature: req.paymentInfo.txSignature,
        amount_paid: req.paymentInfo.amount / 1e9,
        payer: req.paymentInfo.payer
      }
    };
    
    res.json({
      success: true,
      ...analysisResult
    });
    
  } catch (error) {
    console.error('❌ Analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Analysis failed',
      message: error.message
    });
  }
});

// Agent info endpoint (no payment required for discovery)
app.get('/info', (req, res) => {
  res.json({
    agent_id: AGENT_NAME,
    service_type: SERVICE_TYPE,
    wallet: agentWallet.publicKey.toString(),
    endpoints: {
      scrape: '/scrape',
      analyze: '/analyze'
    },
    pricing: {
      per_request_lamports: PAYMENT_AMOUNT_LAMPORTS,
      per_request_sol: PAYMENT_AMOUNT_LAMPORTS / 1e9,
      per_request_usdc: MIN_PAYMENT_USDC,
      currency: 'SOL or USDC'
    },
    payment_protocol: 'x402',
    reputation_program: REPUTATION_PROGRAM_ID.toString(),
    status: 'online'
  });
});

// ============================================================
// Start Server
// ============================================================
app.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log(`🚀 ${AGENT_NAME} Service Agent Started`);
  console.log('='.repeat(60));
  console.log(`📡 Port: ${PORT}`);
  console.log(`🔗 Network: ${SOLANA_RPC_URL}`);
  console.log(`💼 Wallet: ${agentWallet.publicKey.toString()}`);
  console.log(`💰 Price: ${PAYMENT_AMOUNT_LAMPORTS / 1e9} SOL per request`);
  console.log(`🔒 Protection: x402 Payment Required`);
  console.log(`📊 Service Type: ${SERVICE_TYPE}`);
  console.log('='.repeat(60));
  console.log(`✅ Ready to accept payments and serve data!`);
  console.log(`\nEndpoints:`);
  console.log(`  GET  /health  - Health check (free)`);
  console.log(`  GET  /info    - Agent info (free)`);
  console.log(`  GET  /scrape  - Data scraping (requires x402 payment)`);
  console.log(`  POST /analyze - Data analysis (requires x402 payment)`);
  console.log('='.repeat(60));
});

export default app;

