# 🤖 Flipkart AI Customer Support Assistant

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen?style=for-the-badge&logo=github)](https://hari-krishnan427.github.io/customer-supportbot/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5/CSS3](https://img.shields.io/badge/UI-HTML5%20%2F%20CSS3-blue?style=for-the-badge&logo=html5)](https://w3.org)

An interactive e-commerce **Customer Support Assistant** designed for automated query resolution, order tracking, returns, refunds, and e-commerce helpdesk support.

🔗 **Live Web Application:** [https://hari-krishnan427.github.io/customer-supportbot/](https://hari-krishnan427.github.io/customer-supportbot/)

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
│   ├── script.js                   # Asynchronous API fetch & fallback handler
│   └── flipkart_100_queries.jsonl  # Dataset fallback
├── .gitignore
└── README.md
```

---

## 🛠️ Key Features

- ⚡ **Instant Query Resolution**: Real-time response matching for 100+ common Flipkart support scenarios (orders, delivery delays, cancellations, refunds, gift cards, payments).
- 🎨 **Modern Glassmorphism UI**: High-converting, responsive chat interface with smooth scrolling and animations.
- 🌐 **Zero-Dependency Cloud Hosting**: Hosted live via GitHub Pages for instant browser access on mobile & desktop.

---

## 🚀 Setup & Execution

### 1. Web Application (Live)
Simply visit [https://hari-krishnan427.github.io/customer-supportbot/](https://hari-krishnan427.github.io/customer-supportbot/) directly in your browser.

### 2. Local Development
```bash
git clone https://github.com/hari-krishnan427/customer-supportbot.git
cd customer-supportbot
```
Open `index.html` directly in any web browser!
