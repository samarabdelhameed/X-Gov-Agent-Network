use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkPABqLTSsAPoV2K1tTq2tL2R1fV9EFSGjM"); // placeholder ID

// ----------------------------------------------------
// 1. Main Program (Entry Point)
// ----------------------------------------------------
#[program]
pub mod x_gov_reputation {
    use super::*;

    // Function to register a new agent
    pub fn register_agent(ctx: Context<RegisterAgent>, name: String) -> Result<()> {
        let agent = &mut ctx.accounts.agent_profile;
        agent.owner = ctx.accounts.signer.key();
        agent.name = name;
        agent.reputation_score = 100; // All agents start with a score of 100
        agent.total_successful_txs = 0;
        Ok(())
    }

    // Function to record service validation (update reputation)
    // Called by the orchestrator agent after x402 payment completion
    pub fn record_validation(ctx: Context<RecordValidation>, success: bool) -> Result<()> {
        let validation = &mut ctx.accounts.validation_record;
        validation.buyer = ctx.accounts.buyer.key();
        validation.seller = ctx.accounts.seller_profile.key();
        validation.success = success;
        validation.timestamp = Clock::get()?.unix_timestamp;

        // Update reputation
        let seller_profile = &mut ctx.accounts.seller_profile;
        if success {
            seller_profile.reputation_score += 1;
            seller_profile.total_successful_txs += 1;
        } else {
            // Complex logic to decrease reputation (can be developed later)
            seller_profile.reputation_score = seller_profile.reputation_score.saturating_sub(5);
        }
        Ok(())
    }
}

// ----------------------------------------------------
// 2. Context Structures (Access Control Validation)
// ----------------------------------------------------
// Context for register_agent function
#[derive(Accounts)]
#[instruction(name: String)]
pub struct RegisterAgent<'info> {
    #[account(
        init, 
        payer = signer, 
        space = 8 + AgentProfile::INIT_SPACE, 
        seeds = [b"agent", signer.key().as_ref()], 
        bump
    )]
    pub agent_profile: Account<'info, AgentProfile>,
    #[account(mut)]
    pub signer: Signer<'info>, // Owner/creator of the profile
    pub system_program: Program<'info, System>,
}

// Context for record_validation function
#[derive(Accounts)]
pub struct RecordValidation<'info> {
    // Account to store transaction record (created on each invocation)
    #[account(init, payer = buyer, space = 8 + ServiceValidation::INIT_SPACE)]
    pub validation_record: Account<'info, ServiceValidation>,
    
    // Seller agent profile (must be mutable to update reputation)
    #[account(mut)]
    pub seller_profile: Account<'info, AgentProfile>,
    
    // Buyer/orchestrator agent (pays and records the evaluation)
    #[account(mut)]
    pub buyer: Signer<'info>, 
    pub system_program: Program<'info, System>,
}

// ----------------------------------------------------
// 3. Data Structures (Accounts)
// ----------------------------------------------------

// Structure to store agent profile data
#[account]
#[derive(InitSpace)]
pub struct AgentProfile {
    pub owner: Pubkey,                         // Agent owner's public key
    #[max_len(50)]
    pub name: String,                          // Agent name (max 50 characters)
    pub reputation_score: u16,                 // Reputation score (0-65535)
    pub total_successful_txs: u32,             // Total successful transactions
}

// Structure to store a single service validation record
#[account]
#[derive(InitSpace)]
pub struct ServiceValidation {
    pub buyer: Pubkey,
    pub seller: Pubkey,
    pub success: bool,                         // Was the service successful?
    pub timestamp: i64,                        // Recording timestamp
}
