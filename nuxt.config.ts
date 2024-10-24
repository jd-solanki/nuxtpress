import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    join(currentDir, './assets/css/main.scss'),
  ],
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxt/eslint'],

  routeRules: {
    '/': { prerender: true },
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  content: {
    highlight: {
      theme: 'dracula',
    },
  },

  compatibilityDate: '2024-08-26',
})
