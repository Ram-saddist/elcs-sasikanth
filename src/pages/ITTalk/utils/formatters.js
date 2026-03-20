export const formatResistance = (value) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 3)} MΩ`
  if (value >= 1000) return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 3)} kΩ`
  return `${value.toFixed(value % 1 === 0 ? 0 : 3)} Ω`
}

export const formatFrequency = (value) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(3)} MHz`
  if (value >= 1000) return `${(value / 1000).toFixed(3)} kHz`
  return `${value.toFixed(3)} Hz`
}

export const formatCapacitance = (value) => {
  if (value >= 1e-3) return `${(value * 1000).toFixed(3)} mF`
  if (value >= 1e-6) return `${(value * 1e6).toFixed(3)} µF`
  if (value >= 1e-9) return `${(value * 1e9).toFixed(3)} nF`
  return `${(value * 1e12).toFixed(3)} pF`
}

export const formatTime = (seconds) => {
  if (seconds >= 3600) return `${(seconds / 3600).toFixed(3)} hours`
  if (seconds >= 60) return `${(seconds / 60).toFixed(3)} min`
  if (seconds >= 1) return `${seconds.toFixed(4)} s`
  if (seconds >= 1e-3) return `${(seconds * 1000).toFixed(4)} ms`
  if (seconds >= 1e-6) return `${(seconds * 1e6).toFixed(4)} µs`
  return `${(seconds * 1e9).toFixed(4)} ns`
}

export const formatRuntime = (hours) => {
  if (hours < 1) return `${(hours * 60).toFixed(1)} minutes`
  if (hours < 24) return `${hours.toFixed(2)} hours`
  const days = hours / 24
  if (days < 365) return `${days.toFixed(1)} days (${hours.toFixed(1)} hours)`
  return `${(days / 365).toFixed(2)} years (${days.toFixed(0)} days)`
}
