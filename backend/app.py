from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import requests

app = Flask(__name__)
CORS(app)

QA_FILE = os.path.join(os.path.dirname(__file__), "flipkart_100_queries.jsonl")

# Load dataset
qa_pairs = []
if os.path.exists(QA_FILE):
    with open(QA_FILE, "r", encoding="utf-8") as f:
        for line in f:
            if line.strip():
                qa_pairs.append(json.loads(line.strip()))

def find_best_response(user_input):
    user_input_clean = user_input.strip().lower()
    
    # Exact / partial match in dataset
    for qa in qa_pairs:
        prompt = qa.get("prompt", "").strip().lower()
        if user_input_clean in prompt or prompt in user_input_clean:
            return qa.get("response")
            
    # Try Ollama endpoint if available locally
    try:
        ollama_res = requests.post("http://localhost:11434/api/generate", json={
            "model": "flipkart-bot",
            "prompt": user_input,
            "stream": False
        }, timeout=3)
        if ollama_res.status_code == 200:
            return ollama_res.json().get("response", "")
    except Exception:
        pass
        
    return "Thank you for reaching out to Flipkart Customer Support! How can I assist you with your order, return, or payment today?"

@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "online", "message": "Flipkart AI Customer Support Backend API"})

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy", "queries_loaded": len(qa_pairs)})

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json() or {}
    user_message = data.get("message") or data.get("prompt") or ""
    if not user_message:
        return jsonify({"error": "Empty message"}), 400
        
    response = find_best_response(user_message)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
