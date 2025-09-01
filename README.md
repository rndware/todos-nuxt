# Nuxt 3 Todo App

A simple and fun Nuxt 3 Todo App.

<img src="https://github.com/rndware/todos-nuxt/blob/master/media/video-capture.gif" width="65%" />

## iPad Air

<img src="https://github.com/rndware/todos-nuxt/blob/master/media/ipad-air.png" width="65%"/>

## iPhone Pro Max 

<div style="display: flex; gap: 10px;">
  <img src="https://github.com/rndware/todos-nuxt/blob/master/media/iphone-pro-max-1.png" width="35%"/>
  <img src="https://github.com/rndware/todos-nuxt/blob/master/media/iphone-pro-max-2.png" width="35%"/>
</div>

- Developed with **Vue 3**, **Nuxt.js**, **TypeScript**, and **Pinia**  
- Styled with **Sass**, following [BEM](https://getbem.com/) conventions  
- Components structured according to [Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/)  
- Implemented **basic unit testing**  
- Integrated **Storybook** for component documentation  

The following improvements should be made:

- Improve responsiveness at lower device widths
- Handle large todo item names better
- Add `autodocs` to Storybook
- `button` and `input` should be their own atom components
- Add linting to vitests

## Setup

Make sure to install the dependencies:

```bash
# yarn
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# yarn

echo "DATABASE_URL="postgresql://postgres:password@localhost:5432/todos_db" > .env

npm run dev
```

## Run vitests

```bash
npm run test
```
