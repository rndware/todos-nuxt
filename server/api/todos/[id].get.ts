import { defineEventHandler, getRouterParam } from 'h3'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  // Fetch the todo from the database
  return { id, text: 'Example todo', done: false }
})
