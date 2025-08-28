import type { StorybookConfig } from '@storybook-vue/nuxt';

const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  "framework": {
    "name": "@storybook-vue/nuxt",
    "options": {}
  }
};
export default config;
