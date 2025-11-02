# 💼 Invoice Automation Frontend

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)
![Azure Static Web Apps](https://img.shields.io/badge/Azure-Static%20Web%20Apps-0078D4?logo=microsoftazure)
![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-red)

A modern React + TypeScript frontend for the **Invoice Automation App**, designed for deployment on **Azure Static Web Apps**.  
This client provides a responsive, secure, and streamlined interface for managing invoice workflows, approvals, and AI‑powered automation features.

---

## 📦 Overview

The **Invoice Automation Frontend** serves as the presentation layer for the overall **Invoice Automation System**, which integrates:
- 🧩 **Azure Functions backend** (Durable Functions orchestrator)
- 🧠 **Microsoft Graph API** for mailbox and metadata operations
- 🗄️ **Cosmos DB** for invoice storage and vector search
- 💬 **Adaptive Cards** for approval workflows
- 📊 **Document Intelligence (AI)** for invoice parsing

This frontend allows authenticated users to review, approve, and manage invoice data pulled from backend APIs in real time.

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend Framework | [React 18](https://react.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Build Tool | [Vite](https://vitejs.dev/) |
| Deployment | [Azure Static Web Apps](https://learn.microsoft.com/azure/static-web-apps/) |
| UI Components | [React‑Bootstrap](https://react-bootstrap.github.io/) + custom layouts |
| Auth Integration | Microsoft Entra ID (MSAL) |
| API Communication | REST endpoints (Azure Functions backend) |

---

## ✨ Key Features

- 📄 Displays parsed invoice data and metadata in responsive views  
- 🔄 Syncs with backend via secure API endpoints  
- 🧾 Supports user authentication and session management via MSAL  
- 📂 Tabbed navigation for invoices, approvals, and workspace organization  
- ⚙️ Extensible modular structure for future pages and layouts  
- 🌐 Built for CI/CD through **GitHub Actions → Azure Static Web Apps**

---

## 🗂️ Project Structure

```
invoice-automation-frontend/
├── src/
│   ├── components/        # Shared UI elements (Navbar, Buttons, PDF viewer, etc.)
│   ├── layouts/           # Reusable layout containers for different sections
│   ├── pages/             # Dashboard, Invoice List, Invoice Detail, Support, etc.
│   ├── hooks/             # Custom React hooks for user context and DOM utilities
│   ├── helpers/           # Utility functions like title cleaners
│   ├── types/             # TypeScript type definitions
│   ├── assets/            # Static assets (icons, logos)
│   ├── App.tsx            # Main React component
│   └── main.tsx           # Entry point
├── public/
│   ├── favicon.png
│   ├── pdf.worker.min.mjs
│   └── vite.svg
├── vite.config.ts         # Vite configuration
├── staticwebapp.config.json # Azure Static Web Apps routing/auth rules
├── package.json
└── .github/
    └── workflows/
        └── azure-static-web-apps-<env>.yml  # CI/CD pipeline
```

---

## ⚙️ Setup & Development

### 🧩 Prerequisites

- **Node.js 18+**
- **npm** or **pnpm**

### 🚀 Install Dependencies

```bash
npm install
```

### 🧠 Run in Development Mode

```bash
npm run dev
```

This starts the Vite dev server (default: [http://localhost:5173](http://localhost:5173)).

### 🏗️ Build for Production

```bash
npm run build
```

The output will be generated in the `dist/` folder.

---

## ☁️ Deployment (Azure Static Web Apps)

This project is preconfigured for automated deployment using **GitHub Actions**.

### 🔁 CI/CD Workflow

Each push to the `main` or `feature/*` branch triggers:
1. `npm ci` → install dependencies  
2. `npm run build` → create optimized production build  
3. Deploys automatically to the connected **Azure Static Web App** instance

Config file: `.github/workflows/azure-static-web-apps-*.yml`

For manual deployment, you can also run:
```bash
npm run build
npx swa deploy ./dist --env production
```

---

## 🔐 Environment Variables

To connect with the backend securely, define the following in your Azure portal or `.env` (for local testing):

```
VITE_API_BASE_URL=<Your Azure Function API URL>
VITE_MSAL_CLIENT_ID=<Your Entra App Client ID>
VITE_TENANT_ID=<Your Tenant ID>
```

These are injected at build time by Vite.

---

## 🧑‍💻 Contributing

This project is proprietary and closed-source.  
Contributions are not accepted at this time, but forks for learning or private testing are welcome.

---

## 🪪 License

**All Rights Reserved © 2025 Nelson Chicas**

This source code is proprietary and may not be redistributed, modified, or used commercially without written permission.

---

## 📸 Screenshots (Optional)

```markdown
![Dashboard View](https://raw.githubusercontent.com/nchicas224/invoice-automation-frontend/main/assets/screenshots/dashboard.png)
![Invoice Detail](https://raw.githubusercontent.com/nchicas224/invoice-automation-frontend/main/assets/screenshots/invoice-detail.png)
![Workspace Layout](https://raw.githubusercontent.com/nchicas224/invoice-automation-frontend/main/assets/screenshots/workspace.png)
```

---

*Part of the complete Invoice Automation System — integrating Azure Functions, Cosmos DB, Graph API, and AI‑driven document analysis.*
