import { useState } from 'react'
import { toMah, toMa } from '../utils/unitConversions'
import { formatRuntime } from '../utils/formatters'

export default function BatteryLifeCalculator() {
  const [mode, setMode] = useState('basic')
  const [capacity, setCapacity] = useState('')
  const [capacityUnit, setCapacityUnit] = useState('mAh')
  const [loadCurrent, setLoadCurrent] = useState('')
  const [loadCurrentUnit, setLoadCurrentUnit] = useState('mA')
  const [efficiency, setEfficiency] = useState('85')
  const [batteryVoltage, setBatteryVoltage] = useState('3.7')
  const [activeCurrent, setActiveCurrent] = useState('')
  const [activeTime, setActiveTime] = useState('')
  const [sleepCurrent, setSleepCurrent] = useState('')
  const [sleepTime, setSleepTime] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const calculate = () => {
    setError('')
    setResult(null)

    const capMah = toMah(capacity, capacityUnit)
    const eff = parseFloat(efficiency) / 100
    const voltage = parseFloat(batteryVoltage)

    if (isNaN(capMah) || capMah <= 0) {
      setError('Please enter a valid Battery Capacity (> 0)')
      return
    }
    if (isNaN(eff) || eff <= 0 || eff > 1) {
      setError('Efficiency must be between 1% and 100%')
      return
    }
    if (isNaN(voltage) || voltage <= 0) {
      setError('Please enter a valid Battery Voltage')
      return
    }

    if (mode === 'basic') {
      const currentMa = toMa(loadCurrent, loadCurrentUnit)
      if (isNaN(currentMa) || currentMa <= 0) {
        setError('Please enter a valid Load Current (> 0)')
        return
      }

      const rawHours = capMah / currentMa
      const effHours = (capMah * eff) / currentMa
      const powerW = (currentMa / 1000) * voltage
      const energyWh = (capMah / 1000) * voltage

      setResult({
        mode: 'basic',
        rawHours,
        rawFormatted: formatRuntime(rawHours),
        effHours,
        effFormatted: formatRuntime(effHours),
        currentMa,
        powerW: powerW.toFixed(3),
        energyWh: energyWh.toFixed(2),
        efficiency: (eff * 100).toFixed(0)
      })
    } else {
      const iActive = parseFloat(activeCurrent)
      const tActive = parseFloat(activeTime)
      const iSleep = parseFloat(sleepCurrent)
      const tSleep = parseFloat(sleepTime)

      if (isNaN(iActive) || iActive < 0) {
        setError('Please enter a valid Active Current')
        return
      }
      if (isNaN(tActive) || tActive <= 0) {
        setError('Please enter a valid Active Time (> 0)')
        return
      }
      if (isNaN(iSleep) || iSleep < 0) {
        setError('Please enter a valid Sleep Current')
        return
      }
      if (isNaN(tSleep) || tSleep <= 0) {
        setError('Please enter a valid Sleep Time (> 0)')
        return
      }

      const totalCycle = tActive + tSleep
      const avgCurrent = ((iActive * tActive) + (iSleep * tSleep)) / totalCycle
      const rawHours = capMah / avgCurrent
      const effHours = (capMah * eff) / avgCurrent
      const powerW = (avgCurrent / 1000) * voltage
      const energyWh = (capMah / 1000) * voltage
      const dutyCycle = (tActive / totalCycle) * 100

      setResult({
        mode: 'advanced',
        avgCurrent: avgCurrent.toFixed(3),
        rawHours,
        rawFormatted: formatRuntime(rawHours),
        effHours,
        effFormatted: formatRuntime(effHours),
        powerW: powerW.toFixed(3),
        energyWh: energyWh.toFixed(2),
        dutyCycle: dutyCycle.toFixed(1),
        totalCycle,
        efficiency: (eff * 100).toFixed(0)
      })
    }
  }

  const resetCalculator = () => {
    setCapacity('')
    setLoadCurrent('')
    setEfficiency('85')
    setActiveCurrent('')
    setActiveTime('')
    setSleepCurrent('')
    setSleepTime('')
    setResult(null)
    setError('')
  }

  return (
    <div className="calculator-box battery-life-calculator">
      <h3>Battery Life Calculator</h3>

      <div className="formula-display">
        <strong>Formula:</strong> Battery Life = (Capacity × Efficiency) / Load Current
      </div>

      {/* Mode Selector */}
      <div className="mode-selector">
        <button
          className={`mode-btn ${mode === 'basic' ? 'active' : ''}`}
          onClick={() => { setMode('basic'); setResult(null); setError('') }}
        >
          <span className="mode-icon">🔋</span>
          Basic Mode
        </button>
        <button
          className={`mode-btn ${mode === 'advanced' ? 'active' : ''}`}
          onClick={() => { setMode('advanced'); setResult(null); setError('') }}
        >
          <span className="mode-icon">⚡</span>
          IoT / Duty Cycle Mode
        </button>
      </div>

      <div className="calculator-inputs">
        {/* Battery Capacity */}
        <div className="input-group">
          <label>Battery Capacity</label>
          <div className="input-with-unit has-select">
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="Enter capacity"
            />
            <select value={capacityUnit} onChange={(e) => setCapacityUnit(e.target.value)}>
              <option value="mAh">mAh</option>
              <option value="Ah">Ah</option>
            </select>
          </div>
        </div>

        {/* Battery Voltage */}
        <div className="input-group">
          <label>Battery Voltage (nominal)</label>
          <div className="input-with-unit has-select">
            <select value={batteryVoltage} onChange={(e) => setBatteryVoltage(e.target.value)} style={{ flex: 1 }}>
              <option value="3.7">Li-ion (3.7V)</option>
              <option value="3.2">LiFePO4 (3.2V)</option>
              <option value="1.2">NiMH (1.2V)</option>
              <option value="2.0">Lead-acid cell (2.0V)</option>
              <option value="12">Lead-acid 12V</option>
              <option value="5">USB / 5V</option>
            </select>
          </div>
        </div>

        {/* Efficiency */}
        <div className="input-group">
          <label>Efficiency (%)</label>
          <div className="input-with-unit">
            <input
              type="number"
              value={efficiency}
              onChange={(e) => setEfficiency(e.target.value)}
              placeholder="e.g. 85"
              min="1"
              max="100"
            />
            <span className="unit">%</span>
          </div>
        </div>

        {mode === 'basic' ? (
          <>
            {/* Basic: Load Current */}
            <div className="input-group">
              <label>Load Current</label>
              <div className="input-with-unit has-select">
                <input
                  type="number"
                  value={loadCurrent}
                  onChange={(e) => setLoadCurrent(e.target.value)}
                  placeholder="Enter current"
                />
                <select value={loadCurrentUnit} onChange={(e) => setLoadCurrentUnit(e.target.value)}>
                  <option value="mA">mA</option>
                  <option value="A">A</option>
                </select>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Advanced: Duty Cycle Inputs */}
            <div className="input-group">
              <label>Active Current</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  value={activeCurrent}
                  onChange={(e) => setActiveCurrent(e.target.value)}
                  placeholder="e.g. 80"
                />
                <span className="unit">mA</span>
              </div>
            </div>

            <div className="input-group">
              <label>Active Time (per cycle)</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  value={activeTime}
                  onChange={(e) => setActiveTime(e.target.value)}
                  placeholder="e.g. 5"
                />
                <span className="unit">sec</span>
              </div>
            </div>

            <div className="input-group">
              <label>Sleep Current</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  value={sleepCurrent}
                  onChange={(e) => setSleepCurrent(e.target.value)}
                  placeholder="e.g. 0.05"
                />
                <span className="unit">mA</span>
              </div>
            </div>

            <div className="input-group">
              <label>Sleep Time (per cycle)</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  value={sleepTime}
                  onChange={(e) => setSleepTime(e.target.value)}
                  placeholder="e.g. 55"
                />
                <span className="unit">sec</span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="calculator-buttons">
        <button className="calculate-btn" onClick={calculate}>Calculate</button>
        <button className="reset-btn" onClick={resetCalculator}>Reset</button>
      </div>

      {error && <div className="calculator-error">{error}</div>}

      {result && (
        <div className="calculator-result battery-result">
          <div className="result-label">Estimated Battery Life (with {result.efficiency}% efficiency)</div>
          <div className="result-value battery-life-value">{result.effFormatted}</div>

          <div className="result-divider"></div>

          <div className="battery-result-details">
            <table className="tau-table">
              <tbody>
                <tr>
                  <td>Ideal Runtime (100% eff.)</td>
                  <td><strong>{result.rawFormatted}</strong></td>
                </tr>
                <tr>
                  <td>Real Runtime ({result.efficiency}% eff.)</td>
                  <td><strong>{result.effFormatted}</strong></td>
                </tr>
                {result.mode === 'advanced' && (
                  <>
                    <tr>
                      <td>Average Current (I_avg)</td>
                      <td><strong>{result.avgCurrent} mA</strong></td>
                    </tr>
                    <tr>
                      <td>Duty Cycle</td>
                      <td><strong>{result.dutyCycle}%</strong></td>
                    </tr>
                    <tr>
                      <td>Cycle Period</td>
                      <td><strong>{result.totalCycle} seconds</strong></td>
                    </tr>
                  </>
                )}
                <tr>
                  <td>Power Consumption</td>
                  <td><strong>{result.powerW} W</strong></td>
                </tr>
                <tr>
                  <td>Battery Energy</td>
                  <td><strong>{result.energyWh} Wh</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pcb-warning">
            Always add 20–30% safety margin. Capacity reduces at high discharge rates and low temperatures.
          </div>
        </div>
      )}
    </div>
  )
}
