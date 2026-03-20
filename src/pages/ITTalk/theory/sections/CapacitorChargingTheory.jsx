export default function CapacitorChargingTheory({ theory }) {
  return (
    <>
      <div className="formula-section">
        <h3>What is Time Constant (τ)?</h3>
        <p>The Time Constant (Tau) of an RC circuit is defined as:</p>
        <div className="formula-box">
          <div className="formula-main">τ = R × C</div>
        </div>
        <div className="formula-variables">
          <p><strong>Where:</strong></p>
          {theory.formulaVariables.map((variable, index) => (
            <p key={index}><strong>{variable.symbol}</strong> = {variable.description}</p>
          ))}
        </div>
        <p style={{ marginTop: '15px', color: '#b8b8b8' }}>The time constant represents the time required for the capacitor voltage to reach <strong style={{ color: '#00d4ff' }}>63.2% of the input voltage</strong> during charging.</p>
      </div>

      <div className="formula-section">
        <h3>Charging Behavior of Capacitor</h3>
        <p>During charging, the capacitor voltage follows this exponential formula:</p>
        <div className="formula-box">
          <div className="formula-main">Vc(t) = Vin × (1 - e<sup>-t/RC</sup>)</div>
        </div>
      </div>

      <div className="formula-section">
        <h3>Important Charging Points</h3>
        <table className="tau-table theory-tau-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Capacitor Voltage</th>
            </tr>
          </thead>
          <tbody>
            {theory.chargingTable.map((row, index) => (
              <tr key={index}>
                <td>{row.time}</td>
                <td>{row.voltage}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ marginTop: '15px', color: '#b8b8b8' }}>Practically, after <strong style={{ color: '#00d4ff' }}>5 time constants (5τ)</strong>, the capacitor is considered fully charged.</p>
      </div>

      <div className="formula-section">
        <h3>RC Charging Circuit</h3>
        <div className="circuit-points">
          <ul>
            <li>One resistor (R) connected in series with capacitor (C)</li>
            <li>Input voltage (Vin) applied across R + C</li>
            <li>Output taken across the capacitor</li>
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
