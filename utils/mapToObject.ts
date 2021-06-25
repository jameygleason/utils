// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function mapToObject(m) {
  const c = {}
  for (const [_, v] of Object.entries(Object.fromEntries(m))) {
    const k = Object.keys(v)[0]
    c[k] = v[k]
  }
  return c
}
