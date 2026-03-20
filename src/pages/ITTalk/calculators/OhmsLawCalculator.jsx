import { useState } from 'react'
import { toBaseUnit } from '../utils/unitConversions'

export default function OhmsLawCalculator() {
  const [solveFor, setSolveFor] = useState('current')
  const [voltage, setVoltage] = useState('')
  const [current, setCurrent] = useState('')
  const [resistance, setResistance] = useState('')
  const [voltageUnit, setVoltageUnit] = useState('V')
  const [currentUnit, setCurrentUnit] = useState('A')
  const [resistanceUnit, setResistanceUnit] = useState('Ω')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const formatValue = (value, type) => {
    if (type === 'voltage') {
      if (Math.abs(value) >= 1000) return `${(value / 1000).toFixed(3)} kV`
      if (Math.abs(value) < 0.001) return `${(value * 1000000).toFixed(3)} μV`
      if (Math.abs(value) < 1) return `${(value * 1000).toFixed(3)} mV`
      return `${value.toFixed(3)} V`
    } else if (type === 'current') {
      if (Math.abs(value) >= 1000) return `${(value / 1000).toFixed(3)} kA`
      if (Math.abs(value) < 0.000001) return `${(value * 1000000000).toFixed(3)} nA`
      if (Math.abs(value) < 0.001) return `${(value * 1000000).toFixed(3)} μA`
      if (Math.abs(value) < 1) return `${(value * 1000).toFixed(3)} mA`
      return `${value.toFixed(3)} A`
    } else if (type === 'resistance') {
      if (Math.abs(value) >= 1000000) return `${(value / 1000000).toFixed(3)} MΩ`
      if (Math.abs(value) >= 1000) return `${(value / 1000).toFixed(3)} kΩ`
      if (Math.abs(value) < 1) return `${(value * 1000).toFixed(3)} mΩ`
      return `${value.toFixed(3)} Ω`
    } else if (type === 'power') {
      if (Math.abs(value) >= 1000) return `${(value / 1000).toFixed(3)} kW`
      if (Math.abs(value) < 0.001) return `${(value * 1000000).toFixed(3)} μW`
      if (Math.abs(value) < 1) return `${(value * 1000).toFixed(3)} mW`
      return `${value.toFixed(3)} W`
    }
    return value.toFixed(3)
  }

  const calculate = () => {
    setError('')
    setResult(null)

    const V = toBaseUnit(voltage, voltageUnit, 'voltage')
    const I = toBaseUnit(current, currentUnit, 'current')
    const R = toBaseUnit(resistance, resistanceUnit, 'resistance')

    let calculatedValue, label, type, formula, power

    try {
      switch (solveFor) {
        case 'voltage':
          if (isNaN(I) || isNaN(R)) {
            setError('Please enter Current and Resistance values')
            return
          }
          calculatedValue = I * R
          power = calculatedValue * I
          label = 'Voltage (V)'
          type = 'voltage'
          formula = `V = I × R = ${current}${currentUnit} × ${resistance}${resistanceUnit}`
          break

        case 'current':
          if (isNaN(V) || isNaN(R)) {
            setError('Please enter Voltage and Resistance values')
            return
          }
          if (R === 0) {
            setError('Resistance cannot be zero')
            return
          }
          calculatedValue = V / R
          power = V * calculatedValue
          label = 'Current (I)'
          type = 'current'
          formula = `I = V / R = ${voltage}${voltageUnit} / ${resistance}${resistanceUnit}`
          break

        case 'resistance':
          if (isNaN(V) || isNaN(I)) {
            setError('Please enter Voltage and Current values')
            return
          }
          if (I === 0) {
            setError('Current cannot be zero')
            return
          }
          calculatedValue = V / I
          power = V * I
          label = 'Resistance (R)'
          type = 'resistance'
          formula = `R = V / I = ${voltage}${voltageUnit} / ${current}${currentUnit}`
          break

        default:
          setError('Invalid selection')
          return
      }

      if (calculatedValue < 0) {
        setError('Result is negative. Check your input values.')
        return
      }

      setResult({
        value: formatValue(calculatedValue, type),
        label,
        formula,
        power: formatValue(power, 'power')
      })
    } catch {
      setError('Calculation error. Please check your inputs.')
    }
  }

  const resetCalculator = () => {
    setVoltage('')
    setCurrent('')
    setResistance('')
    setResult(null)
    setError('')
  }

  return (
    <div className="calculator-box ohms-law-calculator">
      <h3>Ohm's Law Calculator</h3>

      {/* Ohm's Law Triangle Visual */}
      <div className="ohms-triangle">
        <div className="triangle-container">
          <div className="triangle-top">V</div>
          <div className="triangle-divider"></div>
          <div className="triangle-bottom">
            <span>I</span>
            <span className="multiply">×</span>
            <span>R</span>
          </div>
        </div>
        <div className="triangle-formulas">
          <span>V = I × R</span>
          <span>I = V / R</span>
          <span>R = V / I</span>
        </div>
      </div>

      {/* Solve For Selector */}
      <div className="solve-for-section">
        <label>Solve for:</label>
        <div className="solve-options">
          <button
            className={`solve-btn ${solveFor === 'voltage' ? 'active' : ''}`}
            onClick={() => setSolveFor('voltage')}
          >Voltage (V)</button>
          <button
            className={`solve-btn ${solveFor === 'current' ? 'active' : ''}`}
            onClick={() => setSolveFor('current')}
          >Current (I)</button>
          <button
            className={`solve-btn ${solveFor === 'resistance' ? 'active' : ''}`}
            onClick={() => setSolveFor('resistance')}
          >Resistance (R)</button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="calculator-inputs ohms-inputs">
        {solveFor !== 'voltage' && (
          <div className="input-group">
            <label>Voltage (V)</label>
            <div className="input-with-unit has-select">
              <input
                type="number"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                placeholder="Enter voltage"
              />
              <select value={voltageUnit} onChange={(e) => setVoltageUnit(e.target.value)}>
                <option value="mV">mV</option>
                <option value="V">V</option>
                <option value="kV">kV</option>
              </select>
            </div>
          </div>
        )}

        {solveFor !== 'current' && (
          <div className="input-group">
            <label>Current (I)</label>
            <div className="input-with-unit has-select">
              <input
                type="number"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                placeholder="Enter current"
              />
              <select value={currentUnit} onChange={(e) => setCurrentUnit(e.target.value)}>
                <option value="μA">μA</option>
                <option value="mA">mA</option>
                <option value="A">A</option>
                <option value="kA">kA</option>
              </select>
            </div>
          </div>
        )}

        {solveFor !== 'resistance' && (
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
                <option value="mΩ">mΩ</option>
                <option value="Ω">Ω</option>
                <option value="kΩ">kΩ</option>
                <option value="MΩ">MΩ</option>
              </select>
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
        <div className="calculator-result ohms-result">
          <div className="result-label">{result.label}</div>
          <div className="result-value">{result.value}</div>
          <div className="result-formula-used">
            <span className="formula-label">Formula used:</span>
            <span className="formula-text">{result.formula}</span>
          </div>
          <div className="result-power">
            <span className="power-label">Power Dissipation:</span>
            <span className="power-value">P = {result.power}</span>
          </div>
        </div>
      )}
    </div>
  )
}
