# 🛡️ Software Risk Analyzer

> Identify, classify, and manage software project risks — powered by AI.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-3-22C55E?style=flat-square)
![Claude AI](https://img.shields.io/badge/Claude-AI%20Powered-8B5CF6?style=flat-square)

---

## 📌 Overview

**Software Risk Analyzer** is a React + Vite web application that helps project managers and developers assess the risk profile of a software project. Input your project details and the app computes risk scores across six dimensions, visualizes them with interactive charts, and lets you consult an AI for tailored mitigation strategies.

---

## ✨ Features

- **Risk Engine** — Automatically calculates risk scores across 6 categories based on your project inputs
- **Interactive Dashboard** — Radar chart and bar chart visualizations powered by Recharts
- **AI Risk Consultant** — Ask Claude AI for summaries, mitigation strategies, timeline advice, and custom questions
- **Three-tab UX** — Clean flow from Project Input → Risk Dashboard → AI Analysis
- **Dark UI** — Fully dark-themed interface with color-coded risk levels (🔴 High / 🟡 Medium / 🟢 Low)

---

## 🧩 Risk Categories

| Category | What It Measures |
|---|---|
| 📅 Schedule | Team size, methodology, and project duration |
| 💰 Budget | Cost overrun potential based on budget and complexity |
| ⚙️ Technical | New technology adoption and system complexity |
| 👥 Resource | Team size and experience level |
| 📋 Requirements | Clarity and completeness of project requirements |
| 🔒 Security | Security/compliance needs and associated vulnerabilities |

Each risk is scored from 0–100 as `probability × impact × 100` and classified as **Low**, **Medium**, or **High**.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/software-risk-analyzer.git
cd software-risk-analyzer

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build       # Outputs to dist/
npm run preview     # Preview the production build locally
```

### Lint

```bash
npm run lint
```

---

## 📁 Project Structure

```
software-risk-analyzer/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── AIAnalysis.jsx      # AI consultant tab — Claude API integration
│   │   ├── Dashboard.jsx       # Risk dashboard with charts and risk cards
│   │   ├── InputForm.jsx       # Project input form
│   │   └── RiskCard.jsx        # Individual risk card component
│   ├── App.jsx                 # Root component + risk computation engine
│   ├── App.css                 # Global styles and design tokens
│   ├── index.css               # Base reset
│   └── main.jsx                # Entry point
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## 🤖 AI Integration

The **AI Analysis** tab connects directly to the [Anthropic Claude API](https://www.anthropic.com) (`claude-sonnet-4-20250514`). It sends your project profile and computed risk scores as context, then answers questions like:

- 🔍 Summarize all risks
- 🛡️ Suggest mitigation strategies
- 📅 Recommend sprint/timeline planning
- 💡 Give an overall project health assessment
- ✏️ Answer any custom question you type

> No API key setup is required in development — the key is handled by the proxy layer.

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| [React](https://react.dev) | 19 | UI framework |
| [Vite](https://vite.dev) | 8 | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Utility-first styling |
| [Recharts](https://recharts.org) | 3 | Radar & bar chart visualizations |
| [Claude API](https://www.anthropic.com) | claude-sonnet-4 | AI risk consultation |
| [ESLint](https://eslint.org) | 9 | Linting with React Hooks rules |

---

## 🔮 Roadmap

- [ ] Export risk report as PDF
- [ ] Save and compare multiple projects
- [ ] TypeScript migration
- [ ] Historical risk trend tracking
- [ ] Team collaboration / shared projects

---

## 📄 License

ISC © 2025

---

> Built with ⚡ Vite + ⚛️ React + 🤖 Claude AI
