export function floorTimestamp(timestamp, period) {
  return Math.floor(timestamp/period) * period
}

export function ceilTimestamp(timestamp, period) {
  return Math.ceil(timestamp/period) * period
}

export function lastHourRange() {
  let now = +new Date()
  return [now - 60*60*1000, now]
}
