# PromptSphere Frontend

PromptSphere Frontend is a React-based web application that provides a user-friendly interface for interacting with AI-powered tools, document intelligence features, and content generation workflows.

The application serves as the client layer of the PromptSphere platform, allowing users to analyze documents, compare AI model responses, generate content, and interact with multiple AI services through a modern web interface.

---

## Features

### AI Assistant

- Ask questions using AI-powered endpoints
- Fast and responsive interface
- Structured and readable responses
- Multi-language support

### PDF Intelligence

- Upload PDF documents
- Ask questions about uploaded files
- AI-generated summaries and insights
- Document question-answering workflows

### CSV Analysis

- Upload CSV datasets
- Explore structured data
- Generate AI-assisted explanations and insights

### Multi-LLM Comparison

- Compare responses from multiple AI models
- Evaluate model strengths and weaknesses
- Side-by-side response comparison

### Email Draft Generator

- Generate professional emails
- Convert key points into polished drafts
- Business-friendly formatting

### Coding Exercise Generator

- Generate programming exercises
- Select language and difficulty level
- Receive solutions and explanations
- Includes test cases and expected outputs

### Admin Dashboard

- Secure admin authentication
- Protected administrative routes
- Platform monitoring capabilities

### API Documentation Access

- Integrated access to Swagger documentation
- Simplified backend testing and exploration

---

## Technology Stack

### Frontend Framework

- React
- JavaScript

### API Communication

- Axios
- Fetch API

### Routing

- React Router

### Styling

- CSS
- Responsive Design

### Backend Integration

- Express.js API
- MongoDB
- OpenAI
- OpenRouter
- Redis
- BullMQ

---

## Architecture Overview

```text
User
  │
  ▼
React Frontend
  │
  ▼
Express Backend
  │
  ├── OpenAI
  ├── OpenRouter
  ├── MongoDB
  └── Redis / BullMQ
```

---

## Main Application Modules

### AI Chat

General-purpose AI interaction and prompt processing.

### PDF Analysis

Upload PDF files and ask questions about document content.

### CSV Analysis

Analyze structured datasets using AI.

### Email Drafting

Generate professional email drafts from user input.

### Exercise Generator

Generate coding exercises with varying difficulty levels.

### Model Comparison

Compare outputs from multiple AI models.

### Administration

Manage and monitor platform functionality.

---

## Project Structure

```text
src/
├── components/
├── pages/
├── services/
├── hooks/
├── context/
├── utils/
├── assets/
└── App.js
```

---

## Getting Started

### Clone Repository

```bash
git clone <repository-url>
cd promptsphere-frontend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
REACT_APP_API_URL=http://localhost:8000
```

### Start Development Server

```bash
npm start
```

The application will be available at:

```text
http://localhost:3000
```

---

## Backend Requirements

The frontend requires the PromptSphere Backend API to be running.

Default backend endpoint:

```text
http://localhost:8000
```

Swagger documentation:

```text
http://localhost:8000/api-docs
```

---

## Current Capabilities

- AI question answering
- PDF question answering
- CSV analysis
- Email generation
- Coding exercise generation
- Multi-model comparison
- Admin authentication
- API health monitoring

---

## Future Roadmap

- User accounts
- Chat history
- Usage analytics
- Dark mode
- Model selection interface
- Retrieval-Augmented Generation (RAG)
- Vector search integration
- Dashboard insights
- Real-time notifications
- Advanced document workflows

---

## Author

**Antoine Rebeiz**

Full Stack Developer focused on AI applications, SaaS platforms, cloud technologies, automation systems, and modern web development.
