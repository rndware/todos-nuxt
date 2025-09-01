import { defineEventHandler, readBody } from 'h3'
import { prisma } from '~/lib/prisma' // Adjust if your prisma import is different
import { type TodoItemData } from "@/types";

export default defineEventHandler(async (event) => {
  const todosToUpdate = await readBody<TodoItemData[]>(event)

  if (!Array.isArray(todosToUpdate)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request body, expected an array of todos',
    })
  }

  const updatePromises = todosToUpdate.map(todo =>
    prisma.todo.update({
      where: { id: todo.id },
      data: {
        text: todo.text,
        starred: todo.starred,
        archived: todo.archived,
      },
    }).catch((err) => {
      console.error(`Failed to update todo with id ${todo.id}`, err)
      return null
    })
  )

  const results = await Promise.all(updatePromises)

  return results.filter(Boolean) // return only successfully updated todos
})
