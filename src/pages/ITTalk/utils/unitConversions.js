export const toOhms = (value, unit) => {
  const n = parseFloat(value)
  if (isNaN(n)) return NaN
  switch (unit) {
    case 'kΩ': return n * 1000
    case 'MΩ': return n * 1000000
    default: return n
  }
}

export const toFarads = (value, unit) => {
  const n = parseFloat(value)
  if (isNaN(n)) return NaN
  switch (unit) {
    case 'pF': return n * 1e-12
    case 'nF': return n * 1e-9
    case 'µF': return n * 1e-6
    case 'mF': return n * 1e-3
    default: return n
  }
}

export const toBaseUnit = (value, unit, type) => {
  const n = parseFloat(value)
  if (isNaN(n)) return NaN
  if (type === 'resistance') return toOhms(value, unit)
  if (type === 'capacitance') return toFarads(value, unit)
  if (type === 'frequency') {
    switch (unit) {
      case 'kHz': return n * 1000
      case 'MHz': return n * 1000000
      default: return n
    }
  }
  return n
}

export const toMa = (value, unit) => {
  const n = parseFloat(value)
  if (isNaN(n)) return NaN
  return unit === 'A' ? n * 1000 : n
}

export const toMah = (value, unit) => {
  const n = parseFloat(value)
  if (isNaN(n)) return NaN
  return unit === 'Ah' ? n * 1000 : n
}

export const milToMm = (mil) => mil * 0.0254
export const mmToMil = (mm) => mm / 0.0254
