import { defineEventHandler, getRouterParam, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody<{
    text?: string;
    id: string;
    starred?: boolean;
    archived?: boolean;
  }>(event)

  // Update the todo in the database

  return { success: true, id, updated: body }
})
