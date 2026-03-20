import { useState } from 'react'
import { toOhms } from '../utils/unitConversions'
import { formatResistance } from '../utils/formatters'

export default function SeriesParallelCalculator() {
  const [mode, setMode] = useState('series')
  const [resistors, setResistors] = useState([{ value: '', unit: 'Ω' }, { value: '', unit: 'Ω' }])
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const addResistor = () => {
    if (resistors.length < 10) {
      setResistors([...resistors, { value: '', unit: 'Ω' }])
    }
  }

  const removeResistor = (index) => {
    if (resistors.length > 2) {
      setResistors(resistors.filter((_, i) => i !== index))
    }
  }

  const updateResistor = (index, field, value) => {
    const updated = [...resistors]
    updated[index][field] = value
    setResistors(updated)
  }

  const calculate = () => {
    setError('')
    setResult(null)

    const values = resistors.map(r => toOhms(r.value, r.unit))

    if (values.some(v => isNaN(v) || v <= 0)) {
      setError('Please enter valid positive resistance values for all resistors')
      return
    }

    let total
    if (mode === 'series') {
      total = values.reduce((sum, val) => sum + val, 0)
    } else {
      const reciprocalSum = values.reduce((sum, val) => sum + (1 / val), 0)
      total = 1 / reciprocalSum
    }

    setResult({
      value: total,
      formatted: formatResistance(total),
      mode: mode,
      count: resistors.length
    })
  }

  const resetCalculator = () => {
    setResistors([{ value: '', unit: 'Ω' }, { value: '', unit: 'Ω' }])
    setResult(null)
    setError('')
  }

  return (
    <div className="calculator-box series-parallel-calculator">
      <h3>Series & Parallel Resistor Calculator</h3>

      {/* Mode Selector */}
      <div className="mode-selector">
        <button
          className={`mode-btn ${mode === 'series' ? 'active' : ''}`}
          onClick={() => setMode('series')}
        >
          <span className="mode-icon">—●—●—</span>
          Series
        </button>
        <button
          className={`mode-btn ${mode === 'parallel' ? 'active' : ''}`}
          onClick={() => setMode('parallel')}
        >
          <span className="mode-icon">≡</span>
          Parallel
        </button>
      </div>

      {/* Circuit Diagram */}
      <div className="circuit-diagram-box">
        {mode === 'series' ? (
          <div className="series-diagram">
            <div className="wire-line"></div>
            {resistors.map((_, index) => (
              <div key={index} className="resistor-symbol">
                <span>R{index + 1}</span>
              </div>
            ))}
            <div className="wire-line"></div>
          </div>
        ) : (
          <div className="parallel-diagram">
            <div className="parallel-left-rail"></div>
            <div className="parallel-resistors">
              {resistors.map((_, index) => (
                <div key={index} className="parallel-branch">
                  <div className="branch-wire"></div>
                  <div className="resistor-symbol"><span>R{index + 1}</span></div>
                  <div className="branch-wire"></div>
                </div>
              ))}
            </div>
            <div className="parallel-right-rail"></div>
          </div>
        )}
      </div>

      {/* Resistor Inputs */}
      <div className="resistor-inputs">
        <div className="inputs-header">
          <h4>Enter Resistor Values</h4>
          <button className="add-resistor-btn" onClick={addResistor} disabled={resistors.length >= 10}>
            + Add Resistor
          </button>
        </div>

        <div className="resistor-list">
          {resistors.map((resistor, index) => (
            <div key={index} className="resistor-input-row">
              <label>R{index + 1}</label>
              <div className="input-with-unit has-select">
                <input
                  type="number"
                  value={resistor.value}
                  onChange={(e) => updateResistor(index, 'value', e.target.value)}
                  placeholder="Value"
                />
                <select
                  value={resistor.unit}
                  onChange={(e) => updateResistor(index, 'unit', e.target.value)}
                >
                  <option value="Ω">Ω</option>
                  <option value="kΩ">kΩ</option>
                  <option value="MΩ">MΩ</option>
                </select>
              </div>
              {resistors.length > 2 && (
                <button className="remove-resistor-btn" onClick={() => removeResistor(index)}>×</button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="calculator-buttons">
        <button className="calculate-btn" onClick={calculate}>Calculate</button>
        <button className="reset-btn" onClick={resetCalculator}>Reset</button>
      </div>

      {error && <div className="calculator-error">{error}</div>}

      {result && (
        <div className="calculator-result series-parallel-result">
          <div className="result-label">
            Total {result.mode === 'series' ? 'Series' : 'Parallel'} Resistance ({result.count} resistors)
          </div>
          <div className="result-value">{result.formatted}</div>
          <div className="result-formula">
            {result.mode === 'series' ? (
              <span>R<sub>total</sub> = R₁ + R₂ + ... = {result.formatted}</span>
            ) : (
              <span>1/R<sub>total</sub> = 1/R₁ + 1/R₂ + ... → R<sub>total</sub> = {result.formatted}</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
