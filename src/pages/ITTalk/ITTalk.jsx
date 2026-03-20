import { useState,useEffect } from 'react'
import { demoProducts } from './data/demoProducts'
import { calculatorMap } from './data/calculatorRegistry'
import TheorySection from './theory/TheorySection'
import './ITTalk.css'
import './calculators/calculators.css'

export default function ITTalk() {
  const [selectedProduct, setSelectedProduct] = useState(demoProducts[0])

  const CalculatorComponent = calculatorMap[selectedProduct.calculatorType]
  useEffect(() => {
  document.body.classList.add("ittalk-page");

  return () => {
    document.body.classList.remove("ittalk-page");
  };
}, []);
  return (
    <div className="ittalk-container">
      <div className="ittalk-header">
        <h1>Our Tools</h1>
        <p>Explore our range of electronics calculators and design tools</p>
      </div>

      <div className="ittalk-layout">
        {/* Sidebar - Product Names */}
        <div className="products-sidebar">
          <div className="sidebar-title">Tools</div>
          <ul className="product-list">
            {demoProducts.map((product) => (
              <li
                key={product.id}
                className={`product-item ${selectedProduct.id === product.id ? 'active' : ''}`}
                onClick={() => setSelectedProduct(product)}
              >
                {product.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content - Product Details */}
        <div className="product-detail-panel">
          {/* Special layout for calculators with theory */}
          {selectedProduct.hasCalculator && selectedProduct.theory ? (
            <>
              <div className="calculator-header">
                <h1>{selectedProduct.title}</h1>
              </div>

              <div className="detail-image calculator-image">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>

              <TheorySection product={selectedProduct} />

              <div className="calculator-section">
                {CalculatorComponent && <CalculatorComponent />}
              </div>
            </>
          ) : (
            <>
              <div className="detail-image">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>

              <div className="detail-info">
                <h2>{selectedProduct.name}</h2>
                <p className="detail-description">{selectedProduct.fullDescription}</p>

                <div className="detail-features">
                  <h3>Key Features</h3>
                  <ul>
                    {selectedProduct.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-specifications">
                  <h3>Specifications</h3>
                  <table>
                    <tbody>
                      {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                        <tr key={key}>
                          <td className="spec-key">{key}</td>
                          <td className="spec-value">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="detail-actions">
                  <button className="contact-btn">Contact for Quote</button>
                  <button className="download-btn">Download Datasheet</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
