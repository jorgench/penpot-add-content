import { mergeConfig, UserConfig } from 'vite'
import viteConfig from './vite.config'
import { defineConfig } from 'vite'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      exclude: ['**/node_modules/**'],
      setupFiles: 'src/testSetup.ts',
      coverage: {
        provider: 'v8',
      },
    },
  } as UserConfig),
)
