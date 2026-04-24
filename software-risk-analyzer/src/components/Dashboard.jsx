import RiskCard from './RiskCard'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const COLORS = { high: '#ef4444', medium: '#f59e0b', low: '#22c55e' }

export default function Dashboard({ risks, projectData }) {
  if (!risks || risks.length === 0) {
    return (
      <div className="empty-state">
        <div className="icon">📊</div>
        <p>No data yet. Fill in the Project Input tab and click Analyze Risks.</p>
      </div>
    )
  }

  const highCount = risks.filter(r => r.level === 'high').length
  const medCount = risks.filter(r => r.level === 'medium').length
  const lowCount = risks.filter(r => r.level === 'low').length
  const overallScore = Math.round(risks.reduce((a, r) => a + r.score, 0) / risks.length)
  const overall = overallScore >= 40 ? 'high' : overallScore >= 20 ? 'medium' : 'low'

  const radarData = risks.map(r => ({ subject: r.category, score: r.score, fullMark: 100 }))
  const barData = risks.map(r => ({ name: r.name.replace(' Risk', ''), score: r.score, level: r.level }))

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 600 }}>{projectData?.projectName}</div>
        <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 3 }}>
          {projectData?.teamSize} members · {projectData?.duration} months · {projectData?.methodology}
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card"><div className="stat-label">Overall Score</div><div className={`stat-value ${overall}`}>{overallScore}</div></div>
        <div className="stat-card"><div className="stat-label">High Risks</div><div className="stat-value high">{highCount}</div></div>
        <div className="stat-card"><div className="stat-label">Medium Risks</div><div className="stat-value medium">{medCount}</div></div>
        <div className="stat-card"><div className="stat-label">Low Risks</div><div className="stat-value low">{lowCount}</div></div>
      </div>

      <div className="charts-row">
        <div className="card">
          <div className="card-title"><span>🕸️</span> Risk Radar</div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#2e3347" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#8b90a7', fontSize: 11 }} />
              <Radar dataKey="score" stroke="#6c63ff" fill="#6c63ff" fillOpacity={0.25} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="card-title"><span>📊</span> Risk Scores</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} margin={{ left: -10 }}>
              <XAxis dataKey="name" tick={{ fill: '#8b90a7', fontSize: 10 }} />
              <YAxis domain={[0, 100]} tick={{ fill: '#8b90a7', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#1a1d27', border: '1px solid #2e3347', borderRadius: 8, fontSize: 12 }} cursor={{ fill: '#ffffff08' }} />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {barData.map((entry, i) => <Cell key={i} fill={COLORS[entry.level]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card-title" style={{ marginBottom: 14 }}><span>🃏</span> All Identified Risks</div>
      <div className="risk-grid">
        {risks.sort((a, b) => b.score - a.score).map(r => <RiskCard key={r.id} risk={r} />)}
      </div>
    </div>
  )
}