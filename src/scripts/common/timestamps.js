export function floorTimestamp(timestamp, period) {
  return Math.floor(timestamp/period) * period
}

export function ceilTimestamp(timestamp, period) {
  return Math.ceil(timestamp/period) * period
}
