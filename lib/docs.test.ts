import { describe, it, expect } from 'vitest'
import { getApps } from './docs'

describe('docs utilities', () => {
  it('should load apps from apps.json', async () => {
    const apps = await getApps()
    expect(Array.isArray(apps)).toBe(true)
    expect(apps.length).toBeGreaterThan(0)
  })

  it('should have required app properties', async () => {
    const apps = await getApps()
    for (const app of apps) {
      expect(app).toHaveProperty('id')
      expect(app).toHaveProperty('name')
      expect(app).toHaveProperty('description')
      expect(app).toHaveProperty('icon')
    }
  })
})
