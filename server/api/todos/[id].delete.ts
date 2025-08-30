import { defineEventHandler, getRouterParam } from 'h3'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  // Delete the todo from the database
  return { success: true, deletedId: id }
})
