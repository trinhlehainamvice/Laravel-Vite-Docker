import { fileURLToPath, URL } from 'node:url'
import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { dirname, resolve } from 'node:path'
import laravel from 'laravel-vite-plugin'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config: UserConfig = {}
  config.plugins = [
    vue(),
    VueDevTools(),
    VueI18nPlugin({
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/assets/locales/**')
    })
  ]

  if (mode === 'production') {
    config.server = {
      hmr: { host: process.env.APP_URL },
      host: process.env.APP_URL
    }
  } else if (mode === 'local' || mode === 'development') {
    config.server = {
      hmr: {
        host: process.env.APP_URL
      },
      watch: {
        usePolling: true
      }
    }
  }
  config.plugins.push(laravel({ input: ['./src/main.ts'] }))

  config.resolve = {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@fontawesome': fileURLToPath(new URL('./src/assets/fontawesome', import.meta.url)),
      '@ui': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      '@use': fileURLToPath(new URL('./src/composables', import.meta.url)),
      '@plugins': fileURLToPath(new URL('./src/plugins', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url))
    }
  }

  return config
})
