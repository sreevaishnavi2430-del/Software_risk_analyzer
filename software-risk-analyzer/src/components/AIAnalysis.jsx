import { useState } from 'react'

export default function AIAnalysis({ risks, projectData }) {
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [asked, setAsked] = useState(false)

  if (!risks || risks.length === 0) {
    return (
      <div className="empty-state">
        <div className="icon">🤖</div>
        <p>Please analyze a project first from the Project Input tab.</p>
      </div>
    )
  }

  const buildPrompt = (question) => {
    const riskSummary = risks.map(r =>
      `- ${r.name} [${r.level.toUpperCase()}]: probability ${Math.round(r.probability * 100)}%, impact ${Math.round(r.impact * 100)}%, score ${r.score}/100`
    ).join('\n')
    return `You are a software project risk management expert.\n\nProject: ${projectData.projectName}\nTeam: ${projectData.teamSize} people, ${projectData.experience} experience\nDuration: ${projectData.duration} months\nBudget: ${projectData.budget}\nComplexity: ${projectData.complexity}\nMethodology: ${projectData.methodology}\nTech Stack: ${projectData.techStack}\nRequirements: ${projectData.requirements}\nSecurity Needs: ${projectData.hasSecurity}\n\nRisks:\n${riskSummary}\n\nQuestion: ${question}\n\nGive a clear, actionable response with bullet points where helpful.`
  }

  const askAI = async (question) => {
    setLoading(true)
    setOutput('')
    setAsked(true)
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{ role: 'user', content: buildPrompt(question) }],
        }),
      })
      const data = await response.json()
      setOutput(data.content?.map(c => c.text || '').join('') || 'No response.')
    } catch {
      setOutput('Error connecting to AI. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const questions = [
    { label: '🔍 Summarize all risks', q: 'Summarize all the identified risks and their potential impact.' },
    { label: '🛡️ Mitigation strategies', q: 'What are the top mitigation strategies for the high and medium risks?' },
    { label: '📅 Timeline recommendations', q: 'Based on the risks, what timeline and sprint planning do you suggest?' },
    { label: '💡 Overall advice', q: 'What is your overall assessment and top 5 recommendations for success?' },
  ]

  return (
    <div>
      <div className="card section-gap">
        <div className="card-title"><span>🤖</span> AI Risk Consultant</div>
        <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 18, lineHeight: 1.6 }}>
          Ask the AI for detailed analysis based on your project's risk profile.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          {questions.map((q, i) => (
            <button key={i} className="analyze-btn"
              style={{ background: 'var(--bg3)', color: 'var(--text)', border: '1px solid var(--border)', fontSize: 13, padding: '9px 16px' }}
              onClick={() => askAI(q.q)} disabled={loading}>
              {q.label}
            </button>
          ))}
        </div>
        {loading && (
          <div className="ai-loading">
            <div className="dot-pulse"><span /><span /><span /></div>
            Analyzing your project risks...
          </div>
        )}
        {!loading && asked && <div className="ai-output">{output}</div>}
        {!asked && !loading && (
          <div style={{ fontSize: 13, color: 'var(--text2)' }}>
            Click any button above to get AI insights.
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-title"><span>✏️</span> Ask a Custom Question</div>
        <CustomQuestion onAsk={askAI} disabled={loading} />
      </div>
    </div>
  )
}

function CustomQuestion({ onAsk, disabled }) {
  const [val, setVal] = useState('')
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <input
        style={{ flex: 1, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text)', fontSize: 13, fontFamily: 'inherit', outline: 'none' }}
        placeholder="e.g. How should we handle technical risk if we adopt a new framework?"
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' && val.trim()) { onAsk(val); setVal('') } }}
      />
      <button className="analyze-btn"
        disabled={disabled || !val.trim()}
        onClick={() => { onAsk(val); setVal('') }}
        style={{ padding: '10px 20px' }}>
        Ask
      </button>
    </div>
  )
}