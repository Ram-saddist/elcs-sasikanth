import { useState } from 'react'
import { toBaseUnit } from '../utils/unitConversions'
import { formatFrequency, formatResistance, formatCapacitance } from '../utils/formatters'

export default function RCFilterCalculator() {
  const [filterType, setFilterType] = useState('lowpass')
  const [solveFor, setSolveFor] = useState('frequency')
  const [resistance, setResistance] = useState('')
  const [capacitance, setCapacitance] = useState('')
  const [frequency, setFrequency] = useState('')
  const [resistanceUnit, setResistanceUnit] = useState('kΩ')
  const [capacitanceUnit, setCapacitanceUnit] = useState('µF')
  const [frequencyUnit, setFrequencyUnit] = useState('Hz')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const calculate = () => {
    setError('')
    setResult(null)

    const R = toBaseUnit(resistance, resistanceUnit, 'resistance')
    const C = toBaseUnit(capacitance, capacitanceUnit, 'capacitance')
    const F = toBaseUnit(frequency, frequencyUnit, 'frequency')
    const PI = Math.PI

    try {
      let calculatedValue, label, formatted

      switch (solveFor) {
        case 'frequency':
          if (isNaN(R) || isNaN(C) || R <= 0 || C <= 0) {
            setError('Please enter valid Resistance and Capacitance values')
            return
          }
          calculatedValue = 1 / (2 * PI * R * C)
          label = 'Cutoff Frequency (fc)'
          formatted = formatFrequency(calculatedValue)
          break

        case 'resistance':
          if (isNaN(F) || isNaN(C) || F <= 0 || C <= 0) {
            setError('Please enter valid Frequency and Capacitance values')
            return
          }
          calculatedValue = 1 / (2 * PI * F * C)
          label = 'Resistance (R)'
          formatted = formatResistance(calculatedValue)
          break

        case 'capacitance':
          if (isNaN(F) || isNaN(R) || F <= 0 || R <= 0) {
            setError('Please enter valid Frequency and Resistance values')
            return
          }
          calculatedValue = 1 / (2 * PI * F * R)
          label = 'Capacitance (C)'
          formatted = formatCapacitance(calculatedValue)
          break

        default:
          setError('Invalid selection')
          return
      }

      setResult({
        value: calculatedValue,
        formatted,
        label,
        filterType: filterType === 'lowpass' ? 'Low-Pass' : 'High-Pass',
        description: filterType === 'lowpass'
          ? `Frequencies below ${formatFrequency(solveFor === 'frequency' ? calculatedValue : F)} will pass`
          : `Frequencies above ${formatFrequency(solveFor === 'frequency' ? calculatedValue : F)} will pass`
      })
    } catch {
      setError('Calculation error. Please check your inputs.')
    }
  }

  const resetCalculator = () => {
    setResistance('')
    setCapacitance('')
    setFrequency('')
    setResult(null)
    setError('')
  }

  return (
    <div className="calculator-box rc-filter-calculator">
      <h3>RC Filter Calculator</h3>

      {/* Filter Type Selector */}
      <div className="filter-type-selector">
        <button
          className={`filter-btn ${filterType === 'lowpass' ? 'active lowpass' : ''}`}
          onClick={() => setFilterType('lowpass')}
        >
          <span className="filter-icon">📉</span>
          Low-Pass Filter
        </button>
        <button
          className={`filter-btn ${filterType === 'highpass' ? 'active highpass' : ''}`}
          onClick={() => setFilterType('highpass')}
        >
          <span className="filter-icon">📈</span>
          High-Pass Filter
        </button>
      </div>

      {/* Circuit Diagram Description */}
      <div className="circuit-info-box">
        {filterType === 'lowpass' ? (
          <>
            <div className="circuit-title">Low-Pass Filter Circuit</div>
            <div className="circuit-desc">
              <p>• Resistor <strong>R</strong> in series with input</p>
              <p>• Capacitor <strong>C</strong> from output to ground</p>
              <p>• Output across the capacitor</p>
            </div>
          </>
        ) : (
          <>
            <div className="circuit-title">High-Pass Filter Circuit</div>
            <div className="circuit-desc">
              <p>• Capacitor <strong>C</strong> in series with input</p>
              <p>• Resistor <strong>R</strong> from output to ground</p>
              <p>• Output across the resistor</p>
            </div>
          </>
        )}
      </div>

      {/* Formula Display */}
      <div className="formula-display">
        <strong>Cutoff Frequency Formula:</strong> fc = 1 / (2πRC)
      </div>

      {/* Solve For Selector */}
      <div className="solve-for-section">
        <label>Solve for:</label>
        <div className="solve-options">
          <button
            className={`solve-btn ${solveFor === 'frequency' ? 'active' : ''}`}
            onClick={() => setSolveFor('frequency')}
          >Frequency (fc)</button>
          <button
            className={`solve-btn ${solveFor === 'resistance' ? 'active' : ''}`}
            onClick={() => setSolveFor('resistance')}
          >Resistance (R)</button>
          <button
            className={`solve-btn ${solveFor === 'capacitance' ? 'active' : ''}`}
            onClick={() => setSolveFor('capacitance')}
          >Capacitance (C)</button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="calculator-inputs rc-inputs">
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
                <option value="Ω">Ω</option>
                <option value="kΩ">kΩ</option>
                <option value="MΩ">MΩ</option>
              </select>
            </div>
          </div>
        )}

        {solveFor !== 'capacitance' && (
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
        )}

        {solveFor !== 'frequency' && (
          <div className="input-group">
            <label>Cutoff Frequency (fc)</label>
            <div className="input-with-unit has-select">
              <input
                type="number"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                placeholder="Enter frequency"
              />
              <select value={frequencyUnit} onChange={(e) => setFrequencyUnit(e.target.value)}>
                <option value="Hz">Hz</option>
                <option value="kHz">kHz</option>
                <option value="MHz">MHz</option>
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
        <div className={`calculator-result rc-result ${filterType}`}>
          <div className="result-filter-type">{result.filterType} Filter</div>
          <div className="result-label">{result.label}</div>
          <div className="result-value">{result.formatted}</div>
          <div className="result-description">{result.description}</div>
        </div>
      )}
    </div>
  )
}
