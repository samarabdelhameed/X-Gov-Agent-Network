#!/usr/bin/env python3
"""
Flask API Server for X-Gov Orchestrator Agent
Exposes REST API for Web UI to trigger orchestration with REAL x402 payments
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import asyncio
import sys
from main import orchestrate_task

app = Flask(__name__)
CORS(app)  # Enable CORS for Web UI

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'X-Gov Orchestrator Agent',
        'mode': 'PRODUCTION (Real LLM + Real x402)',
        'version': '1.0.0'
    })

@app.route('/api/orchestrate', methods=['POST'])
def orchestrate():
    """
    Main orchestration endpoint - Triggers COMPLETE x402 workflow
    
    Request:
    {
        "task": "User task description"
    }
    
    Response:
    {
        "success": true,
        "results": {
            "Task Name": {
                "success": true,
                "agent": "DataScraper_Pro_v1",
                "reputation": 125,
                "payment_tx": "5K7mNpQ8xYz... (REAL Solana signature)",
                "validation_tx": "ValidationTx_... (REAL Solana signature)",
                "amount_paid_sol": 0.005,
                "service_data": {...}
            }
        }
    }
    """
    try:
        data = request.get_json()
        
        if not data or 'task' not in data:
            return jsonify({
                'success': False,
                'error': 'Missing "task" field in request body'
            }), 400
        
        user_task = data['task']
        
        print(f"\n{'='*80}")
        print(f"📥 API REQUEST: Orchestrate Task")
        print(f"   Task: {user_task[:100]}...")
        print(f"{'='*80}\n")
        
        # Execute REAL orchestration with x402 payments
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        results = loop.run_until_complete(orchestrate_task(user_task))
        loop.close()
        
        # Check if at least one task succeeded
        success = any(r.get('success', False) for r in results.values())
        
        # Get first successful task for simple response
        first_success = next((r for r in results.values() if r.get('success')), None)
        
        if first_success:
            return jsonify({
                'success': True,
                'agent': first_success.get('agent'),
                'reputation': first_success.get('reputation'),
                'paymentTx': first_success.get('payment_tx'),
                'validationTx': first_success.get('validation_tx'),
                'data': first_success.get('service_data'),
                'results': results
            })
        else:
            return jsonify({
                'success': False,
                'error': 'All tasks failed',
                'results': results
            }), 500
            
    except Exception as e:
        import traceback
        print(f"\n🚨 API ERROR:")
        traceback.print_exc()
        
        return jsonify({
            'success': False,
            'error': str(e),
            'traceback': traceback.format_exc()
        }), 500

@app.route('/api/agents', methods=['GET'])
def list_agents():
    """
    List all registered agents from Professional Agent Registry
    """
    try:
        from agent_manager import agent_manager
        
        # Get all agents from professional registry
        all_agents = agent_manager.get_all_agents()
        
        # Get registry stats
        stats = agent_manager.get_registry_stats()
        
        return jsonify({
            'success': True,
            'total': len(all_agents),
            'agents': all_agents,
            'stats': stats
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/agents/stats', methods=['GET'])
def get_agent_stats():
    """
    Get agent registry statistics
    """
    try:
        from agent_manager import agent_manager
        
        stats = agent_manager.get_registry_stats()
        
        return jsonify({
            'success': True,
            'stats': stats
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    print("""
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║  🤖  X-Gov Orchestrator Agent - API Server                  ║
║                                                              ║
║  Mode: PRODUCTION                                            ║
║  - Real LLM (GPT-4o-mini) for task decomposition            ║
║  - Real x402 payment execution on Solana                     ║
║  - Real blockchain verification                              ║
║                                                              ║
║  Endpoints:                                                  ║
║    GET  /health              - Health check                  ║
║    POST /api/orchestrate     - Execute orchestration         ║
║    GET  /api/agents          - List all agents               ║
║                                                              ║
║  Port: 5000                                                  ║
║  Web UI: http://localhost:3000                               ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
    """)
    
    # Run without debug mode to avoid termios issues when running in background
    app.run(
        host='0.0.0.0',
        port=5001,
        debug=False,
        threaded=True,
        use_reloader=False
    )

