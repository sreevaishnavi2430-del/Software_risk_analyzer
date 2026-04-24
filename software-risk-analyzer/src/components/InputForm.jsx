import { useState } from 'react'

const defaults = {
  projectName: '', teamSize: '', duration: '', budget: '',
  complexity: 'medium', methodology: 'agile', techStack: 'existing',
  experience: 'mixed', requirements: 'partial', hasSecurity: 'no',
}

export default function InputForm({ onAnalyze, initial }) {
  const [form, setForm] = useState(initial || defaults)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.projectName || !form.teamSize || !form.duration || !form.budget) {
      alert('Please fill in all required fields.')
      return
    }
    onAnalyze(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="card section-gap">
        <div className="card-title"><span>📋</span> Project Details</div>
        <div className="form-grid">
          <div className="form-group form-full">
            <label>Project Name *</label>
            <input placeholder="e.g. Hospital Management System" value={form.projectName} onChange={e => set('projectName', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Team Size *</label>
            <input type="number" min="1" placeholder="e.g. 5" value={form.teamSize} onChange={e => set('teamSize', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Duration (months) *</label>
            <input type="number" min="1" placeholder="e.g. 6" value={form.duration} onChange={e => set('duration', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Budget (₹ / $) *</label>
            <input type="number" min="0" placeholder="e.g. 100000" value={form.budget} onChange={e => set('budget', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Project Complexity</label>
            <select value={form.complexity} onChange={e => set('complexity', e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card section-gap">
        <div className="card-title"><span>⚙️</span> Technical & Team Factors</div>
        <div className="form-grid">
          <div className="form-group">
            <label>Development Methodology</label>
            <select value={form.methodology} onChange={e => set('methodology', e.target.value)}>
              <option value="agile">Agile / Scrum</option>
              <option value="waterfall">Waterfall</option>
              <option value="iterative">Iterative</option>
            </select>
          </div>
          <div className="form-group">
            <label>Technology Stack</label>
            <select value={form.techStack} onChange={e => set('techStack', e.target.value)}>
              <option value="existing">Fully Familiar</option>
              <option value="partial">Partially Familiar</option>
              <option value="new">Entirely New</option>
            </select>
          </div>
          <div className="form-group">
            <label>Team Experience Level</label>
            <select value={form.experience} onChange={e => set('experience', e.target.value)}>
              <option value="senior">Senior / Experienced</option>
              <option value="mixed">Mixed</option>
              <option value="junior">Junior / Fresher</option>
            </select>
          </div>
          <div className="form-group">
            <label>Requirements Clarity</label>
            <select value={form.requirements} onChange={e => set('requirements', e.target.value)}>
              <option value="clear">Clearly Defined</option>
              <option value="partial">Partially Defined</option>
              <option value="unclear">Vague / Unclear</option>
            </select>
          </div>
          <div className="form-group">
            <label>Has Security / Compliance Needs?</label>
            <select value={form.hasSecurity} onChange={e => set('hasSecurity', e.target.value)}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
        </div>
      </div>

      <button type="submit" className="analyze-btn">Analyze Risks →</button>
    </form>
  )
}