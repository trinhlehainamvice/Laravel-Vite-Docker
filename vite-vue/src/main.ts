declare global {
  interface Window {
    axios: AxiosStatic
    Pusher: any
    Echo: Echo
    lodash: any
  }
}
import axios, { type AxiosStatic } from 'axios'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import lodash from 'lodash'

if (import.meta.env.MODE === 'local' || import.meta.env.MODE === 'development') {
  // import './bootstrap';
  // Laravel vite プラグインはReffectのサイトを参考に導入しています
  // https://reffect.co.jp/laravel/laravel9_vite

  /**
   * We'll load the axios HTTP library which allows us to easily issue requests
   * to our Laravel back-end. This library automatically handles sending the
   * CSRF token as a header based on the value of the "XSRF" token cookie.
   * [Note]
   * ※非同期通信のモジュールです。TypeScript上でasync構文を取り扱える場合は使用しないでください
   * https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/async_function
   */

  window.axios = axios

  window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

  /**
   * Echo exposes an expressive API for subscribing to channels and listening
   * for events that are broadcast by Laravel. Echo and event broadcasting
   * allows your team to easily build robust real-time web applications.
   * [Note]
   * ※websocketのモジュールです
   */

  window.Pusher = Pusher

  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
    wsHost: import.meta.env.VITE_PUSHER_HOST
      ? import.meta.env.VITE_PUSHER_HOST
      : `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
    wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
    wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss']
  })

  /**
   * Setup Vite
   */

  window.lodash = lodash
}

import '@assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Lara from '@assets/primevue/presets/lara'
import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'
import { initializeApp } from 'firebase/app'
import { VueFire, VueFireAuth } from 'vuefire'

const firebaseApp = initializeApp({
  // TODO: load config from local env
  apiKey: 'AIzaSyBX7RPgVdsZSsUeI6V-8TSkSTxMufcRlUM',
  authDomain: 'vice-albatrus.firebaseapp.com',
  projectId: 'vice-albatrus',
  storageBucket: 'vice-albatrus.appspot.com',
  messagingSenderId: '974910874241',
  appId: '1:974910874241:web:ac7d80dea69b496d18e380'
})

// TODO: add locale picker and automatically set locale depend on user's locale
const i18n = createI18n({
  legacy: false,
  locale: 'jp',
  fallbackLocale: 'jp',
  messages
})

createApp(App)
  .use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()]
  })
  .use(PrimeVue, {
    unstyled: true,
    pt: Lara
  })
  .use(i18n)
  .use(createPinia())
  .use(router)
  .mount('#app')
