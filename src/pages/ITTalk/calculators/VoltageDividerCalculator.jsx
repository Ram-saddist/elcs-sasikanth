import { useState } from 'react'
import { toOhms } from '../utils/unitConversions'

export default function VoltageDividerCalculator() {
  const [vin, setVin] = useState('')
  const [r1, setR1] = useState('')
  const [r2, setR2] = useState('')
  const [vout, setVout] = useState('')
  const [r1Unit, setR1Unit] = useState('Ω')
  const [r2Unit, setR2Unit] = useState('Ω')
  const [solveFor, setSolveFor] = useState('vout')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const calculate = () => {
    setError('')
    setResult(null)

    const vinVal = parseFloat(vin)
    const r1Val = toOhms(parseFloat(r1), r1Unit)
    const r2Val = toOhms(parseFloat(r2), r2Unit)
    const voutVal = parseFloat(vout)

    try {
      let calculatedValue
      let label
      let unit

      switch (solveFor) {
        case 'vout':
          if (isNaN(vinVal) || isNaN(r1Val) || isNaN(r2Val)) {
            setError('Please enter Vin, R1, and R2 values')
            return
          }
          if (r1Val + r2Val === 0) {
            setError('R1 + R2 cannot be zero')
            return
          }
          calculatedValue = vinVal * (r2Val / (r1Val + r2Val))
          label = 'Output Voltage (Vout)'
          unit = 'V'
          break

        case 'vin':
          if (isNaN(voutVal) || isNaN(r1Val) || isNaN(r2Val)) {
            setError('Please enter Vout, R1, and R2 values')
            return
          }
          if (r2Val === 0) {
            setError('R2 cannot be zero')
            return
          }
          calculatedValue = voutVal * (r1Val + r2Val) / r2Val
          label = 'Input Voltage (Vin)'
          unit = 'V'
          break

        case 'r1':
          if (isNaN(vinVal) || isNaN(voutVal) || isNaN(r2Val)) {
            setError('Please enter Vin, Vout, and R2 values')
            return
          }
          if (voutVal === 0) {
            setError('Vout cannot be zero for R1 calculation')
            return
          }
          calculatedValue = r2Val * (vinVal - voutVal) / voutVal
          label = 'Resistor 1 (R1)'
          unit = 'Ω'
          break

        case 'r2':
          if (isNaN(vinVal) || isNaN(voutVal) || isNaN(r1Val)) {
            setError('Please enter Vin, Vout, and R1 values')
            return
          }
          if (vinVal - voutVal === 0) {
            setError('Vin and Vout cannot be equal')
            return
          }
          calculatedValue = (voutVal * r1Val) / (vinVal - voutVal)
          label = 'Resistor 2 (R2)'
          unit = 'Ω'
          break

        default:
          setError('Invalid selection')
          return
      }

      if (calculatedValue < 0) {
        setError('Result is negative. Check your input values.')
        return
      }

      setResult({ value: calculatedValue.toFixed(6), label, unit })
    } catch {
      setError('Calculation error. Please check your inputs.')
    }
  }

  const resetCalculator = () => {
    setVin('')
    setR1('')
    setR2('')
    setVout('')
    setResult(null)
    setError('')
  }

  return (
    <div className="calculator-box voltage-calculator">
      <h3>Voltage Divider Calculator</h3>

      <div className="calculator-diagram-wrapper">
        <div className="calculator-diagram">
          <img src="/images/voltage divider caluculator circuit diagram.jpeg" alt="Voltage Divider Circuit Diagram" className="circuit-img" />
        </div>
        <div className="circuit-points">
          <ul>
            <li>Two resistors R1 and R2 connected in series</li>
            <li>Input voltage Vin applied across R1 + R2</li>
            <li>Output voltage Vout taken from the junction of R1 and R2</li>
          </ul>
        </div>
      </div>

      <div className="formula-display">
        <strong>Formula:</strong> Vout = Vin × (R2 / (R1 + R2))
      </div>

      <div className="solve-for-section">
        <label>Solve for:</label>
        <div className="solve-options">
          <button
            className={`solve-btn ${solveFor === 'vout' ? 'active' : ''}`}
            onClick={() => setSolveFor('vout')}
          >Vout</button>
          <button
            className={`solve-btn ${solveFor === 'vin' ? 'active' : ''}`}
            onClick={() => setSolveFor('vin')}
          >Vin</button>
          <button
            className={`solve-btn ${solveFor === 'r1' ? 'active' : ''}`}
            onClick={() => setSolveFor('r1')}
          >R1</button>
          <button
            className={`solve-btn ${solveFor === 'r2' ? 'active' : ''}`}
            onClick={() => setSolveFor('r2')}
          >R2</button>
        </div>
      </div>

      <div className="calculator-inputs">
        {solveFor !== 'vin' && (
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
        )}

        {solveFor !== 'r1' && (
          <div className="input-group">
            <label>Resistor 1 (R1)</label>
            <div className="input-with-unit has-select">
              <input
                type="number"
                value={r1}
                onChange={(e) => setR1(e.target.value)}
                placeholder="Enter resistance"
              />
              <select
                value={r1Unit}
                onChange={(e) => setR1Unit(e.target.value)}
              >
                <option value="Ω">Ω</option>
                <option value="kΩ">kΩ</option>
                <option value="MΩ">MΩ</option>
              </select>
            </div>
          </div>
        )}

        {solveFor !== 'r2' && (
          <div className="input-group">
            <label>Resistor 2 (R2)</label>
            <div className="input-with-unit has-select">
              <input
                type="number"
                value={r2}
                onChange={(e) => setR2(e.target.value)}
                placeholder="Enter resistance"
              />
              <select
                value={r2Unit}
                onChange={(e) => setR2Unit(e.target.value)}
              >
                <option value="Ω">Ω</option>
                <option value="kΩ">kΩ</option>
                <option value="MΩ">MΩ</option>
              </select>
            </div>
          </div>
        )}

        {solveFor !== 'vout' && (
          <div className="input-group">
            <label>Output Voltage (Vout)</label>
            <div className="input-with-unit">
              <input
                type="number"
                value={vout}
                onChange={(e) => setVout(e.target.value)}
                placeholder="Enter voltage"
              />
              <span className="unit">V</span>
            </div>
          </div>
        )}
      </div>

      <div className="calculator-buttons">
        <button className="calculate-btn" onClick={calculate}>Calculate</button>
        <button className="reset-btn" onClick={resetCalculator}>Reset</button>
      </div>

      {error && <div className="calculator-error">{error}</div>}

      {result && (
        <div className="calculator-result">
          <div className="result-label">{result.label}</div>
          <div className="result-value">{result.value} <span>{result.unit}</span></div>
        </div>
      )}
    </div>
  )
}
