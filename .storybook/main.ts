import { StorybookConfig } from "@storybook/vue3-vite";
import { mergeConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(ts|js)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [vue()],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../"),
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: '@import "@/assets/scss/_variables.scss";',
          },
        },
      },
    });
  },
};

export default config;
