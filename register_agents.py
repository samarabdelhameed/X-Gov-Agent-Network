#!/usr/bin/env python3
"""
Quick script to register demo agents in the Professional Agent Registry
"""
import json
import sys
import os

# Add agents directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'agents', 'orchestrator-agent'))

from agent_manager import agent_manager

def register_demo_agents():
    """Register demo agents for testing"""
    print("🤖 Registering Demo Agents...")
    print("=" * 60)
    
    # Demo Agent 1: Data Analyst
    agent1 = {
        "agent_id": "DataAnalystAgent_001",
        "pubkey": "Demo_Agent_1_Pubkey",
        "wallet": "Demo_Agent_1_Wallet",
        "reputation_score": 150,
        "total_successful_txs": 25,
        "api_url": "http://localhost:3001",
        "service_type": "data_scraper",
        "owner": "Demo_Owner_1",
        "status": "active"
    }
    
    # Demo Agent 2: Text Analyst
    agent2 = {
        "agent_id": "TextAnalystAgent_002",
        "pubkey": "Demo_Agent_2_Pubkey",
        "wallet": "Demo_Agent_2_Wallet",
        "reputation_score": 180,
        "total_successful_txs": 35,
        "api_url": "http://localhost:3002",
        "service_type": "text_analyst",
        "owner": "Demo_Owner_2",
        "status": "active"
    }
    
    # Demo Agent 3: Image Processor
    agent3 = {
        "agent_id": "ImageProcessorAgent_003",
        "pubkey": "Demo_Agent_3_Pubkey",
        "wallet": "Demo_Agent_3_Wallet",
        "reputation_score": 120,
        "total_successful_txs": 15,
        "api_url": "http://localhost:3003",
        "service_type": "image_processor",
        "owner": "Demo_Owner_3",
        "status": "active"
    }
    
    # Demo Agent 4: Code Executor
    agent4 = {
        "agent_id": "CodeExecutorAgent_004",
        "pubkey": "Demo_Agent_4_Pubkey",
        "wallet": "Demo_Agent_4_Wallet",
        "reputation_score": 200,
        "total_successful_txs": 50,
        "api_url": "http://localhost:3004",
        "service_type": "code_executor",
        "owner": "Demo_Owner_4",
        "status": "active"
    }
    
    agents = [agent1, agent2, agent3, agent4]
    
    registered_count = 0
    for agent in agents:
        if agent_manager.register_agent(agent):
            print(f"✅ Registered: {agent['agent_id']}")
            print(f"   Service Type: {agent['service_type']}")
            print(f"   Reputation: {agent['reputation_score']}")
            print(f"   Successful Txs: {agent['total_successful_txs']}")
            print()
            registered_count += 1
        else:
            print(f"⚠️  Already exists: {agent['agent_id']}")
            print()
    
    print("=" * 60)
    print(f"🎉 Registration Complete!")
    print(f"   Total Registered: {registered_count}/{len(agents)}")
    print(f"   Registry Location: agents/orchestrator-agent/agent_registry.json")
    print("=" * 60)
    
    # Show all registered agents
    all_agents = agent_manager.get_all_agents()
    print(f"\n📊 Total Agents in Registry: {len(all_agents)}")
    
    # Group by service type
    service_types = {}
    for agent in all_agents:
        stype = agent['service_type']
        if stype not in service_types:
            service_types[stype] = []
        service_types[stype].append(agent['agent_id'])
    
    print("\n📋 Agents by Service Type:")
    for stype, agent_ids in service_types.items():
        print(f"   {stype}: {len(agent_ids)} agent(s)")
        for aid in agent_ids:
            print(f"      - {aid}")
    
    print("\n✅ You can now use the Web UI - agents will be visible!")
    print(f"   Visit: https://web-ui-cyan-omega.vercel.app")

if __name__ == "__main__":
    try:
        register_demo_agents()
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

