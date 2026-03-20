import VoltageDividerCalculator from '../calculators/VoltageDividerCalculator'
import ResistorColorCodeCalculator from '../calculators/ResistorColorCodeCalculator'
import SeriesParallelCalculator from '../calculators/SeriesParallelCalculator'
import RCFilterCalculator from '../calculators/RCFilterCalculator'
import OhmsLawCalculator from '../calculators/OhmsLawCalculator'
import CapacitorChargingCalculator from '../calculators/CapacitorChargingCalculator'
import PCBTraceWidthCalculator from '../calculators/PCBTraceWidthCalculator'
import BatteryLifeCalculator from '../calculators/BatteryLifeCalculator'
import OpAmpGainCalculator from '../calculators/OpAmpGainCalculator'
import Timer555Calculator from '../calculators/Timer555Calculator'

export const calculatorMap = {
  'voltage-divider': VoltageDividerCalculator,
  'resistor-color': ResistorColorCodeCalculator,
  'series-parallel': SeriesParallelCalculator,
  'rc-filter': RCFilterCalculator,
  'ohms-law': OhmsLawCalculator,
  'capacitor-charging': CapacitorChargingCalculator,
  'pcb-trace': PCBTraceWidthCalculator,
  'battery-life': BatteryLifeCalculator,
  'opamp-gain': OpAmpGainCalculator,
  '555-timer': Timer555Calculator,
}

export const headingMap = {
  'voltage-divider': 'What is a Voltage Divider?',
  'resistor-color': 'What is Resistor Color Code?',
  'series-parallel': 'What are Series and Parallel Resistors?',
  'rc-filter': 'What is an RC Filter?',
  'ohms-law': "What is Ohm's Law?",
  'capacitor-charging': 'What is Capacitor Charging?',
  'pcb-trace': 'What is PCB Trace Width?',
  'battery-life': 'What is Battery Life?',
  'opamp-gain': 'What is an Operational Amplifier (Op-Amp)?',
  '555-timer': 'What is a 555 Timer IC?',
}

export const commonUsesHeadingMap = {
  'voltage-divider': 'It is commonly used in:',
  'resistor-color': 'Common Applications:',
  'series-parallel': 'Understanding these configurations is essential for:',
  'rc-filter': 'Common Applications:',
  'ohms-law': "Common Uses of Ohm's Law:",
  'capacitor-charging': 'Applications of RC Charging Circuits:',
  'pcb-trace': 'Applications of PCB Trace Width Design:',
  'battery-life': 'Common Applications:',
  'opamp-gain': 'Op-Amp Applications:',
  '555-timer': '555 Timer Applications:',
}
