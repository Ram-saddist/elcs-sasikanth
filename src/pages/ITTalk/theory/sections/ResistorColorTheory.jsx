export default function ResistorColorTheory({ theory }) {
  return (
    <>
      <div className="formula-section">
        <h3>Resistance Value Formula</h3>
        <div className="formula-box color-code-formula">
          <div className="formula-subtitle">For a 4-Band Resistor:</div>
          <div className="formula-main">
            Resistance = (D1 × 10 + D2) × Multiplier
          </div>
          <div className="formula-subtitle" style={{marginTop: '15px'}}>For a 5/6-Band Resistor:</div>
          <div className="formula-main">
            Resistance = (D1 × 100 + D2 × 10 + D3) × Multiplier
          </div>
        </div>
        <div className="formula-variables">
          <p><strong>Where:</strong></p>
          {theory.formulaVariables.map((variable, index) => (
            <p key={index}><strong>{variable.symbol}</strong> = {variable.description}</p>
          ))}
          <p style={{marginTop: '10px', color: '#888', fontSize: '0.9rem'}}><em>Note: Tolerance is applied separately to determine the resistance range.</em></p>
        </div>
      </div>

      <div className="orientation-section">
        <h3>Resistor Orientation (Very Important)</h3>
        <div className="orientation-box">
          <ul>
            <li>The <strong>tolerance band (Gold/Silver)</strong> is always placed at the <strong>right side</strong></li>
            <li>Read the resistor from <strong>left to right</strong></li>
            <li>If one band is spaced farther from others → that is the tolerance band</li>
          </ul>
        </div>
      </div>

      <div className="band-types-section">
        <h3>How the Resistor Color Code Works</h3>
        <p className="section-intro">A resistor typically has <strong>4, 5, or 6 color bands</strong>.</p>

        <div className="band-types-grid">
          <div className="band-type-card">
            <h4>4-Band Resistor (Most Common)</h4>
            <ol>
              <li><strong>1st Band</strong> – First significant digit</li>
              <li><strong>2nd Band</strong> – Second significant digit</li>
              <li><strong>3rd Band</strong> – Multiplier</li>
              <li><strong>4th Band</strong> – Tolerance</li>
            </ol>
          </div>
          <div className="band-type-card">
            <h4>5-Band Resistor (High Precision)</h4>
            <ol>
              <li><strong>1st Band</strong> – First digit</li>
              <li><strong>2nd Band</strong> – Second digit</li>
              <li><strong>3rd Band</strong> – Third digit</li>
              <li><strong>4th Band</strong> – Multiplier</li>
              <li><strong>5th Band</strong> – Tolerance</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="color-mapping-section">
        <h3>Color to Number Mapping</h3>
        <p className="section-intro">Each color represents a number and multiplier:</p>

        <div className="color-tables-wrapper">
          <div className="color-table-container">
            <table className="color-mapping-table">
              <thead>
                <tr>
                  <th>Color</th>
                  <th>Digit</th>
                  <th>Multiplier</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><span className="color-dot" style={{backgroundColor: '#000000'}}></span> Black</td><td>0</td><td>×10⁰</td></tr>
                <tr><td><span className="color-dot" style={{backgroundColor: '#8B4513'}}></span> Brown</td><td>1</td><td>×10¹</td></tr>
                <tr><td><span className="color-dot" style={{backgroundColor: '#FF0000'}}></span> Red</td><td>2</td><td>×10²</td></tr>
                <tr><td><span className="color-dot" style={{backgroundColor: '#FFA500'}}></span> Orange</td><td>3</td><td>×10³</td></tr>
                <tr><td><span className="color-dot" style={{backgroundColor: '#FFD700'}}></span> Yellow</td><td>4</td><td>×10⁴</td></tr>
                <tr><td><span className="color-dot" style={{backgroundColor: '#008000'}}></span> Green</td><td>5</td><td>×10⁵</td></tr>
                <tr><td><span className="color-dot" style={{backgroundColor: '#0000FF'}}></span> Blue</td><td>6</td><td>×10⁶</td></tr>
                <tr><td><span className="color-dot" style={{backgroundColor: '#9400D3'}}></span> Violet</td><td>7</td><td>×10⁷</td></tr>
                <tr><td><span className="color-dot" style={{backgroundColor: '#808080'}}></span> Grey</td><td>8</td><td>×10⁸</td></tr>
                <tr><td><span className="color-dot" style={{backgroundColor: '#FFFFFF', border: '1px solid #666'}}></span> White</td><td>9</td><td>×10⁹</td></tr>
              </tbody>
            </table>
          </div>

          <div className="color-table-container">
            <h4>Tolerance Band</h4>
            <table className="color-mapping-table tolerance-table">
              <thead>
                <tr>
                  <th>Color</th>
                  <th>Tolerance</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><span className="color-dot" style={{backgroundColor: '#8B4513'}}></span> Brown</td><td>±1%</td></tr>
                <tr><td><span className="color-dot" style={{backgroundColor: '#FF0000'}}></span> Red</td><td>±2%</td></tr>
                <tr><td><span className="color-dot" style={{backgroundColor: '#FFD700'}}></span> Gold</td><td>±5%</td></tr>
                <tr><td><span className="color-dot" style={{backgroundColor: '#C0C0C0'}}></span> Silver</td><td>±10%</td></tr>
                <tr><td><span className="color-dot" style={{backgroundColor: 'transparent', border: '2px dashed #666'}}></span> No band</td><td>±20%</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="example-section">
        <h3>Example Calculation</h3>
        <div className="example-box">
          <div className="example-resistor-bands">
            <span className="example-band" style={{backgroundColor: '#8B4513'}}></span>
            <span className="example-band" style={{backgroundColor: '#000000'}}></span>
            <span className="example-band" style={{backgroundColor: '#FF0000'}}></span>
            <span className="example-band" style={{backgroundColor: '#FFD700'}}></span>
          </div>
          <p className="example-colors">Color Bands: <strong>Brown – Black – Red – Gold</strong></p>

          <table className="example-table">
            <thead>
              <tr>
                <th>Band</th>
                <th>Color</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1st</td>
                <td><span className="color-dot" style={{backgroundColor: '#8B4513'}}></span> Brown</td>
                <td>1</td>
              </tr>
              <tr>
                <td>2nd</td>
                <td><span className="color-dot" style={{backgroundColor: '#000000'}}></span> Black</td>
                <td>0</td>
              </tr>
              <tr>
                <td>3rd (Multiplier)</td>
                <td><span className="color-dot" style={{backgroundColor: '#FF0000'}}></span> Red</td>
                <td>×100</td>
              </tr>
              <tr>
                <td>4th (Tolerance)</td>
                <td><span className="color-dot" style={{backgroundColor: '#FFD700'}}></span> Gold</td>
                <td>±5%</td>
              </tr>
            </tbody>
          </table>

          <div className="example-calculation-box">
            <div className="calc-title">Calculation:</div>
            <div className="calc-formula">(1 × 10 + 0) × 100 = 1000Ω = <strong>1kΩ</strong></div>
          </div>

          <div className="example-result">
            <span className="result-arrow">→</span>
            <span className="result-text"><strong>1kΩ ±5%</strong></span>
          </div>
        </div>
      </div>
    </>
  )
}
