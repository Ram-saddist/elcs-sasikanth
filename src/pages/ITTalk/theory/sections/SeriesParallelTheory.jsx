export default function SeriesParallelTheory({ theory }) {
  return (
    <>
      {/* Series Section */}
      <div className="connection-section series-section">
        <h3>Series Resistor Connection</h3>
        <div className="connection-description">
          <p>{theory.series.description}</p>
        </div>
        <div className="characteristics-box">
          <h4>Key Characteristics:</h4>
          <ul>
            {theory.series.characteristics.map((char, index) => (
              <li key={index}>{char}</li>
            ))}
          </ul>
        </div>
        <div className="formula-box">
          <div className="formula-subtitle">Series Resistance Formula:</div>
          <div className="formula-main">{theory.series.formula}</div>
        </div>
        <div className="worked-example">
          <h4>Worked Example</h4>
          <div className="example-given">
            <strong>Given:</strong> R1 = 100Ω, R2 = 220Ω, R3 = 330Ω
          </div>
          <div className="example-calculation-box">
            <div className="calc-title">Calculation:</div>
            <div className="calc-formula">R<sub>total</sub> = 100 + 220 + 330 = <strong>650Ω</strong></div>
          </div>
        </div>
      </div>

      {/* Parallel Section */}
      <div className="connection-section parallel-section">
        <h3>Parallel Resistor Connection</h3>
        <div className="connection-description">
          <p>{theory.parallel.description}</p>
        </div>
        <div className="characteristics-box">
          <h4>Key Characteristics:</h4>
          <ul>
            {theory.parallel.characteristics.map((char, index) => (
              <li key={index}>{char}</li>
            ))}
          </ul>
        </div>
        <div className="formula-box">
          <div className="formula-subtitle">Parallel Resistance Formula:</div>
          <div className="formula-main">{theory.parallel.formula}</div>
          <div className="formula-subtitle" style={{marginTop: '15px'}}>For two resistors only:</div>
          <div className="formula-main">{theory.parallel.twoResistorFormula}</div>
        </div>
        <div className="worked-example">
          <h4>Worked Example</h4>
          <div className="example-given">
            <strong>Given:</strong> R1 = 100Ω, R2 = 200Ω
          </div>
          <div className="example-calculation-box">
            <div className="calc-title">Calculation:</div>
            <div className="calc-formula">R<sub>total</sub> = (100 × 200) / (100 + 200) = 20000 / 300 = <strong>66.7Ω</strong></div>
          </div>
        </div>
      </div>

      {/* Series-Parallel Network Example */}
      <div className="connection-section mixed-section">
        <h3>Series-Parallel Networks</h3>
        <div className="connection-description">
          <p>A series-parallel network is analyzed by <strong>simplifying the circuit step by step</strong>:</p>
          <ol className="step-list">
            <li>Identify series resistors and combine them</li>
            <li>Identify parallel resistors and combine them</li>
            <li>Replace the combined resistors with their equivalent value</li>
            <li>Repeat until a single equivalent resistance remains</li>
          </ol>
        </div>
        <div className="worked-example mixed-example">
          <h4>Worked Example</h4>
          <div className="example-given">
            <strong>Example Circuit:</strong><br/>
            R1 = 100Ω (series), R2 = 200Ω ‖ R3 = 300Ω (parallel), R4 = 400Ω (series)
          </div>
          <div className="example-steps">
            <div className="example-step">
              <div className="step-label">Step 1: Calculate Parallel Section (R2 ‖ R3)</div>
              <div className="calc-formula">R<sub>parallel</sub> = (200 × 300) / (200 + 300) = 60000 / 500 = <strong>120Ω</strong></div>
            </div>
            <div className="example-step">
              <div className="step-label">Step 2: Add Series Resistors</div>
              <div className="calc-formula">R<sub>total</sub> = R1 + R<sub>parallel</sub> + R4 = 100 + 120 + 400 = <strong>620Ω</strong></div>
            </div>
          </div>
          <div className="example-result">
            <span className="result-arrow">→</span>
            <span className="result-text">Equivalent Resistance = <strong>620Ω</strong></span>
          </div>
        </div>
      </div>

      {/* Important Rules */}
      <div className="rules-section">
        <h3>Important Rules to Remember</h3>
        <div className="rules-box">
          <ul>
            {theory.rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
