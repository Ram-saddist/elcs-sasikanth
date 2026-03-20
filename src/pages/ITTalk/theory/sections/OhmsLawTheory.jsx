export default function OhmsLawTheory({ theory }) {
  return (
    <>
      <div className="formula-section ohms-formulas">
        <h3>Ohm's Law Formulas</h3>
        <div className="formula-cards">
          <div className="formula-card">
            <div className="formula-card-title">Voltage</div>
            <div className="formula-card-content">V = I × R</div>
          </div>
          <div className="formula-card">
            <div className="formula-card-title">Current</div>
            <div className="formula-card-content">I = V / R</div>
          </div>
          <div className="formula-card">
            <div className="formula-card-title">Resistance</div>
            <div className="formula-card-content">R = V / I</div>
          </div>
        </div>
        <div className="formula-variables">
          <p><strong>Where:</strong></p>
          {theory.variables.map((variable, index) => (
            <p key={index}><strong>{variable.symbol}</strong> = {variable.description}</p>
          ))}
        </div>
      </div>

      <div className="examples-section">
        <h3>Worked Examples</h3>
        <div className="examples-grid">
          {theory.examples.map((example, index) => (
            <div key={index} className="example-card">
              <div className="example-card-title">{example.title}</div>
              <div className="example-given">
                <strong>Given:</strong> {example.given}
              </div>
              <div className="example-calculation-box">
                <div className="calc-formula">{example.formula}</div>
              </div>
              <div className="example-result">
                <span className="result-text">Result: <strong>{example.result}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="notes-section">
        <h3>Important Notes</h3>
        <div className="notes-box">
          <ul>
            {theory.notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
