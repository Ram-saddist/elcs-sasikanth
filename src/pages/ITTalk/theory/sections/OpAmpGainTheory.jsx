export default function OpAmpGainTheory({ theory }) {
  return (
    <>
      <div className="formula-section">
        <h3>1. Inverting Amplifier</h3>
        <p>{theory.inverting.description}</p>
        <div className="formula-box">
          <div className="formula-main">{theory.inverting.gainFormula}</div>
        </div>
        <div className="formula-box" style={{ marginTop: '10px' }}>
          <div className="formula-main">{theory.inverting.outputFormula}</div>
        </div>
        <div className="circuit-points" style={{ marginTop: '15px' }}>
          <h4>Circuit Connections:</h4>
          <ul>
            {theory.inverting.circuit.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
        <div className="worked-example" style={{ marginTop: '20px' }}>
          <h4>Worked Example (Inverting)</h4>
          <div className="example-given">
            <strong>Given:</strong> {theory.workedExamples.inverting.given}
          </div>
          <div className="example-steps">
            <div className="example-step">
              <div className="step-label">Step 1: {theory.workedExamples.inverting.step1.label}</div>
              <div className="calc-formula">{theory.workedExamples.inverting.step1.formula}</div>
            </div>
            <div className="example-step">
              <div className="step-label">Step 2: {theory.workedExamples.inverting.step2.label}</div>
              <div className="calc-formula">{theory.workedExamples.inverting.step2.formula}</div>
            </div>
          </div>
          <div className="example-result">
            <span className="result-arrow">→</span>
            <span className="result-text">{theory.workedExamples.inverting.conclusion}</span>
          </div>
        </div>
      </div>

      <div className="formula-section">
        <h3>2. Non-Inverting Amplifier</h3>
        <p>{theory.nonInverting.description}</p>
        <div className="formula-box">
          <div className="formula-main">{theory.nonInverting.gainFormula}</div>
        </div>
        <div className="formula-box" style={{ marginTop: '10px' }}>
          <div className="formula-main">{theory.nonInverting.outputFormula}</div>
        </div>
        <div className="circuit-points" style={{ marginTop: '15px' }}>
          <h4>Circuit Connections:</h4>
          <ul>
            {theory.nonInverting.circuit.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
        <div className="worked-example" style={{ marginTop: '20px' }}>
          <h4>Worked Example (Non-Inverting)</h4>
          <div className="example-given">
            <strong>Given:</strong> {theory.workedExamples.nonInverting.given}
          </div>
          <div className="example-steps">
            <div className="example-step">
              <div className="step-label">Step 1: {theory.workedExamples.nonInverting.step1.label}</div>
              <div className="calc-formula">{theory.workedExamples.nonInverting.step1.formula}</div>
            </div>
            <div className="example-step">
              <div className="step-label">Step 2: {theory.workedExamples.nonInverting.step2.label}</div>
              <div className="calc-formula">{theory.workedExamples.nonInverting.step2.formula}</div>
            </div>
          </div>
          <div className="example-result">
            <span className="result-arrow">→</span>
            <span className="result-text">{theory.workedExamples.nonInverting.conclusion}</span>
          </div>
        </div>
      </div>

      <div className="formula-section">
        <h3>Gain in Decibels (dB)</h3>
        <p>For audio and signal processing applications, gain is often expressed in dB:</p>
        <div className="formula-box">
          <div className="formula-main">Gain (dB) = 20 × log<sub>10</sub>(|Av|)</div>
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
        <h3>Important Practical Considerations</h3>
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
