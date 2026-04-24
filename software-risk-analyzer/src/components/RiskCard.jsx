export default function RiskCard({ risk }) {
  return (
    <div className={`risk-card ${risk.level}`}>
      <div className={`risk-label ${risk.level}`}>
        {risk.level === 'high' ? '🔴' : risk.level === 'medium' ? '🟡' : '🟢'} {risk.level} risk
      </div>
      <div className="risk-name">{risk.name}</div>
      <div className="risk-desc">{risk.description}</div>
      <div className="risk-meta">
        <span className="risk-pill prob">Prob: {Math.round(risk.probability * 100)}%</span>
        <span className="risk-pill impact">Impact: {Math.round(risk.impact * 100)}%</span>
      </div>
    </div>
  )
}