export default function BatteryLifeTheory({ theory }) {
  return (
    <>
      <div className="formula-section">
        <h3>Basic Battery Life Formula</h3>
        <div className="formula-box">
          <div className="formula-main">Battery Life (hours) = Battery Capacity (mAh) / Load Current (mA)</div>
        </div>
        <div className="formula-variables">
          <p><strong>Variables:</strong></p>
          {theory.formulaVariables.slice(0, 3).map((variable, index) => (
            <p key={index}><strong>{variable.symbol}</strong> = {variable.description}</p>
          ))}
        </div>
      </div>

      <div className="formula-section">
        <h3>Real-World Correction (with Efficiency)</h3>
        <p>In real applications, batteries are not 100% efficient. We include an efficiency factor (70–90%):</p>
        <div className="formula-box">
          <div className="formula-main">Battery Life = (Capacity × Efficiency) / Load Current</div>
        </div>
      </div>

      <div className="formula-section">
        <h3>Average Current for Duty-Cycled Devices (IoT)</h3>
        <p>For devices like ESP8266 / ESP32 that alternate between active and sleep modes:</p>
        <div className="formula-box">
          <div className="formula-main">I<sub>avg</sub> = (I<sub>active</sub> × T<sub>active</sub> + I<sub>sleep</sub> × T<sub>sleep</sub>) / T<sub>total</sub></div>
        </div>
        <div className="formula-variables" style={{ marginTop: '15px' }}>
          <p><strong>Advanced Variables:</strong></p>
          {theory.formulaVariables.slice(3).map((variable, index) => (
            <p key={index}><strong>{variable.symbol}</strong> = {variable.description}</p>
          ))}
        </div>
      </div>

      <div className="formula-section">
        <h3>Battery Chemistry Reference</h3>
        <table className="tau-table theory-tau-table">
          <thead>
            <tr>
              <th>Chemistry</th>
              <th>Voltage</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {theory.batteryChemistry.map((row, index) => (
              <tr key={index}>
                <td>{row.type}</td>
                <td>{row.voltage}</td>
                <td>{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="formula-section">
        <h3>Worked Example (Basic)</h3>
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

      <div className="formula-section">
        <h3>Worked Example (IoT Device with Duty Cycle)</h3>
        <div className="worked-example">
          <div className="example-given">
            <strong>Given:</strong> {theory.iotExample.given}
          </div>
          <div className="example-steps">
            <div className="example-step">
              <div className="step-label">Step 1: {theory.iotExample.step1.label}</div>
              <div className="calc-formula">{theory.iotExample.step1.formula}</div>
            </div>
            <div className="example-step">
              <div className="step-label">Step 2: {theory.iotExample.step2.label}</div>
              <div className="calc-formula">{theory.iotExample.step2.formula}</div>
            </div>
          </div>
          <div className="example-result">
            <span className="result-arrow">→</span>
            <span className="result-text">{theory.iotExample.conclusion}</span>
          </div>
        </div>
      </div>

      <div className="formula-section">
        <h3>Important Engineering Notes</h3>
        <div className="notes-box">
          <ul>
            {theory.engineeringNotes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
