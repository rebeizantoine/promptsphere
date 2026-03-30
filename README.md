# PromptSphere AI Platform

Multi-LLM orchestration system that compares responses from multiple AI models and selects the most relevant answer.

---

## 🚀 Overview

PromptSphere is an AI-powered backend system designed to interact with multiple large language models simultaneously and intelligently choose the best response.

It is built to improve reliability, quality, and performance of AI-generated outputs by leveraging multiple providers.

---

## ✨ Key Features

- 🤖 Multi-LLM integration (OpenAI, Claude, Mistral)
- 🧠 Smart response selection logic
- ⚡ Fast single-model response (Basic mode)
- 🚀 Multi-model comparison (Pro mode)
- 📊 Structured response evaluation
- 🔄 Unified API interface for different providers

---

## 🧠 Architecture

### Core Flow

1. User sends a prompt
2. System routes request:
   - Basic mode → single LLM (fast)
   - Pro mode → multiple LLMs
3. Responses are collected
4. Selection logic chooses best answer
5. Final response is returned to user

---

## 🔌 Integrations

- OpenAI API
- Anthropic (Claude)
- Mistral / OpenRouter

---

## ⚙️ Tech Stack

- Node.js
- Express
- REST API
- External LLM APIs

---

## 📡 API Endpoints

### `/ask`
- Fast response using single LLM

### `/api/compare-llms-smart`
- Calls multiple LLMs
- Returns bestAnswer + all responses

---

## 🚀 Use Cases

- AI answer reliability improvement
- LLM benchmarking
- Smart AI assistants
- Multi-model decision systems

---

## ⚙️ Installation

```bash
git clone https://github.com/rebeizantoine/promptsphere-ai-platform.git
cd promptsphere-ai-platform
npm install
