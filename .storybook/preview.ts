// Global CSS/SCSS for all stories
import 'primeicons/primeicons.css';
import '@/assets/scss/main.scss';

// Optional Storybook parameters
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
};

export default parameters;
