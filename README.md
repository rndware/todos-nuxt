# Nuxt 3 Todo App

A simple Nuxt 3 Todo App.

<img src="https://github.com/rndware/todos-nuxt/blob/master/media/add-new-item.gif" width="65%"/>
<img src="https://github.com/rndware/todos-nuxt/blob/master/media/update-item.gif" width="65%"/>
<img src="https://github.com/rndware/todos-nuxt/blob/master/media/multi-task.gif" width="65%"/>

- Created using Vue3, Nuxt.js, TypeScript and Pinia
- Sass uses [BEM](https://getbem.com/) like syntax
- Components follow [Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/)
- Basic unit testing

The following improvements should be made:

- Additional unit testing
- Improve responsiveness at lower device widths
- Handle large todo item names better
- `button` and `input` should be their own atom components
- Add linting to vitests

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# yarn
yarn dev
```

## Run vitests

```bash
yarn run test
```
