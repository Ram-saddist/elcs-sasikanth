import { useState } from 'react'
import { toOhms } from '../utils/unitConversions'
import { formatResistance } from '../utils/formatters'

export default function OpAmpGainCalculator() {
  const [ampType, setAmpType] = useState('inverting')
  const [vin, setVin] = useState('')
  const [rf, setRf] = useState('')
  const [rfUnit, setRfUnit] = useState('kΩ')
  const [rin, setRin] = useState('')
  const [rinUnit, setRinUnit] = useState('kΩ')
  const [supplyPos, setSupplyPos] = useState('12')
  const [supplyNeg, setSupplyNeg] = useState('-12')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const calculate = () => {
    setError('')
    setResult(null)

    const vinVal = parseFloat(vin)
    const rfOhms = toOhms(rf, rfUnit)
    const rinOhms = toOhms(rin, rinUnit)
    const vPos = parseFloat(supplyPos)
    const vNeg = parseFloat(supplyNeg)

    if (isNaN(vinVal)) {
      setError('Please enter a valid Input Voltage (Vin)')
      return
    }
    if (isNaN(rfOhms) || rfOhms <= 0) {
      setError('Please enter a valid Feedback Resistor (Rf > 0)')
      return
    }
    if (isNaN(rinOhms) || rinOhms <= 0) {
      setError(`Please enter a valid ${ampType === 'inverting' ? 'Input Resistor (Rin)' : 'Ground Resistor (Rg)'} > 0`)
      return
    }
    if (isNaN(vPos) || isNaN(vNeg)) {
      setError('Please enter valid supply voltages')
      return
    }

    let gain, vout
    if (ampType === 'inverting') {
      gain = -(rfOhms / rinOhms)
      vout = gain * vinVal
    } else {
      gain = 1 + (rfOhms / rinOhms)
      vout = gain * vinVal
    }

    const gainDb = 20 * Math.log10(Math.abs(gain))
    const clipped = vout > vPos || vout < vNeg
    const clippedVout = clipped ? (vout > vPos ? vPos : vNeg) : vout

    setResult({
      gain: gain.toFixed(4),
      gainAbs: Math.abs(gain).toFixed(4),
      gainDb: gainDb.toFixed(2),
      vout: vout.toFixed(4),
      clippedVout: clippedVout.toFixed(4),
      clipped,
      ampType: ampType === 'inverting' ? 'Inverting' : 'Non-Inverting',
      rfOhms: formatResistance(rfOhms),
      rinOhms: formatResistance(rinOhms),
      vinVal,
      phaseShift: ampType === 'inverting' ? '180°' : '0° (in phase)'
    })
  }

  const resetCalculator = () => {
    setVin('')
    setRf('')
    setRin('')
    setResult(null)
    setError('')
  }

  return (
    <div className="calculator-box opamp-calculator">
      <h3>Op-Amp Voltage & Gain Calculator</h3>

      <div className="formula-display">
        <strong>{ampType === 'inverting' ? 'Inverting' : 'Non-Inverting'}:</strong>{' '}
        {ampType === 'inverting'
          ? <>Av = –Rf / Rin &nbsp;|&nbsp; Vout = –(Rf / Rin) × Vin</>
          : <>Av = 1 + Rf / Rg &nbsp;|&nbsp; Vout = (1 + Rf / Rg) × Vin</>
        }
      </div>

      {/* Amplifier Type Selector */}
      <div className="mode-selector">
        <button
          className={`mode-btn ${ampType === 'inverting' ? 'active' : ''}`}
          onClick={() => { setAmpType('inverting'); setResult(null); setError('') }}
        >
          <span className="mode-icon">⊖</span>
          Inverting
        </button>
        <button
          className={`mode-btn ${ampType === 'noninverting' ? 'active' : ''}`}
          onClick={() => { setAmpType('noninverting'); setResult(null); setError('') }}
        >
          <span className="mode-icon">⊕</span>
          Non-Inverting
        </button>
      </div>

      {/* Circuit Description */}
      <div className="opamp-circuit-info">
        {ampType === 'inverting' ? (
          <ul>
            <li>Vin → Rin → (–) terminal</li>
            <li>Rf from Output to (–) terminal</li>
            <li>(+) terminal connected to Ground</li>
          </ul>
        ) : (
          <ul>
            <li>Vin → (+) terminal</li>
            <li>Rf from Output to (–) terminal</li>
            <li>Rg from (–) terminal to Ground</li>
          </ul>
        )}
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
          <label>Feedback Resistor (Rf)</label>
          <div className="input-with-unit has-select">
            <input
              type="number"
              value={rf}
              onChange={(e) => setRf(e.target.value)}
              placeholder="Enter Rf"
            />
            <select value={rfUnit} onChange={(e) => setRfUnit(e.target.value)}>
              <option value="Ω">Ω</option>
              <option value="kΩ">kΩ</option>
              <option value="MΩ">MΩ</option>
            </select>
          </div>
        </div>

        <div className="input-group">
          <label>{ampType === 'inverting' ? 'Input Resistor (Rin)' : 'Ground Resistor (Rg)'}</label>
          <div className="input-with-unit has-select">
            <input
              type="number"
              value={rin}
              onChange={(e) => setRin(e.target.value)}
              placeholder={ampType === 'inverting' ? 'Enter Rin' : 'Enter Rg'}
            />
            <select value={rinUnit} onChange={(e) => setRinUnit(e.target.value)}>
              <option value="Ω">Ω</option>
              <option value="kΩ">kΩ</option>
              <option value="MΩ">MΩ</option>
            </select>
          </div>
        </div>

        <div className="input-group">
          <label>Supply Voltage (V+ / V–)</label>
          <div className="supply-voltage-row">
            <div className="input-with-unit">
              <input
                type="number"
                value={supplyPos}
                onChange={(e) => setSupplyPos(e.target.value)}
                placeholder="V+"
              />
              <span className="unit">V+</span>
            </div>
            <div className="input-with-unit">
              <input
                type="number"
                value={supplyNeg}
                onChange={(e) => setSupplyNeg(e.target.value)}
                placeholder="V–"
              />
              <span className="unit">V–</span>
            </div>
          </div>
        </div>
      </div>

      <div className="calculator-buttons">
        <button className="calculate-btn" onClick={calculate}>Calculate</button>
        <button className="reset-btn" onClick={resetCalculator}>Reset</button>
      </div>

      {error && <div className="calculator-error">{error}</div>}

      {result && (
        <div className={`calculator-result opamp-result ${result.clipped ? 'has-warning' : ''}`}>
          <div className="result-label">Voltage Gain (Av)</div>
          <div className="result-value">{result.gain}</div>
          <div className="result-description">{result.gainDb} dB &nbsp;|&nbsp; Phase: {result.phaseShift}</div>

          <div className="result-divider"></div>

          <div className="result-label">Output Voltage (Vout)</div>
          <div className="result-value">{result.clipped ? result.clippedVout : result.vout} <span>V</span></div>

          {result.clipped && (
            <div className="opamp-clip-warning">
              Output clipped! Calculated Vout = {result.vout}V exceeds supply rails ({supplyNeg}V to +{supplyPos}V). Output is limited to {result.clippedVout}V.
            </div>
          )}

          <div className="result-divider"></div>

          <div className="opamp-result-details">
            <table className="tau-table">
              <tbody>
                <tr>
                  <td>Configuration</td>
                  <td><strong>{result.ampType}</strong></td>
                </tr>
                <tr>
                  <td>Voltage Gain (Av)</td>
                  <td><strong>{result.gain}</strong></td>
                </tr>
                <tr>
                  <td>|Gain| (absolute)</td>
                  <td><strong>{result.gainAbs}</strong></td>
                </tr>
                <tr>
                  <td>Gain in dB</td>
                  <td><strong>{result.gainDb} dB</strong></td>
                </tr>
                <tr>
                  <td>Phase Shift</td>
                  <td><strong>{result.phaseShift}</strong></td>
                </tr>
                <tr>
                  <td>Feedback Resistor (Rf)</td>
                  <td><strong>{result.rfOhms}</strong></td>
                </tr>
                <tr>
                  <td>{ampType === 'inverting' ? 'Input Resistor (Rin)' : 'Ground Resistor (Rg)'}</td>
                  <td><strong>{result.rinOhms}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
