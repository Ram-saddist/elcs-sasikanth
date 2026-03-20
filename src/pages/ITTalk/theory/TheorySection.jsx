import VoltageTheory from './sections/VoltageTheory'
import ResistorColorTheory from './sections/ResistorColorTheory'
import SeriesParallelTheory from './sections/SeriesParallelTheory'
import RCFilterTheory from './sections/RCFilterTheory'
import OhmsLawTheory from './sections/OhmsLawTheory'
import CapacitorChargingTheory from './sections/CapacitorChargingTheory'
import PCBTraceTheory from './sections/PCBTraceTheory'
import BatteryLifeTheory from './sections/BatteryLifeTheory'
import OpAmpGainTheory from './sections/OpAmpGainTheory'
import Timer555Theory from './sections/Timer555Theory'
import { headingMap, commonUsesHeadingMap } from '../data/calculatorRegistry'
import './theory.css'

const theoryMap = {
  'voltage-divider': VoltageTheory,
  'resistor-color': ResistorColorTheory,
  'series-parallel': SeriesParallelTheory,
  'rc-filter': RCFilterTheory,
  'ohms-law': OhmsLawTheory,
  'capacitor-charging': CapacitorChargingTheory,
  'pcb-trace': PCBTraceTheory,
  'battery-life': BatteryLifeTheory,
  'opamp-gain': OpAmpGainTheory,
  '555-timer': Timer555Theory,
}

export default function TheorySection({ product }) {
  const { calculatorType, theory } = product
  if (!theory) return null

  const heading = headingMap[calculatorType] || 'About This Tool'
  const usesHeading = commonUsesHeadingMap[calculatorType] || 'Common Uses:'
  const TypeSpecificTheory = theoryMap[calculatorType]

  return (
    <div className="theory-section">
      <h2>{heading}</h2>
      <p className="theory-intro">{theory.whatIs}</p>

      <div className="common-uses">
        <h3>{usesHeading}</h3>
        <ol>
          {theory.commonUses.map((use, index) => (
            <li key={index}>{use}</li>
          ))}
        </ol>
      </div>

      {theory.howItWorks && (
        <div className="how-it-works">
          <h3>How It Works</h3>
          <ul>
            {theory.howItWorks.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {TypeSpecificTheory && <TypeSpecificTheory theory={theory} />}
    </div>
  )
}
