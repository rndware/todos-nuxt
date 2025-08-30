import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    ids: string[];
  }>(event)
  // Delete the todos from the database
  return { success: true, ids: body.ids }
})
