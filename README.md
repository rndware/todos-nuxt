# Nuxt 3 Todo App

A simple Nuxt 3 Todo App.

<img src="https://github.com/rndware/todos-nuxt/blob/master/media/play.gif" width="65%"/>

- Created using Vue3, Nuxt.js, TypeScript and Pinia
- Sass uses [BEM](https://getbem.com/) like syntax
- Components follow [Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/)
- Basic unit testing

The following improvements should be made:

- Additional unit testing
- Make more responsive at lower device widths
- Sass variables for colours
- `imports` to use # syntax e.g. `#components`
- `button` and `input` should be their own atom components
- `index.ts` should be added to folders for better imports
- linting added to vitests
- Refactor to Sass and remove non-used selectors in `assets/css/style.css`

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Run vitests

```bash
npm run test
```
