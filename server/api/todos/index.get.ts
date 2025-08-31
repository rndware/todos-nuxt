// server/api/todos/index.get.ts
import { defineEventHandler } from 'h3'
import { prisma } from '~/lib/prisma'

export default defineEventHandler(async () => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return todos
  } catch (error) {
    console.error('Error fetching todos:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch todos'
    })
  }
})
