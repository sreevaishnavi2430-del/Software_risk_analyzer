import { useState } from 'react'
import './App.css'
import InputForm from './components/InputForm'
import Dashboard from './components/Dashboard'
import AIAnalysis from './components/AIAnalysis'

export default function App() {
  const [tab, setTab] = useState('input')
  const [projectData, setProjectData] = useState(null)
  const [risks, setRisks] = useState([])

  const handleAnalyze = (data) => {
    const computed = computeRisks(data)
    setProjectData(data)
    setRisks(computed)
    setTab('dashboard')
  }

  return (
    <div className="app-wrapper">
      <div className="app-header">
        <div>
          <h1>Software Risk Analyzer</h1>
          <p>Identify, classify and manage project risks with AI</p>
        </div>
        <span className="badge">AI Powered</span>
      </div>

      <div className="tabs">
        <button className={`tab-btn ${tab === 'input' ? 'active' : ''}`} onClick={() => setTab('input')}>
          Project Input
        </button>
        <button className={`tab-btn ${tab === 'dashboard' ? 'active' : ''}`} onClick={() => setTab('dashboard')}>
          Risk Dashboard
        </button>
        <button className={`tab-btn ${tab === 'ai' ? 'active' : ''}`} onClick={() => setTab('ai')}>
          AI Analysis
        </button>
      </div>

      {tab === 'input' && <InputForm onAnalyze={handleAnalyze} initial={projectData} />}
      {tab === 'dashboard' && <Dashboard risks={risks} projectData={projectData} />}
      {tab === 'ai' && <AIAnalysis risks={risks} projectData={projectData} />}
    </div>
  )
}

function computeRisks(data) {
  const risks = []

  const scheduleScore = (+data.teamSize < 3 ? 0.4 : 0) +
    (data.methodology === 'waterfall' ? 0.3 : 0) +
    (+data.duration > 12 ? 0.3 : +data.duration > 6 ? 0.15 : 0)
  risks.push({
    id: 'schedule',
    name: 'Schedule Risk',
    description: 'Risk of project delays due to team size, methodology, or timeline issues.',
    probability: Math.min(scheduleScore, 0.95),
    impact: +data.duration > 9 ? 0.8 : 0.5,
    category: 'Time',
  })

  const budgetScore = (+data.budget < 50000 ? 0.5 : +data.budget < 150000 ? 0.25 : 0.05) +
    (+data.teamSize > 8 ? 0.3 : 0) +
    (data.complexity === 'high' ? 0.25 : data.complexity === 'medium' ? 0.1 : 0)
  risks.push({
    id: 'budget',
    name: 'Budget Risk',
    description: 'Risk of cost overruns based on team size, budget, and project complexity.',
    probability: Math.min(budgetScore, 0.95),
    impact: +data.budget < 100000 ? 0.85 : 0.55,
    category: 'Cost',
  })

  const techScore = (data.complexity === 'high' ? 0.5 : data.complexity === 'medium' ? 0.25 : 0) +
    (data.techStack === 'new' ? 0.35 : data.techStack === 'partial' ? 0.15 : 0) +
    (+data.teamSize < 4 ? 0.15 : 0)
  risks.push({
    id: 'technical',
    name: 'Technical Risk',
    description: 'Risks arising from new or unfamiliar technology and high system complexity.',
    probability: Math.min(techScore, 0.95),
    impact: data.complexity === 'high' ? 0.9 : 0.6,
    category: 'Technology',
  })

  const resourceScore = (+data.teamSize < 3 ? 0.6 : +data.teamSize < 5 ? 0.3 : 0.1) +
    (data.experience === 'junior' ? 0.35 : data.experience === 'mixed' ? 0.15 : 0)
  risks.push({
    id: 'resource',
    name: 'Resource Risk',
    description: 'Risk due to insufficient team size or lack of experienced personnel.',
    probability: Math.min(resourceScore, 0.95),
    impact: +data.teamSize < 3 ? 0.85 : 0.5,
    category: 'People',
  })

  const reqScore = (data.requirements === 'unclear' ? 0.7 : data.requirements === 'partial' ? 0.35 : 0.1) +
    (data.methodology === 'waterfall' ? 0.2 : 0)
  risks.push({
    id: 'requirements',
    name: 'Requirements Risk',
    description: 'Risk from unclear, incomplete, or frequently changing requirements.',
    probability: Math.min(reqScore, 0.95),
    impact: data.requirements === 'unclear' ? 0.9 : 0.55,
    category: 'Scope',
  })

  const secScore = (data.hasSecurity === 'yes' ? 0.5 : 0.15) +
    (data.complexity === 'high' ? 0.2 : 0) +
    (data.techStack === 'new' ? 0.15 : 0)
  risks.push({
    id: 'security',
    name: 'Security Risk',
    description: 'Risk related to security vulnerabilities, data breaches, or compliance issues.',
    probability: Math.min(secScore, 0.95),
    impact: data.hasSecurity === 'yes' ? 0.85 : 0.4,
    category: 'Security',
  })

  return risks.map(r => ({
    ...r,
    level: riskLevel(r.probability, r.impact),
    score: Math.round(r.probability * r.impact * 100),
  }))
}

function riskLevel(prob, impact) {
  const score = prob * impact
  if (score >= 0.4) return 'high'
  if (score >= 0.15) return 'medium'
  return 'low'
}