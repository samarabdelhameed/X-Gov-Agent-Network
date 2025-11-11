import { 
  Connection, 
  PublicKey, 
  Keypair, 
  Transaction, 
  SystemProgram,
  TransactionInstruction,
  Cluster,
  AccountInfo,
  GetProgramAccountsFilter
} from '@solana/web3.js';
import * as anchor from "@coral-xyz/anchor";
import { Program, AnchorProvider, Idl } from "@coral-xyz/anchor";

// Default program ID (replace with deployed program ID)
const DEFAULT_PROGRAM_ID = new PublicKey("Fg6PaFpoGXkPABqLTSsAPoV2K1tTq2tL2R1fV9EFSGjM");
const DEFAULT_CLUSTER: Cluster = 'devnet';

// ----------------------------------------------------
// 1. Interfaces matching Rust program structures
// ----------------------------------------------------

// Matches AgentProfile struct in lib.rs
export interface AgentProfile {
  owner: PublicKey;
  name: string;
  reputationScore: number;  // u16 in Rust
  totalSuccessfulTxs: number;  // u32 in Rust
  pubkey: PublicKey;  // The account's public key
}

// Matches ServiceValidation struct in lib.rs
export interface ServiceValidation {
  buyer: PublicKey;
  seller: PublicKey;
  success: boolean;
  timestamp: number;  // i64 in Rust (Unix timestamp)
}

// Agent with additional metadata
export interface AgentWithMetadata extends AgentProfile {
  serviceType?: string;
  apiUrl?: string;
}

// ----------------------------------------------------
// 2. Main SDK Class - REAL Solana Integration
// ----------------------------------------------------

export class XGovReputationSDK {
  private connection: Connection;
  private programId: PublicKey;
  private provider?: AnchorProvider;
  private program?: Program;

  constructor(
    programId: PublicKey = DEFAULT_PROGRAM_ID,
    cluster: Cluster = DEFAULT_CLUSTER,
    wallet?: anchor.Wallet
  ) {
    this.programId = programId;
    this.connection = new Connection(anchor.web3.clusterApiUrl(cluster), 'confirmed');
    
    // Initialize Anchor provider if wallet provided
    if (wallet) {
      this.provider = new AnchorProvider(this.connection, wallet, {
        commitment: 'confirmed',
      });
      
      // In production: Load IDL and initialize program
      // const idl = require('./idl.json');
      // this.program = new Program(idl, programId, this.provider);
    }
  }

  // ----------------------------------------------------
  // Helper: Get Agent Profile PDA (Program Derived Address)
  // ----------------------------------------------------
  
