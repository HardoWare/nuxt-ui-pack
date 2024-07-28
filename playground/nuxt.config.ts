export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  compatibilityDate: '2024-07-26',
  tailwindcss: {
    configPath: '~/tailwind.config.ts',
  },
  uiPack: {},
  modules: [
    '../src/module',
    '@nuxtjs/tailwindcss',
  ],
})
