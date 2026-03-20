import { useState } from 'react'

export default function ResistorColorCodeCalculator() {
  const [bandCount, setBandCount] = useState(4)
  const [band1, setBand1] = useState('brown')
  const [band2, setBand2] = useState('black')
  const [band3, setBand3] = useState('brown') // For 5/6 band - 3rd digit
  const [multiplier, setMultiplier] = useState('red')
  const [tolerance, setTolerance] = useState('gold')
  const [tempCoef, setTempCoef] = useState('brown') // For 6 band
  const [result, setResult] = useState(null)

  // Color code values
  const colorValues = {
    black: 0, brown: 1, red: 2, orange: 3, yellow: 4,
    green: 5, blue: 6, violet: 7, grey: 8, white: 9
  }

  const multiplierValues = {
    black: 1, brown: 10, red: 100, orange: 1000, yellow: 10000,
    green: 100000, blue: 1000000, violet: 10000000, grey: 100000000, white: 1000000000,
    gold: 0.1, silver: 0.01
  }

  const toleranceValues = {
    brown: 1, red: 2, green: 0.5, blue: 0.25, violet: 0.1,
    grey: 0.05, gold: 5, silver: 10
  }

  const tempCoefValues = {
    brown: 100, red: 50, orange: 15, yellow: 25, blue: 10, violet: 5
  }

  // Color display values (actual CSS colors)
  const colorDisplay = {
    black: '#000000', brown: '#8B4513', red: '#FF0000', orange: '#FFA500',
    yellow: '#FFD700', green: '#008000', blue: '#0000FF', violet: '#9400D3',
    grey: '#808080', white: '#FFFFFF', gold: '#FFD700', silver: '#C0C0C0'
  }

  const digitColors = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white']
  const multiplierColors = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white', 'gold', 'silver']
  const toleranceColors = ['brown', 'red', 'green', 'blue', 'violet', 'grey', 'gold', 'silver']
  const tempCoefColors = ['brown', 'red', 'orange', 'yellow', 'blue', 'violet']

  const formatResistance = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 2)} MΩ`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 2)} kΩ`
    } else if (value < 1) {
      return `${(value * 1000).toFixed(2)} mΩ`
    }
    return `${value.toFixed(value % 1 === 0 ? 0 : 2)} Ω`
  }

  const calculate = () => {
    let digits
    if (bandCount === 4) {
      digits = colorValues[band1] * 10 + colorValues[band2]
    } else {
      digits = colorValues[band1] * 100 + colorValues[band2] * 10 + colorValues[band3]
    }

    const resistance = digits * multiplierValues[multiplier]
    const tolerancePercent = toleranceValues[tolerance]
    const minValue = resistance * (1 - tolerancePercent / 100)
    const maxValue = resistance * (1 + tolerancePercent / 100)

    let resultData = {
      resistance: formatResistance(resistance),
      rawResistance: resistance,
      tolerance: tolerancePercent,
      minValue: formatResistance(minValue),
      maxValue: formatResistance(maxValue)
    }

    if (bandCount === 6) {
      resultData.tempCoef = tempCoefValues[tempCoef]
    }

    setResult(resultData)
  }

  const resetCalculator = () => {
    setBand1('brown')
    setBand2('black')
    setBand3('brown')
    setMultiplier('red')
    setTolerance('gold')
    setTempCoef('brown')
    setResult(null)
  }

  // Get current band colors for visual display
  const getBandColors = () => {
    const bands = [band1, band2]
    if (bandCount >= 5) bands.push(band3)
    bands.push(multiplier)
    bands.push(tolerance)
    if (bandCount === 6) bands.push(tempCoef)
    return bands
  }

  return (
    <div className="calculator-box resistor-calculator">
      <h3>Resistor Color Code Calculator</h3>

      {/* Visual Resistor Display */}
      <div className="resistor-visual">
        <div className="resistor-body">
          <div className="resistor-lead left"></div>
          <div className="resistor-bands">
            {getBandColors().map((color, index) => (
              <div
                key={index}
                className="resistor-band"
                style={{ backgroundColor: colorDisplay[color] }}
                title={color}
              ></div>
            ))}
          </div>
          <div className="resistor-lead right"></div>
        </div>
      </div>

      {/* Band Count Selector */}
      <div className="band-count-section">
        <label>Number of Bands:</label>
        <div className="band-options">
          <button
            className={`band-btn ${bandCount === 4 ? 'active' : ''}`}
            onClick={() => setBandCount(4)}
          >4 Band</button>
          <button
            className={`band-btn ${bandCount === 5 ? 'active' : ''}`}
            onClick={() => setBandCount(5)}
          >5 Band</button>
          <button
            className={`band-btn ${bandCount === 6 ? 'active' : ''}`}
            onClick={() => setBandCount(6)}
          >6 Band</button>
        </div>
      </div>

      {/* Color Selectors */}
      <div className="color-selectors">
        <div className="color-group">
          <label>Band 1 (1st Digit)</label>
          <div className="color-buttons">
            {digitColors.map(color => (
              <button
                key={color}
                className={`color-btn ${band1 === color ? 'selected' : ''}`}
                style={{ backgroundColor: colorDisplay[color] }}
                onClick={() => setBand1(color)}
                title={`${color} (${colorValues[color]})`}
              >
                {band1 === color && <span className="checkmark">✓</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="color-group">
          <label>Band 2 (2nd Digit)</label>
          <div className="color-buttons">
            {digitColors.map(color => (
              <button
                key={color}
                className={`color-btn ${band2 === color ? 'selected' : ''}`}
                style={{ backgroundColor: colorDisplay[color] }}
                onClick={() => setBand2(color)}
                title={`${color} (${colorValues[color]})`}
              >
                {band2 === color && <span className="checkmark">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {bandCount >= 5 && (
          <div className="color-group">
            <label>Band 3 (3rd Digit)</label>
            <div className="color-buttons">
              {digitColors.map(color => (
                <button
                  key={color}
                  className={`color-btn ${band3 === color ? 'selected' : ''}`}
                  style={{ backgroundColor: colorDisplay[color] }}
                  onClick={() => setBand3(color)}
                  title={`${color} (${colorValues[color]})`}
                >
                  {band3 === color && <span className="checkmark">✓</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="color-group">
          <label>Multiplier</label>
          <div className="color-buttons">
            {multiplierColors.map(color => (
              <button
                key={color}
                className={`color-btn ${multiplier === color ? 'selected' : ''}`}
                style={{ backgroundColor: colorDisplay[color] }}
                onClick={() => setMultiplier(color)}
                title={`${color} (×${multiplierValues[color]})`}
              >
                {multiplier === color && <span className="checkmark">✓</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="color-group">
          <label>Tolerance</label>
          <div className="color-buttons">
            {toleranceColors.map(color => (
              <button
                key={color}
                className={`color-btn ${tolerance === color ? 'selected' : ''}`}
                style={{ backgroundColor: colorDisplay[color] }}
                onClick={() => setTolerance(color)}
                title={`${color} (±${toleranceValues[color]}%)`}
              >
                {tolerance === color && <span className="checkmark">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {bandCount === 6 && (
          <div className="color-group">
            <label>Temperature Coefficient</label>
            <div className="color-buttons">
              {tempCoefColors.map(color => (
                <button
                  key={color}
                  className={`color-btn ${tempCoef === color ? 'selected' : ''}`}
                  style={{ backgroundColor: colorDisplay[color] }}
                  onClick={() => setTempCoef(color)}
                  title={`${color} (${tempCoefValues[color]} ppm/°C)`}
                >
                  {tempCoef === color && <span className="checkmark">✓</span>}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Color Reference Table */}
      <div className="color-reference">
        <h4>Color Code Reference</h4>
        <div className="reference-table">
          {digitColors.map(color => (
            <div key={color} className="reference-item">
              <span className="ref-color" style={{ backgroundColor: colorDisplay[color] }}></span>
              <span className="ref-name">{color}</span>
              <span className="ref-value">{colorValues[color]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="calculator-buttons">
        <button className="calculate-btn" onClick={calculate}>Calculate</button>
        <button className="reset-btn" onClick={resetCalculator}>Reset</button>
      </div>

      {result && (
        <div className="calculator-result resistor-result">
          <div className="result-main">
            <div className="result-label">Resistance Value</div>
            <div className="result-value">{result.resistance}</div>
          </div>
          <div className="result-details">
            <div className="result-detail-item">
              <span className="detail-label">Tolerance:</span>
              <span className="detail-value">±{result.tolerance}%</span>
            </div>
            <div className="result-detail-item">
              <span className="detail-label">Range:</span>
              <span className="detail-value">{result.minValue} - {result.maxValue}</span>
            </div>
            {result.tempCoef && (
              <div className="result-detail-item">
                <span className="detail-label">Temp Coefficient:</span>
                <span className="detail-value">{result.tempCoef} ppm/°C</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
