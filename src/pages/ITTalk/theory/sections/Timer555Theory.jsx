export default function Timer555Theory({ theory }) {
  return (
    <>
      <div className="formula-section">
        <h3>1. Monostable Mode (Delay Timer)</h3>
        <p>{theory.monostable.description}</p>
        <div className="formula-box">
          <div className="formula-main">{theory.monostable.formula}</div>
        </div>
        <div className="circuit-points" style={{ marginTop: '15px' }}>
          <h4>Circuit Connections:</h4>
          <ul>
            {theory.monostable.circuit.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
        <div className="worked-example" style={{ marginTop: '20px' }}>
          <h4>Worked Example (Monostable)</h4>
          <div className="example-given">
            <strong>Given:</strong> {theory.workedExamples.monostable.given}
          </div>
          <div className="example-steps">
            <div className="example-step">
              <div className="step-label">Step 1: {theory.workedExamples.monostable.step1.label}</div>
              <div className="calc-formula">{theory.workedExamples.monostable.step1.formula}</div>
            </div>
          </div>
          <div className="example-result">
            <span className="result-arrow">→</span>
            <span className="result-text">{theory.workedExamples.monostable.conclusion}</span>
          </div>
        </div>
      </div>

      <div className="formula-section">
        <h3>2. Astable Mode (Oscillator)</h3>
        <p>{theory.astable.description}</p>

        <h4 style={{ color: '#e0e0e0', marginTop: '15px' }}>Time Formulas:</h4>
        <div className="formula-box">
          <div className="formula-main">HIGH Time: {theory.astable.formulas.high}</div>
        </div>
        <div className="formula-box" style={{ marginTop: '8px' }}>
          <div className="formula-main">LOW Time: {theory.astable.formulas.low}</div>
        </div>
        <div className="formula-box" style={{ marginTop: '8px' }}>
          <div className="formula-main">Period: {theory.astable.formulas.period}</div>
        </div>
        <div className="formula-box" style={{ marginTop: '8px' }}>
          <div className="formula-main">Frequency: {theory.astable.formulas.frequency}</div>
        </div>
        <div className="formula-box" style={{ marginTop: '8px' }}>
          <div className="formula-main">{theory.astable.formulas.dutyCycle}</div>
        </div>

        <div className="circuit-points" style={{ marginTop: '15px' }}>
          <h4>Circuit Connections:</h4>
          <ul>
            {theory.astable.circuit.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="worked-example" style={{ marginTop: '20px' }}>
          <h4>Worked Example (Astable)</h4>
          <div className="example-given">
            <strong>Given:</strong> {theory.workedExamples.astable.given}
          </div>
          <div className="example-steps">
            <div className="example-step">
              <div className="step-label">Step 1: {theory.workedExamples.astable.step1.label}</div>
              <div className="calc-formula">{theory.workedExamples.astable.step1.formula}</div>
            </div>
            <div className="example-step">
              <div className="step-label">Step 2: {theory.workedExamples.astable.step2.label}</div>
              <div className="calc-formula">{theory.workedExamples.astable.step2.formula}</div>
            </div>
          </div>
          <div className="example-result">
            <span className="result-arrow">→</span>
            <span className="result-text">{theory.workedExamples.astable.conclusion}</span>
          </div>
        </div>
      </div>

      <div className="formula-section">
        <h3>Variables Reference</h3>
        <div className="formula-variables">
          {theory.formulaVariables.map((variable, index) => (
            <p key={index}><strong>{variable.symbol}</strong> = {variable.description}</p>
          ))}
        </div>
      </div>

      <div className="formula-section">
        <h3>Important Practical Notes</h3>
        <div className="notes-box">
          <ul>
            {theory.practicalNotes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
