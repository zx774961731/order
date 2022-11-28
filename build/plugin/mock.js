import { viteMockServe } from 'vite-plugin-mock'

export function configMockPlugin(isBuild) {
  return viteMockServe({
    mockPath: 'mock/api',
    localEnabled: !isBuild,
    prodEnabled: isBuild,
  })
}
