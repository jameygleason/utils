export function mapToObject(m: Map<any, unknown>): Record<string, unknown> {
  const c: Record<string, unknown> = {}
  for (const [k, v] of m) {
    c[k] = v
  }
  return c
}
