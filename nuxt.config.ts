// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: false },
  modules: ["@pinia/nuxt", "@nuxtjs/storybook", "pinia-plugin-persistedstate/nuxt"],
  css: ["primeicons/primeicons.css", '@/assets/scss/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/_variables.scss";',
        },
      },
    },
  },
});
