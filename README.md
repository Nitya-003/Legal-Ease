# 📋 LegalEase

### *AI-Powered Legal Document Simplification & Risk Analysis Platform!*

---

## ✨ Overview

**LegalEase** transforms complex legal jargon into plain English with AI-powered document simplification, risk detection, and smart clause analysis — all wrapped in a clean web UI.

---

## 🚀 Features

### 🤖 AI-Powered Document Simplification

* GPT-4 Turbo integration for plain-English legal summaries  
* Multi-level explanations (Basic, Intermediate, Expert)  
* Intelligent analogies to explain complex legal terms  

### 🔍 Risk Detection & Analysis

* Claude 3.5 Sonnet-powered risk categorization  
* Visual risk charts using Chart.js  
* Severity ratings and AI-suggested mitigations  

### 💬 Interactive Q&A Chat

* GPT-3.5 Turbo-driven contextual Q&A  
* Clause-specific responses and analogies  
* Persistent conversation history (SQLite for now)  

### 📊 Document Management

* Upload, view, and track analyzed documents  
* Risk dashboards with filters and search  
* Export reports as PDF or TXT  

### 🔒 Privacy & Security

* Local data storage (SQLite / PostgreSQL ready)  
* Optional anonymization before AI processing  
* Flask session-based authentication  

---

## 🛠️ Tech Stack

| Layer          | Technology                                        |
| -------------- | ------------------------------------------------- |
| Backend        | **Python Flask**                                  |
| Frontend       | **HTML5, CSS3, JavaScript, Bootstrap 5**          |
| AI Integration | GPT-4 Turbo, GPT-3.5 Turbo, Claude 3.5 Sonnet     |
| Database       | SQLite (default), PostgreSQL (optional)           |
| Visualization  | Chart.js                                          |
| Styling        | Tailwind CSS-like theme with teal & cream palette |

---

## ⚙️ Getting Started

### Prerequisites

* Python 3.10+  
* OpenAI API Key (and Anthropic Key optional)  

### Installation

```bash
git clone https://github.com/Nitya-003/legalease.git
cd legalease
pip install -r requirements.txt
```

### Environment Variables

**Create a `.env` file**

## Run the App

```bash
  python app.py
```
**Then open your browser at http://127.0.0.1:5000**

---

## 🤝 Contributing

**Contributions are welcome!**

- Fork the repo
- Create a new branch (feature/your-feature)
- Commit changes
- Open a Pull Request

---

## 📝 License

This project is licensed under the **Apache License 2.0** — see the `LICENSE` file for full terms and conditions.

---

# 👩‍💻 Made with ❤️ by the LegalEase Team
*Bringing simplicity to complexity, one clause at a time.*