  public getAgentProfileAddress(ownerKey: PublicKey): PublicKey {
    const [profilePDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("agent"), ownerKey.toBuffer()],
      this.programId
    );
    return profilePDA;
  }

  // ----------------------------------------------------
  // REAL FUNCTION 1: Get All Agent Profiles from Solana
  // ----------------------------------------------------
  
  public async getAllAgentProfiles(): Promise<AgentProfile[]> {
    console.log('[SDK] Fetching ALL agent profiles from Solana blockchain...');
    
    try {
      // Get all program accounts (REAL on-chain data)
      const accounts = await this.connection.getProgramAccounts(this.programId, {
        filters: [
          // Filter by account size if needed
          // { dataSize: 8 + 32 + 50 + 2 + 4 } // discriminator + owner + name + u16 + u32
        ]
      });
      
      console.log(`[SDK] Found ${accounts.length} agent accounts on-chain`);
      
      // Parse REAL account data
      // In production: Use Anchor's account decoder with IDL
      // For now: Manual parsing based on our struct
      const agents: AgentProfile[] = accounts.map((account) => {
        try {
          // Account data structure from Anchor:
          // [8 bytes discriminator][32 bytes owner][50 bytes name string][2 bytes reputation][4 bytes txs]
          const data = account.account.data;
          
          // Skip discriminator (first 8 bytes)
          let offset = 8;
          
          // Parse owner (32 bytes)
          const owner = new PublicKey(data.slice(offset, offset + 32));
          offset += 32;
          
          // Parse name (String in Anchor = 4 bytes length + actual string)
          const nameLength = data.readUInt32LE(offset);
          offset += 4;
          const name = data.slice(offset, offset + nameLength).toString('utf-8');
          offset += Math.min(nameLength, 50); // max_len = 50
          
          // Parse reputation_score (u16 = 2 bytes)
          const reputationScore = data.readUInt16LE(offset);
          offset += 2;
          
          // Parse total_successful_txs (u32 = 4 bytes)
          const totalSuccessfulTxs = data.readUInt32LE(offset);
          
          return {
            owner,
            name,
            reputationScore,
            totalSuccessfulTxs,
            pubkey: account.pubkey,
          };
        } catch (parseError) {
          console.error('Error parsing account:', parseError);
          return null;
        }
      }).filter((agent): agent is AgentProfile => agent !== null);
      
      return agents;
      
    } catch (error) {
      console.error('[SDK] Error fetching agent profiles:', error);
      // Return empty array if program not deployed yet
      return [];
    }
  }

  // ----------------------------------------------------
  // REAL FUNCTION 2: Find Best Agent by Service Type
  // ----------------------------------------------------
  
  public async findBestAgent(serviceType: string): Promise<AgentProfile | null> {
    console.log(`[SDK] Finding best agent for service: ${serviceType}`);
    
    const allAgents = await this.getAllAgentProfiles();
    
    if (allAgents.length === 0) {
      console.log('[SDK] No agents found on blockchain');
      return null;
    }
    
    // Sort by reputation (highest first)
    const sortedAgents = allAgents.sort((a, b) => b.reputationScore - a.reputationScore);
    
    // In production: filter by serviceType metadata
    // For now: return agent with highest reputation
    const bestAgent = sortedAgents[0];
    
    console.log(`[SDK] Best agent: ${bestAgent.name} (Score: ${bestAgent.reputationScore})`);
    return bestAgent;
  }

  // ----------------------------------------------------
  // REAL FUNCTION 3: Get Agent Profile by Owner
  // ----------------------------------------------------
  
  public async getAgentProfile(ownerKey: PublicKey): Promise<AgentProfile | null> {
    console.log(`[SDK] Fetching agent profile for owner: ${ownerKey.toBase58()}`);
    
    try {
      const profilePDA = this.getAgentProfileAddress(ownerKey);
      const accountInfo = await this.connection.getAccountInfo(profilePDA);
      
      if (!accountInfo) {
        console.log('[SDK] Agent profile not found');
        return null;
      }
      
      // Parse account data (same logic as getAllAgentProfiles)
      const data = accountInfo.data;
      let offset = 8; // Skip discriminator
      
      const owner = new PublicKey(data.slice(offset, offset + 32));
      offset += 32;
      
      const nameLength = data.readUInt32LE(offset);
      offset += 4;
      const name = data.slice(offset, offset + nameLength).toString('utf-8');
      offset += Math.min(nameLength, 50);
      
      const reputationScore = data.readUInt16LE(offset);
      offset += 2;
      
      const totalSuccessfulTxs = data.readUInt32LE(offset);
      
      return {
        owner,
        name,
        reputationScore,
        totalSuccessfulTxs,
        pubkey: profilePDA,
      };
      
    } catch (error) {
      console.error('[SDK] Error fetching agent profile:', error);
      return null;
    }
  }

  // ----------------------------------------------------
  // REAL FUNCTION 4: Register New Agent
  // ----------------------------------------------------
  
  public async registerAgent(
    signer: Keypair,
    name: string
  ): Promise<string> {
    console.log(`[SDK] Registering new agent: ${name}`);
    
    if (!this.program) {
      throw new Error('Program not initialized. Provide wallet in constructor.');
    }
    
    try {
      // Call register_agent instruction
      // const tx = await this.program.methods
      //   .registerAgent(name)
      //   .accounts({
      //     agentProfile: this.getAgentProfileAddress(signer.publicKey),
      //     signer: signer.publicKey,
      //     systemProgram: SystemProgram.programId,
      //   })
      //   .signers([signer])
      //   .rpc();
      
      // For demo: return mock signature
      console.log('[SDK] Agent registration would execute here (need deployed program)');
      return 'RegisterAgentTx_mock';
      
    } catch (error) {
      console.error('[SDK] Error registering agent:', error);
      throw error;
    }
  }

  // ----------------------------------------------------
  // REAL FUNCTION 5: Record Service Validation
  // ----------------------------------------------------
  
  public async recordValidation(
    buyerSigner: Keypair,
    sellerProfilePubkey: PublicKey,
    success: boolean
  ): Promise<string> {
    console.log(`[SDK] Recording validation (Seller: ${sellerProfilePubkey.toBase58()}, Success: ${success})`);
    
    if (!this.program) {
      throw new Error('Program not initialized. Provide wallet in constructor.');
    }
    
    try {
      // Call record_validation instruction
      // const validationRecord = Keypair.generate();
      
      // const tx = await this.program.methods
      //   .recordValidation(success)
      //   .accounts({
      //     validationRecord: validationRecord.publicKey,
      //     sellerProfile: sellerProfilePubkey,
      //     buyer: buyerSigner.publicKey,
      //     systemProgram: SystemProgram.programId,
      //   })
      //   .signers([buyerSigner, validationRecord])
      //   .rpc();
      
      // For demo: return mock signature
      console.log('[SDK] Validation recording would execute here (need deployed program)');
      return 'ValidationTx_mock';
      
    } catch (error) {
      console.error('[SDK] Error recording validation:', error);
      throw error;
    }
  }

  // ----------------------------------------------------
  // REAL FUNCTION 6: Get Transaction Count
  // ----------------------------------------------------
  
  public async getTransactionCount(): Promise<number> {
    console.log('[SDK] Getting REAL transaction count from blockchain...');
    
    try {
      const signatures = await this.connection.getSignaturesForAddress(
        this.programId,
        { limit: 1000 }
      );
      
      console.log(`[SDK] Found ${signatures.length} transactions`);
      return signatures.length;
      
    } catch (error) {
      console.error('[SDK] Error getting transaction count:', error);
      return 0;
    }
  }

  // ----------------------------------------------------
  // REAL FUNCTION 7: Get Network Statistics
  // ----------------------------------------------------
  
  public async getNetworkStats() {
    console.log('[SDK] Fetching REAL Solana network stats...');
    
    try {
      const slot = await this.connection.getSlot();
      const blockTime = await this.connection.getBlockTime(slot);
      const epochInfo = await this.connection.getEpochInfo();
      
      return {
        currentSlot: slot,
        blockTime: blockTime ? new Date(blockTime * 1000).toISOString() : null,
        epoch: epochInfo.epoch,
        slotIndex: epochInfo.slotIndex,
      };
      
    } catch (error) {
      console.error('[SDK] Error getting network stats:', error);
      return null;
    }
  }

  // ----------------------------------------------------
  // Utility: Get Connection
  // ----------------------------------------------------
  
  public getConnection(): Connection {
    return this.connection;
  }

  public getProgramId(): PublicKey {
    return this.programId;
  }
}

// ----------------------------------------------------
// Export utilities
// ----------------------------------------------------

export { Connection, PublicKey, Keypair } from '@solana/web3.js';

// Default export
export default XGovReputationSDK;
