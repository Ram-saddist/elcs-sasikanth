export default function PCBTraceTheory({ theory }) {
  return (
    <>
      <div className="formula-section">
        <h3>What Affects Trace Width?</h3>
        <div className="circuit-points">
          <ol>
            <li>Current flowing through the trace (A)</li>
            <li>Copper thickness (oz/ft²)</li>
            <li>Allowed temperature rise (°C)</li>
            <li>PCB layer type (Internal or External)</li>
          </ol>
          <p style={{ marginTop: '10px', color: '#b8b8b8' }}>External layers dissipate heat better than internal layers.</p>
        </div>
      </div>

      <div className="formula-section">
        <h3>IPC-2221 Standard Formula</h3>
        <p>For calculating current capacity:</p>
        <div className="formula-box">
          <div className="formula-main">I = k × ΔT<sup>0.44</sup> × A<sup>0.725</sup></div>
        </div>
        <div className="formula-variables">
          <p><strong>Where:</strong></p>
          {theory.formulaVariables.map((variable, index) => (
            <p key={index}><strong>{variable.symbol}</strong> = {variable.description}</p>
          ))}
        </div>
      </div>

      <div className="formula-section">
        <h3>Cross-sectional Area & Reverse Formula</h3>
        <div className="formula-box">
          <div className="formula-main">A = Width × Thickness</div>
        </div>
        <p style={{ marginTop: '15px', color: '#b8b8b8' }}>To solve for width from current:</p>
        <div className="formula-box" style={{ marginTop: '10px' }}>
          <div className="formula-main">A = (I / (k × ΔT<sup>0.44</sup>))<sup>1/0.725</sup></div>
        </div>
        <div className="formula-box" style={{ marginTop: '10px' }}>
          <div className="formula-main">Width = A / Thickness</div>
        </div>
      </div>

      <div className="formula-section">
        <h3>Copper Thickness Reference</h3>
        <table className="tau-table theory-tau-table">
          <thead>
            <tr>
              <th>Copper Weight</th>
              <th>Thickness</th>
            </tr>
          </thead>
          <tbody>
            {theory.copperReference.map((row, index) => (
              <tr key={index}>
                <td>{row.weight}</td>
                <td>{row.thickness}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="formula-section">
        <h3>Practical Design Tips</h3>
        <div className="notes-box">
          <ul>
            {theory.designTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="formula-section">
        <h3>Worked Example</h3>
        <div className="worked-example">
          <div className="example-given">
            <strong>Given:</strong> {theory.workedExample.given}
          </div>
          <div className="example-steps">
            <div className="example-step">
              <div className="step-label">Step 1: {theory.workedExample.step1.label}</div>
              <div className="calc-formula">{theory.workedExample.step1.formula}</div>
            </div>
            <div className="example-step">
              <div className="step-label">Step 2: {theory.workedExample.step2.label}</div>
              <div className="calc-formula">{theory.workedExample.step2.formula}</div>
            </div>
          </div>
          <div className="example-result">
            <span className="result-arrow">→</span>
            <span className="result-text">{theory.workedExample.conclusion}</span>
          </div>
        </div>
      </div>
    </>
  )
}
