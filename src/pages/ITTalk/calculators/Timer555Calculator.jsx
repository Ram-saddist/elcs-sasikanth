import { useState } from 'react'
import { toOhms, toFarads } from '../utils/unitConversions'
import { formatTime, formatFrequency } from '../utils/formatters'

export default function Timer555Calculator() {
  const [mode, setMode] = useState('monostable')
  const [r, setR] = useState('')
  const [rUnit, setRUnit] = useState('kΩ')
  const [r1, setR1] = useState('')
  const [r1Unit, setR1Unit] = useState('kΩ')
  const [r2, setR2] = useState('')
  const [r2Unit, setR2Unit] = useState('kΩ')
  const [cap, setCap] = useState('')
  const [capUnit, setCapUnit] = useState('µF')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const calculate = () => {
    setError('')
    setResult(null)

    const C = toFarads(cap, capUnit)
    if (isNaN(C) || C <= 0) {
      setError('Please enter a valid Capacitance (C > 0)')
      return
    }

    if (mode === 'monostable') {
      const R = toOhms(r, rUnit)
      if (isNaN(R) || R <= 0) {
        setError('Please enter a valid Resistance (R > 0)')
        return
      }

      const T = 1.1 * R * C

      setResult({
        mode: 'monostable',
        delay: T,
        delayFormatted: formatTime(T)
      })
    } else {
      const R1 = toOhms(r1, r1Unit)
      const R2 = toOhms(r2, r2Unit)
      if (isNaN(R1) || R1 <= 0) {
        setError('Please enter a valid R1 (> 0)')
        return
      }
      if (isNaN(R2) || R2 <= 0) {
        setError('Please enter a valid R2 (> 0)')
        return
      }

      const tHigh = 0.693 * (R1 + R2) * C
      const tLow = 0.693 * R2 * C
      const period = tHigh + tLow
      const frequency = 1 / period
      const dutyCycle = (tHigh / period) * 100

      setResult({
        mode: 'astable',
        tHigh,
        tHighFormatted: formatTime(tHigh),
        tLow,
        tLowFormatted: formatTime(tLow),
        period,
        periodFormatted: formatTime(period),
        frequency,
        frequencyFormatted: formatFrequency(frequency),
        dutyCycle: dutyCycle.toFixed(2)
      })
    }
  }

  const resetCalculator = () => {
    setR('')
    setR1('')
    setR2('')
    setCap('')
    setResult(null)
    setError('')
  }

  return (
    <div className="calculator-box timer555-calculator">
      <h3>555 Timer Calculator</h3>

      <div className="formula-display">
        <strong>{mode === 'monostable' ? 'Monostable' : 'Astable'}:</strong>{' '}
        {mode === 'monostable'
          ? 'T = 1.1 × R × C'
          : 'f = 1.44 / ((R1 + 2×R2) × C)'
        }
      </div>

      {/* Mode Selector */}
      <div className="mode-selector">
        <button
          className={`mode-btn ${mode === 'monostable' ? 'active' : ''}`}
          onClick={() => { setMode('monostable'); setResult(null); setError('') }}
        >
          <span className="mode-icon">▯</span>
          Monostable (Delay)
        </button>
        <button
          className={`mode-btn ${mode === 'astable' ? 'active' : ''}`}
          onClick={() => { setMode('astable'); setResult(null); setError('') }}
        >
          <span className="mode-icon">⊿⊿</span>
          Astable (Oscillator)
        </button>
      </div>

      {/* Circuit Info */}
      <div className="opamp-circuit-info">
        {mode === 'monostable' ? (
          <ul>
            <li>R connected between Vcc and Discharge (Pin 7)</li>
            <li>C connected from Threshold (Pin 6) to Ground</li>
            <li>Trigger at Pin 2</li>
            <li>Output at Pin 3</li>
          </ul>
        ) : (
          <ul>
            <li>R1 between Vcc and Pin 7 (Discharge)</li>
            <li>R2 between Pin 7 and Pins 6 & 2 (Threshold/Trigger)</li>
            <li>C from Pins 6 & 2 to Ground</li>
            <li>Output at Pin 3</li>
          </ul>
        )}
      </div>

      <div className="calculator-inputs">
        {mode === 'monostable' ? (
          <div className="input-group">
            <label>Resistance (R)</label>
            <div className="input-with-unit has-select">
              <input
                type="number"
                value={r}
                onChange={(e) => setR(e.target.value)}
                placeholder="Enter R"
              />
              <select value={rUnit} onChange={(e) => setRUnit(e.target.value)}>
                <option value="Ω">Ω</option>
                <option value="kΩ">kΩ</option>
                <option value="MΩ">MΩ</option>
              </select>
            </div>
          </div>
        ) : (
          <>
            <div className="input-group">
              <label>Resistor R1 (Vcc to Pin 7)</label>
              <div className="input-with-unit has-select">
                <input
                  type="number"
                  value={r1}
                  onChange={(e) => setR1(e.target.value)}
                  placeholder="Enter R1"
                />
                <select value={r1Unit} onChange={(e) => setR1Unit(e.target.value)}>
                  <option value="Ω">Ω</option>
                  <option value="kΩ">kΩ</option>
                  <option value="MΩ">MΩ</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label>Resistor R2 (Pin 7 to Pin 6/2)</label>
              <div className="input-with-unit has-select">
                <input
                  type="number"
                  value={r2}
                  onChange={(e) => setR2(e.target.value)}
                  placeholder="Enter R2"
                />
                <select value={r2Unit} onChange={(e) => setR2Unit(e.target.value)}>
                  <option value="Ω">Ω</option>
                  <option value="kΩ">kΩ</option>
                  <option value="MΩ">MΩ</option>
                </select>
              </div>
            </div>
          </>
        )}

        <div className="input-group">
          <label>Capacitance (C)</label>
          <div className="input-with-unit has-select">
            <input
              type="number"
              value={cap}
              onChange={(e) => setCap(e.target.value)}
              placeholder="Enter capacitance"
            />
            <select value={capUnit} onChange={(e) => setCapUnit(e.target.value)}>
              <option value="pF">pF</option>
              <option value="nF">nF</option>
              <option value="µF">µF</option>
              <option value="mF">mF</option>
            </select>
          </div>
        </div>
      </div>

      <div className="calculator-buttons">
        <button className="calculate-btn" onClick={calculate}>Calculate</button>
        <button className="reset-btn" onClick={resetCalculator}>Reset</button>
      </div>

      {error && <div className="calculator-error">{error}</div>}

      {result && (
        <div className="calculator-result timer555-result">
          {result.mode === 'monostable' ? (
            <>
              <div className="result-label">Time Delay (Pulse Width)</div>
              <div className="result-value">{result.delayFormatted}</div>
              <div className="result-description">Output stays HIGH for this duration after trigger</div>
            </>
          ) : (
            <>
              <div className="result-label">Oscillation Frequency</div>
              <div className="result-value">{result.frequencyFormatted}</div>

              <div className="result-divider"></div>

              <div className="timer555-details">
                <table className="tau-table">
                  <tbody>
                    <tr>
                      <td>HIGH Time (T<sub>H</sub>)</td>
                      <td><strong>{result.tHighFormatted}</strong></td>
                    </tr>
                    <tr>
                      <td>LOW Time (T<sub>L</sub>)</td>
                      <td><strong>{result.tLowFormatted}</strong></td>
                    </tr>
                    <tr>
                      <td>Total Period (T)</td>
                      <td><strong>{result.periodFormatted}</strong></td>
                    </tr>
                    <tr>
                      <td>Frequency (f)</td>
                      <td><strong>{result.frequencyFormatted}</strong></td>
                    </tr>
                    <tr>
                      <td>Duty Cycle</td>
                      <td><strong>{result.dutyCycle}%</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Duty cycle visual bar */}
              <div className="duty-cycle-bar">
                <div className="duty-label">Duty Cycle: {result.dutyCycle}%</div>
                <div className="duty-track">
                  <div className="duty-fill" style={{ width: `${result.dutyCycle}%` }}></div>
                </div>
                <div className="duty-labels">
                  <span>HIGH</span>
                  <span>LOW</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
