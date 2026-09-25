# PromptSphere

AI-powered multi-LLM platform for comparing responses from multiple language models and selecting the most relevant output.

PromptSphere provides a unified interface for interacting with multiple LLM providers, with separate modes for fast single-model responses and multi-model comparison.

---

## 🚀 Overview

PromptSphere is designed to improve the reliability and quality of AI-generated responses by querying multiple language models and applying response-selection logic.

The platform supports:

- Fast single-model generation
- Multi-model response comparison
- Structured response evaluation
- Multiple LLM providers through a unified interface

---

## ✨ Key Features

- 🤖 **Multi-LLM Integration** — OpenAI, Claude, and Mistral
- 🧠 **Response Selection** — evaluates multiple generated responses and selects a final answer
- ⚡ **Basic Mode** — uses a single LLM for faster responses
- 🚀 **Pro Mode** — queries multiple models and compares their responses
- 📊 **Structured Evaluation** — processes and evaluates model outputs
- 🔌 **Unified API** — provides a consistent interface across different LLM providers

---

## 🧠 How It Works

```text
User Prompt
     │
     ▼
┌─────────────────┐
│   PromptSphere  │
└────────┬────────┘
         │
    ┌────┴─────┐
    │          │
 Basic Mode  Pro Mode
    │          │
    ▼          ▼
 Single LLM  Multiple LLMs
               │
       ┌───────┼────────┐
       ▼       ▼        ▼
    OpenAI   Claude   Mistral
       │       │        │
       └───────┼────────┘
               ▼
      Response Evaluation
               │
               ▼
        Selected Answer
Request Flow
User submits a prompt.
PromptSphere determines the selected operating mode.
Basic Mode sends the request to a single LLM.
Pro Mode sends the request to multiple LLM providers.
Responses are collected and evaluated.
The selection logic determines the final response.
The selected answer is returned to the user.
🔌 LLM Integrations

PromptSphere currently integrates with:

OpenAI
Anthropic Claude
Mistral / OpenRouter

The application provides a unified interface for interacting with these providers.

⚙️ Tech Stack
Backend
Node.js
Express.js
REST APIs
AI
OpenAI API
Anthropic API
Mistral / OpenRouter
Multi-model response evaluation
📡 API
GET /ask

Generates a response using a single LLM.

Used by Basic Mode for faster response generation.

POST /api/compare-llms-smart

Queries multiple LLM providers and evaluates their responses.

Returns the selected answer together with the generated responses.

💡 Use Cases

PromptSphere can be used for:

Comparing outputs from different LLM providers
Improving AI response reliability
LLM experimentation and benchmarking
Building multi-model AI assistants
Evaluating different model responses for the same prompt
🛠️ Installation
1. Clone the repository
git clone https://github.com/rebeizantoine/promptsphere.git
cd promptsphere
2. Install dependencies
npm install
3. Configure environment variables

Create a .env file and add the required API credentials for the configured LLM providers.

OPENAI_API_KEY=
ANTHROPIC_API_KEY=
MISTRAL_API_KEY=
4. Start the application
npm start
📁 Project Structure
promptsphere/
├── ...
├── package.json
└── README.md

Update this section with the actual repository structure if you want to document the folders in detail.

🔐 Environment Variables

API keys should be stored in environment variables and never committed to the repository.

Required variables depend on which LLM integrations are enabled.

🎯 Project Goals

PromptSphere explores how multiple language models can be combined into a single application to improve response generation and evaluation.

The project focuses on:

Multi-LLM orchestration
API integration
Backend architecture
Response evaluation
AI application development
📌 Project Status

PromptSphere is an ongoing AI application project.

Future improvements can include more LLM providers, more advanced evaluation strategies, improved observability, and additional AI-powered workflows.

🔗 Links
GitHub: https://github.com/rebeizantoine/promptsphere
Portfolio: https://antoineportfolio.site

### One important thing

I deliberately **didn't invent technologies or features** that weren't in the README you gave me.

For example, your CV describes PromptSphere as supporting **Q&A, document generation, natural-language CSV analysis, smart email generation, and coding challenges**. :contentReference[oaicite:0]{index=0}

But the repository README you pasted doesn't document those features. **Before we add them to the README, we should verify that they're actually in this repository.**

Also, I changed the clone URL to your actual repository:

```bash
git clone https://github.com/rebeizantoine/promptsphere.git
