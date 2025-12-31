
## How to Run Locally

### Frontend
1. Clone the frontend repository
2. Install dependencies:
 ```
 npm install
```

3. Start the development server:
   ```
   npm run dev
   ```
4. The frontend will run on:

   ```
   http://localhost:5173
   ```

---

### Backend

1. Clone the backend repository
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the backend server:

   ```bash
   npm run start
   ```
4. The backend will run on:

   ```
   http://localhost:5000
   ```

---

## Database Setup

### MongoDB

* This project uses **MongoDB**
* To run locally, ensure a MongoDB server is installed and running
* No migrations or seed scripts are required

Set the MongoDB connection string in the backend `.env` file:

```env
DB_URL=your_mongodb_connection_string
```

---

## Environment Variables

### Frontend `.env`

Create a `.env` file in the frontend root directory:

```env
VITE_BACKEND_URL=http://localhost:5000
```

---

### Backend `.env`

Create a `.env` file in the backend root directory:

```env
HUGGINGFACE_API_KEY=your_api_key
DB_URL=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
```

---

## Architecture Overview

This application follows a **clean client–server architecture** with clear separation between frontend, backend, database, and AI services.

### Frontend (React + Vite)

* Built with React for UI and state management
* Communicates with the backend via REST APIs (Axios)
* Manages chat state, user input, and UI updates
* Displays AI responses using Markdown
* Handles loading and typing indicators
* Uses environment-based configuration for backend URLs

---

### Backend (Node.js + Express)

* Exposes REST APIs for message handling and conversations
* Uses a modular architecture (routes → controllers → services → models)
* Handles business logic, AI interaction, and error management
* Integrates MongoDB for storing conversations and messages
* Connects to Hugging Face LLMs via an OpenAI-compatible client
* Manages CORS, environment variables, and security concerns

---

### Database & AI

* **MongoDB** stores conversation history and messages
* **Hugging Face Inference API** generates AI responses
* Conversation context is sent with each request for coherent replies

---

## Backend Structure

```
controllers/  → API logic  
services/     → AI & business logic  
models/       → MongoDB schemas  
routes/       → API routes  
utils/        → Helpers & LLM client  
```

* Controllers are thin and focused
* Services handle AI and business logic
* MongoDB provides flexible chat storage

---

## Design Decisions

* MongoDB (NoSQL) for scalable and flexible chat history
* Conversation-aware AI responses
* Graceful AI error handling (rate limits, downtime)
* Secure CORS configuration between frontend and backend

---

## LLM Notes

* **Provider:** Hugging Face Inference API
* **Model:** `meta-llama/Llama-3.1-8B-Instruct`

### Provider Choice

Although the OpenAI SDK is used in the codebase, **OpenAI is not the provider**.
It is used because Hugging Face exposes an **OpenAI-compatible API**, allowing easy model switching without changing core application logic.

---

## Prompting Strategy

The AI uses a **system-first, conversation-aware prompting strategy**:

1. **System Prompt**

   * Defines AI behavior, tone, formatting, and policy compliance

2. **Conversation Context**

   * Each user message is appended to the conversation history and sent with previous messages

3. **User Prompt**

   * User input is passed directly as a `user` role message without modification

---

## Trade-offs & Future Improvements

### Current Limitations

* No token usage tracking
* No streaming responses
* In-memory conversation context

---

### Planned Improvements

* Token and cost limits
* Conversation memory pruning
* Streaming responses (SSE / WebSockets)
* Improved context management using stored conversation history
* UI virtualization using observers to improve performance on large chats
* Support for document and image analysis
* More responsive UI
* Further modularization following industry standards
