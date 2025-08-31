import { defineEventHandler, readBody } from 'h3'
import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ text: string; }>(event)

  // Validate the request body
  if (!body || !body.text) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Todo text is required'
    })
  }

  // Trim whitespace and validate text is not empty
  const todoText = body.text.trim()
  if (todoText.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Todo text cannot be empty'
    })
  }

  try {
    // Save the new todo to the database
    const newTodo = await prisma.todo.create({
      data: {
        text: todoText,
        starred: false,
        archived: false,
      }
    })

    return {
      success: true,
      todo: newTodo,
      message: 'Todo created successfully'
    }
  } catch (error) {
    console.error('Error creating todo:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create todo'
    })
  }
})
