export function increaseRange([a, b], percent=30) {
  let incValue = Math.round((b - a) * (percent/100))
  return [a - incValue, b + incValue]
}
