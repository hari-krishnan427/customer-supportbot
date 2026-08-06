# 🤖 Flipkart AI Customer Support Bot

A full-stack AI-powered Customer Support Assistant built with **Flask**, **HTML5/CSS3/JavaScript**, and **Ollama LLM** integration. Designed for automated e-commerce query resolution, order tracking support, and instant customer service response.

---

## 📁 Architecture Overview

```
customer-supportbot/
├── backend/                        # Python Flask API Server
│   ├── app.py                      # REST API routes & similarity matcher
│   ├── flipkart_100_queries.jsonl  # E-commerce query-response dataset
│   ├── Modelfile                   # Ollama custom system prompt definition
│   └── requirements.txt            # Backend Python dependencies
├── frontend/                       # Web Chatbot Interface
│   ├── index.html                  # Responsive chat interface layout
│   ├── style.css                   # Glassmorphism design system & CSS styling
│   ├── script.js                   # Asynchronous API fetch handler
│   └── flipkart_100_queries.jsonl  # Dataset fallback
├── .gitignore
└── README.md
```

---

## 🛠️ Prerequisites & Setup

### 1. Python Environment Setup
Ensure Python 3.10+ is installed:
```bash
python --version
```

### 2. Install Dependencies
Navigate to the backend directory and install required Python packages:
```bash
cd backend
pip install -r requirements.txt
```

---

## 🚀 Running the Project

### Backend (Python Flask Server)
Start the backend server on `http://localhost:5000`:
```bash
cd backend
python app.py
```
- Health Check Endpoint: `http://localhost:5000/api/health`
- Chat API Endpoint: `POST http://localhost:5000/api/chat`

### Frontend (Interactive UI)
Open `frontend/index.html` directly in any web browser, or serve it using a simple local server:
```bash
cd frontend
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

---

## ⚙️ Features & Architecture

- **Intelligent Response Engine**: Instant matching against 100+ common Flipkart customer support scenarios.
- **Ollama LLM Fallback**: Direct integration with local Ollama models (`flipkart-bot` / `llama3`).
- **RESTful API Architecture**: Decoupled Flask backend with CORS enabled for web frontends.
- **Modern Glassmorphism UI**: High-converting, responsive chat widget with smooth scrolling and animations.
