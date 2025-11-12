"""
Professional Agent Registry Manager
Manages agent registration, updates, and queries
"""
import json
import os
from datetime import datetime
from typing import List, Dict, Optional

REGISTRY_FILE = "agent_registry.json"

class AgentManager:
    def __init__(self):
        self.registry_path = os.path.join(os.path.dirname(__file__), REGISTRY_FILE)
        self._ensure_registry_exists()
    
    def _ensure_registry_exists(self):
        """Ensure registry file exists"""
        if not os.path.exists(self.registry_path):
            default_registry = {
                "agents": [],
                "metadata": {
                    "version": "1.0.0",
                    "last_updated": datetime.utcnow().isoformat() + "Z",
                    "total_agents": 0
                }
            }
            self._save_registry(default_registry)
    
    def _load_registry(self) -> Dict:
        """Load registry from file"""
        try:
            with open(self.registry_path, 'r') as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading registry: {e}")
            return {"agents": [], "metadata": {}}
    
    def _save_registry(self, registry: Dict):
        """Save registry to file"""
        try:
            registry["metadata"]["last_updated"] = datetime.utcnow().isoformat() + "Z"
            registry["metadata"]["total_agents"] = len(registry.get("agents", []))
            
            with open(self.registry_path, 'w') as f:
                json.dump(registry, f, indent=2)
        except Exception as e:
            print(f"Error saving registry: {e}")
    
    def get_all_agents(self) -> List[Dict]:
        """Get all registered agents"""
        registry = self._load_registry()
        return registry.get("agents", [])
    
    def get_agent_by_id(self, agent_id: str) -> Optional[Dict]:
        """Get specific agent by ID"""
        agents = self.get_all_agents()
        for agent in agents:
            if agent.get("agent_id") == agent_id:
                return agent
        return None
    
    def get_agents_by_service_type(self, service_type: str) -> List[Dict]:
        """Get agents filtered by service type"""
        agents = self.get_all_agents()
        return [a for a in agents if a.get("service_type") == service_type]
    
    def register_agent(self, agent_data: Dict) -> bool:
        """Register a new agent"""
        try:
            registry = self._load_registry()
            
            # Check if agent already exists
            existing = self.get_agent_by_id(agent_data.get("agent_id"))
            if existing:
                print(f"Agent {agent_data.get('agent_id')} already exists")
                return False
            
            # Add timestamp if not provided
            if "registered_at" not in agent_data:
                agent_data["registered_at"] = datetime.utcnow().isoformat() + "Z"
            
            # Set defaults
            if "reputation_score" not in agent_data:
                agent_data["reputation_score"] = 100
            if "total_successful_txs" not in agent_data:
                agent_data["total_successful_txs"] = 0
            if "total_failed_txs" not in agent_data:
                agent_data["total_failed_txs"] = 0
            if "status" not in agent_data:
                agent_data["status"] = "active"
            
            registry["agents"].append(agent_data)
            self._save_registry(registry)
            
            print(f"✅ Agent {agent_data.get('agent_id')} registered successfully")
            return True
            
        except Exception as e:
            print(f"Error registering agent: {e}")
            return False
    
    def update_agent_reputation(self, agent_id: str, success: bool) -> bool:
        """Update agent reputation after transaction"""
        try:
            registry = self._load_registry()
            agents = registry.get("agents", [])
            
            for agent in agents:
                if agent.get("agent_id") == agent_id:
                    if success:
                        agent["reputation_score"] = agent.get("reputation_score", 100) + 1
                        agent["total_successful_txs"] = agent.get("total_successful_txs", 0) + 1
                    else:
                        # Decrease reputation for failures
                        current_rep = agent.get("reputation_score", 100)
                        agent["reputation_score"] = max(0, current_rep - 5)
                        agent["total_failed_txs"] = agent.get("total_failed_txs", 0) + 1
                    
                    agent["last_updated"] = datetime.utcnow().isoformat() + "Z"
                    self._save_registry(registry)
                    
                    print(f"✅ Updated reputation for {agent_id}: {agent['reputation_score']}")
                    return True
            
            print(f"❌ Agent {agent_id} not found")
            return False
            
        except Exception as e:
            print(f"Error updating reputation: {e}")
            return False
    
    def update_agent_status(self, agent_id: str, status: str) -> bool:
        """Update agent status (active/inactive/maintenance)"""
        try:
            registry = self._load_registry()
            agents = registry.get("agents", [])
            
            for agent in agents:
                if agent.get("agent_id") == agent_id:
                    agent["status"] = status
                    agent["last_updated"] = datetime.utcnow().isoformat() + "Z"
                    self._save_registry(registry)
                    
                    print(f"✅ Updated status for {agent_id}: {status}")
                    return True
            
            return False
            
        except Exception as e:
            print(f"Error updating status: {e}")
            return False
    
    def get_best_agent(self, service_type: str) -> Optional[Dict]:
        """Get best agent by reputation for a service type"""
        agents = self.get_agents_by_service_type(service_type)
        
        # Filter only active agents
        active_agents = [a for a in agents if a.get("status") == "active"]
        
        if not active_agents:
            return None
        
        # Sort by reputation score (descending)
        sorted_agents = sorted(
            active_agents,
            key=lambda x: x.get("reputation_score", 0),
            reverse=True
        )
        
        return sorted_agents[0] if sorted_agents else None
    
    def get_registry_stats(self) -> Dict:
        """Get registry statistics"""
        agents = self.get_all_agents()
        
        if not agents:
            return {
                "total_agents": 0,
                "active_agents": 0,
                "total_transactions": 0,
                "average_reputation": 0
            }
        
        active_agents = [a for a in agents if a.get("status") == "active"]
        total_txs = sum(
            a.get("total_successful_txs", 0) + a.get("total_failed_txs", 0)
            for a in agents
        )
        avg_rep = sum(a.get("reputation_score", 0) for a in agents) / len(agents)
        
        return {
            "total_agents": len(agents),
            "active_agents": len(active_agents),
            "total_transactions": total_txs,
            "average_reputation": round(avg_rep, 2)
        }

# Global instance
agent_manager = AgentManager()

