import { useState } from 'react'
import { toOhms, toFarads } from '../utils/unitConversions'
import { formatTime } from '../utils/formatters'

export default function CapacitorChargingCalculator() {
  const [vin, setVin] = useState('')
  const [resistance, setResistance] = useState('')
  const [capacitance, setCapacitance] = useState('')
  const [time, setTime] = useState('')
  const [resistanceUnit, setResistanceUnit] = useState('kΩ')
  const [capacitanceUnit, setCapacitanceUnit] = useState('µF')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const calculate = () => {
    setError('')
    setResult(null)

    const vinVal = parseFloat(vin)
    const R = toOhms(resistance, resistanceUnit)
    const C = toFarads(capacitance, capacitanceUnit)
    const t = parseFloat(time)

    if (isNaN(vinVal) || vinVal <= 0) {
      setError('Please enter a valid Input Voltage (Vin)')
      return
    }
    if (isNaN(R) || R <= 0) {
      setError('Please enter a valid Resistance (R)')
      return
    }
    if (isNaN(C) || C <= 0) {
      setError('Please enter a valid Capacitance (C)')
      return
    }
    if (isNaN(t) || t < 0) {
      setError('Please enter a valid Time (t ≥ 0)')
      return
    }

    try {
      const tau = R * C
      const vcAtT = vinVal * (1 - Math.exp(-t / (R * C)))
      const percentCharged = (vcAtT / vinVal) * 100

      const chargingPoints = [1, 2, 3, 4, 5].map(n => ({
        label: `${n}τ`,
        time: formatTime(n * tau),
        voltage: (vinVal * (1 - Math.exp(-n))).toFixed(4),
        percent: ((1 - Math.exp(-n)) * 100).toFixed(1)
      }))

      setResult({
        tau,
        tauFormatted: formatTime(tau),
        vcAtT: vcAtT.toFixed(4),
        percentCharged: percentCharged.toFixed(1),
        vinVal,
        chargingPoints
      })
    } catch {
      setError('Calculation error. Please check your inputs.')
    }
  }

  const resetCalculator = () => {
    setVin('')
    setResistance('')
    setCapacitance('')
    setTime('')
    setResult(null)
    setError('')
  }

  return (
    <div className="calculator-box capacitor-charging-calculator">
      <h3>Capacitor Charging Calculator</h3>

      <div className="formula-display">
        <strong>Charging Formula:</strong> Vc(t) = Vin × (1 - e<sup>-t/RC</sup>)
      </div>
      <div className="formula-display" style={{ marginTop: '8px' }}>
        <strong>Time Constant:</strong> τ = R × C
      </div>

      <div className="calculator-inputs">
        <div className="input-group">
          <label>Input Voltage (Vin)</label>
          <div className="input-with-unit">
            <input
              type="number"
              value={vin}
              onChange={(e) => setVin(e.target.value)}
              placeholder="Enter voltage"
            />
            <span className="unit">V</span>
          </div>
        </div>

        <div className="input-group">
          <label>Resistance (R)</label>
          <div className="input-with-unit has-select">
            <input
              type="number"
              value={resistance}
              onChange={(e) => setResistance(e.target.value)}
              placeholder="Enter resistance"
            />
            <select value={resistanceUnit} onChange={(e) => setResistanceUnit(e.target.value)}>
              <option value="Ω">Ω</option>
              <option value="kΩ">kΩ</option>
              <option value="MΩ">MΩ</option>
            </select>
          </div>
        </div>

        <div className="input-group">
          <label>Capacitance (C)</label>
          <div className="input-with-unit has-select">
            <input
              type="number"
              value={capacitance}
              onChange={(e) => setCapacitance(e.target.value)}
              placeholder="Enter capacitance"
            />
            <select value={capacitanceUnit} onChange={(e) => setCapacitanceUnit(e.target.value)}>
              <option value="pF">pF</option>
              <option value="nF">nF</option>
              <option value="µF">µF</option>
              <option value="mF">mF</option>
            </select>
          </div>
        </div>

        <div className="input-group">
          <label>Time (t)</label>
          <div className="input-with-unit">
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Enter time in seconds"
            />
            <span className="unit">s</span>
          </div>
        </div>
      </div>

      <div className="calculator-buttons">
        <button className="calculate-btn" onClick={calculate}>Calculate</button>
        <button className="reset-btn" onClick={resetCalculator}>Reset</button>
      </div>

      {error && <div className="calculator-error">{error}</div>}

      {result && (
        <div className="calculator-result capacitor-result">
          <div className="result-label">Time Constant (τ)</div>
          <div className="result-value">{result.tauFormatted}</div>

          <div className="result-divider"></div>

          <div className="result-label">Capacitor Voltage at t = {time}s</div>
          <div className="result-value">{result.vcAtT} <span>V</span></div>
          <div className="result-description">{result.percentCharged}% of {result.vinVal}V</div>

          <div className="result-divider"></div>

          <div className="charging-table">
            <h4>Charging Points</h4>
            <table className="tau-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Actual Time</th>
                  <th>Voltage (Vc)</th>
                  <th>% Charged</th>
                </tr>
              </thead>
              <tbody>
                {result.chargingPoints.map((point, index) => (
                  <tr key={index}>
                    <td>{point.label}</td>
                    <td>{point.time}</td>
                    <td>{point.voltage} V</td>
                    <td>{point.percent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
