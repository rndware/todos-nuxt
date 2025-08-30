import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ text: string; }>(event)

  const newTodo = {
    id: Date.now(),
    text: body.text,
    starred: false,
    archived: false,
  }

  // Save the new todo to the database

  return { success: true, todo: newTodo }
})
