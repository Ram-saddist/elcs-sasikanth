import { useState } from 'react'
import { milToMm, mmToMil } from '../utils/unitConversions'

export default function PCBTraceWidthCalculator() {
  const [mode, setMode] = useState('width')
  const [current, setCurrent] = useState('')
  const [traceWidth, setTraceWidth] = useState('')
  const [widthUnit, setWidthUnit] = useState('mm')
  const [copperWeight, setCopperWeight] = useState('1')
  const [tempRise, setTempRise] = useState('')
  const [layerType, setLayerType] = useState('external')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const copperThickness = { '1': 1.378, '2': 2.756, '3': 4.134 }

  const calculate = () => {
    setError('')
    setResult(null)

    const k = layerType === 'external' ? 0.048 : 0.024
    const thickness = copperThickness[copperWeight]
    const dT = parseFloat(tempRise)

    if (isNaN(dT) || dT <= 0) {
      setError('Please enter a valid Temperature Rise (> 0°C)')
      return
    }

    if (mode === 'width') {
      const I = parseFloat(current)
      if (isNaN(I) || I <= 0) {
        setError('Please enter a valid Current (> 0A)')
        return
      }

      const area = Math.pow(I / (k * Math.pow(dT, 0.44)), 1 / 0.725)
      const widthMil = area / thickness
      const widthMm = milToMm(widthMil)

      const resistivityCu = 1.724e-6
      const thicknessCm = (thickness * 0.0254) / 10
      const widthCm = widthMm / 10
      const resistancePerCm = resistivityCu / (widthCm * thicknessCm)
      const powerPerCm = I * I * resistancePerCm

      setResult({
        mode: 'width',
        widthMil: widthMil.toFixed(2),
        widthMm: widthMm.toFixed(3),
        area: area.toFixed(2),
        resistancePerCm: resistancePerCm.toFixed(4),
        powerPerCm: (powerPerCm * 1000).toFixed(3),
        current: I,
        layerType: layerType === 'external' ? 'External' : 'Internal',
        copperOz: copperWeight
      })
    } else {
      let twMil
      const twVal = parseFloat(traceWidth)
      if (isNaN(twVal) || twVal <= 0) {
        setError('Please enter a valid Trace Width (> 0)')
        return
      }
      twMil = widthUnit === 'mm' ? mmToMil(twVal) : twVal

      const area = twMil * thickness
      const maxCurrent = k * Math.pow(dT, 0.44) * Math.pow(area, 0.725)

      const widthMm = milToMm(twMil)
      const resistivityCu = 1.724e-6
      const thicknessCm = (thickness * 0.0254) / 10
      const widthCm = widthMm / 10
      const resistancePerCm = resistivityCu / (widthCm * thicknessCm)
      const powerPerCm = maxCurrent * maxCurrent * resistancePerCm

      setResult({
        mode: 'current',
        maxCurrent: maxCurrent.toFixed(3),
        area: area.toFixed(2),
        widthMil: twMil.toFixed(2),
        widthMm: widthMm.toFixed(3),
        resistancePerCm: resistancePerCm.toFixed(4),
        powerPerCm: (powerPerCm * 1000).toFixed(3),
        layerType: layerType === 'external' ? 'External' : 'Internal',
        copperOz: copperWeight
      })
    }
  }

  const resetCalculator = () => {
    setCurrent('')
    setTraceWidth('')
    setTempRise('')
    setResult(null)
    setError('')
  }

  return (
    <div className="calculator-box pcb-trace-calculator">
      <h3>PCB Trace Width & Current Calculator</h3>

      <div className="formula-display">
        <strong>IPC-2221:</strong> I = k × ΔT<sup>0.44</sup> × A<sup>0.725</sup>
      </div>

      {/* Mode Selector */}
      <div className="mode-selector">
        <button
          className={`mode-btn ${mode === 'width' ? 'active' : ''}`}
          onClick={() => { setMode('width'); setResult(null); setError('') }}
        >
          <span className="mode-icon">↔</span>
          Find Trace Width
        </button>
        <button
          className={`mode-btn ${mode === 'current' ? 'active' : ''}`}
          onClick={() => { setMode('current'); setResult(null); setError('') }}
        >
          <span className="mode-icon">⚡</span>
          Find Max Current
        </button>
      </div>

      <div className="calculator-inputs">
        {mode === 'width' ? (
          <div className="input-group">
            <label>Current (I)</label>
            <div className="input-with-unit">
              <input
                type="number"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                placeholder="Enter current"
              />
              <span className="unit">A</span>
            </div>
          </div>
        ) : (
          <div className="input-group">
            <label>Trace Width</label>
            <div className="input-with-unit has-select">
              <input
                type="number"
                value={traceWidth}
                onChange={(e) => setTraceWidth(e.target.value)}
                placeholder="Enter width"
              />
              <select value={widthUnit} onChange={(e) => setWidthUnit(e.target.value)}>
                <option value="mm">mm</option>
                <option value="mil">mil</option>
              </select>
            </div>
          </div>
        )}

        <div className="input-group">
          <label>Copper Thickness</label>
          <div className="input-with-unit has-select">
            <select value={copperWeight} onChange={(e) => setCopperWeight(e.target.value)} style={{ flex: 1 }}>
              <option value="1">1 oz (35 µm)</option>
              <option value="2">2 oz (70 µm)</option>
              <option value="3">3 oz (105 µm)</option>
            </select>
          </div>
        </div>

        <div className="input-group">
          <label>Temperature Rise (ΔT)</label>
          <div className="input-with-unit">
            <input
              type="number"
              value={tempRise}
              onChange={(e) => setTempRise(e.target.value)}
              placeholder="Enter temp rise"
            />
            <span className="unit">°C</span>
          </div>
        </div>

        <div className="input-group">
          <label>Layer Type</label>
          <div className="layer-toggle">
            <button
              className={`layer-btn ${layerType === 'external' ? 'active external' : ''}`}
              onClick={() => setLayerType('external')}
            >External Layer</button>
            <button
              className={`layer-btn ${layerType === 'internal' ? 'active internal' : ''}`}
              onClick={() => setLayerType('internal')}
            >Internal Layer</button>
          </div>
        </div>
      </div>

      <div className="calculator-buttons">
        <button className="calculate-btn" onClick={calculate}>Calculate</button>
        <button className="reset-btn" onClick={resetCalculator}>Reset</button>
      </div>

      {error && <div className="calculator-error">{error}</div>}

      {result && (
        <div className="calculator-result pcb-result">
          {result.mode === 'width' ? (
            <>
              <div className="result-label">Required Trace Width</div>
              <div className="result-value">{result.widthMm} <span>mm</span></div>
              <div className="result-description">{result.widthMil} mil</div>
            </>
          ) : (
            <>
              <div className="result-label">Maximum Current</div>
              <div className="result-value">{result.maxCurrent} <span>A</span></div>
            </>
          )}

          <div className="result-divider"></div>

          <div className="pcb-result-details">
            <table className="tau-table">
              <tbody>
                <tr>
                  <td>Cross-sectional Area</td>
                  <td><strong>{result.area} mil²</strong></td>
                </tr>
                <tr>
                  <td>Trace Width</td>
                  <td><strong>{result.widthMm} mm ({result.widthMil} mil)</strong></td>
                </tr>
                <tr>
                  <td>Resistance per cm</td>
                  <td><strong>{result.resistancePerCm} Ω/cm</strong></td>
                </tr>
                <tr>
                  <td>Power Dissipation per cm</td>
                  <td><strong>{result.powerPerCm} mW/cm</strong></td>
                </tr>
                <tr>
                  <td>Layer Type</td>
                  <td><strong>{result.layerType}</strong></td>
                </tr>
                <tr>
                  <td>Copper Weight</td>
                  <td><strong>{result.copperOz} oz</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pcb-warning">
            IPC-2221 values are conservative. Add 20–30% safety margin for production designs.
          </div>
        </div>
      )}
    </div>
  )
}
