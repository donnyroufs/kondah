export function isClass(v) {
  return typeof v === 'function' && /^\s*class\s+/.test(v.toString())
}
