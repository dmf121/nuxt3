export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ['~/assets/css/main.css'],
    modules: [
        '@element-plus/nuxt',
        '@pinia/nuxt',
    ],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    buildModules: [
      'nuxt-pinia',
      
    ],
  })