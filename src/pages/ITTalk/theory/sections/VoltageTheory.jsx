export default function VoltageTheory({ theory }) {
  return (
    <div className="formula-section">
      <h3>Formula</h3>
      <div className="formula-box">
        <div className="formula-main">
          Vout = Vin × <span className="fraction"><span className="numerator">R2</span><span className="denominator">R1 + R2</span></span>
        </div>
      </div>
      <div className="formula-variables">
        <p><strong>Where:</strong></p>
        {theory.formulaVariables.map((variable, index) => (
          <p key={index}><strong>{variable.symbol}</strong> = {variable.description}</p>
        ))}
      </div>
    </div>
  )
}
