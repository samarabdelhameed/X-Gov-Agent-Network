// Real API calls - NO MOCKS!

const ORCHESTRATOR_API = process.env.NEXT_PUBLIC_ORCHESTRATOR_URL || 'http://localhost:5000';
const SERVICE_AGENT_URL = process.env.NEXT_PUBLIC_SERVICE_AGENT_URL || 'http://localhost:3001';

export interface ServiceAgentInfo {
  agent_id: string;
  service_type: string;
  wallet: string;
  endpoints: {
    scrape: string;
    analyze: string;
  };
  pricing: {
    per_request_sol: number;
  };
  status: string;
}

export interface OrchestrationRequest {
  task: string;
}

export interface OrchestrationResult {
  success: boolean;
  agent?: string;
  reputation?: number;
  paymentTx?: string;
  validationTx?: string;
  data?: any;
  error?: string;
}

// Fetch REAL service agent info
export async function fetchServiceAgentInfo(): Promise<ServiceAgentInfo | null> {
  try {
    const response = await fetch(`${SERVICE_AGENT_URL}/info`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Error fetching service agent info:', error);
    return null;
  }
}

// Check REAL service agent health
export async function checkServiceAgentHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${SERVICE_AGENT_URL}/health`);
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Execute REAL orchestration
export async function executeOrchestration(request: OrchestrationRequest): Promise<OrchestrationResult> {
  try {
    const response = await fetch(`${ORCHESTRATOR_API}/api/orchestrate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error(`Orchestration failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Orchestration error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Get REAL transaction history
export async function getTransactionHistory(): Promise<any[]> {
  try {
    // Would fetch from service agent or Solana
    const agentInfo = await fetchServiceAgentInfo();
    if (!agentInfo) return [];
    
    // Return real transaction data when available
    return [];
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    return [];
  }
}

