export default function RCFilterTheory({ theory }) {
  return (
    <>
      {/* Low-Pass Filter Section */}
      <div className="filter-section lowpass-section">
        <h3>RC Low-Pass Filter</h3>
        <div className="filter-description">
          <p>{theory.lowPass.description}</p>
        </div>
        <div className="circuit-box">
          <h4>Circuit Configuration:</h4>
          <p>{theory.lowPass.circuit}</p>
        </div>
        <div className="uses-box">
          <h4>Common Uses:</h4>
          <ul>
            {theory.lowPass.uses.map((use, index) => (
              <li key={index}>{use}</li>
            ))}
          </ul>
        </div>
        <div className="worked-example">
          <h4>Worked Example</h4>
          <div className="example-given">
            <strong>Given:</strong> R = 10 kΩ, C = 0.1 µF
          </div>
          <div className="example-calculation-box">
            <div className="calc-title">Calculation:</div>
            <div className="calc-formula">fc = 1 / (2π × 10,000 × 0.0000001) ≈ <strong>159 Hz</strong></div>
          </div>
          <div className="example-result">
            <span className="result-text">Frequencies <strong>below 159 Hz pass</strong>, frequencies <strong>above 159 Hz are reduced</strong></span>
          </div>
        </div>
      </div>

      {/* High-Pass Filter Section */}
      <div className="filter-section highpass-section">
        <h3>RC High-Pass Filter</h3>
        <div className="filter-description">
          <p>{theory.highPass.description}</p>
        </div>
        <div className="circuit-box">
          <h4>Circuit Configuration:</h4>
          <p>{theory.highPass.circuit}</p>
        </div>
        <div className="uses-box">
          <h4>Common Uses:</h4>
          <ul>
            {theory.highPass.uses.map((use, index) => (
              <li key={index}>{use}</li>
            ))}
          </ul>
        </div>
        <div className="worked-example">
          <h4>Worked Example</h4>
          <div className="example-given">
            <strong>Given:</strong> R = 1 kΩ, C = 1 µF
          </div>
          <div className="example-calculation-box">
            <div className="calc-title">Calculation:</div>
            <div className="calc-formula">fc = 1 / (2π × 1,000 × 0.000001) ≈ <strong>159 Hz</strong></div>
          </div>
          <div className="example-result">
            <span className="result-text">Frequencies <strong>above 159 Hz pass</strong>, frequencies <strong>below 159 Hz are blocked</strong></span>
          </div>
        </div>
      </div>

      {/* Formula Section */}
      <div className="formula-section">
        <h3>Cutoff Frequency Formula</h3>
        <div className="formula-box">
          <div className="formula-main">fc = 1 / (2πRC)</div>
        </div>
        <div className="formula-variables">
          <p><strong>Where:</strong></p>
          {theory.variables.map((variable, index) => (
            <p key={index}><strong>{variable.symbol}</strong> = {variable.description}</p>
          ))}
          <p style={{marginTop: '10px', color: '#ffc107'}}><em>At cutoff frequency, output voltage drops to 70.7% of input.</em></p>
        </div>
      </div>

      {/* Important Notes */}
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
