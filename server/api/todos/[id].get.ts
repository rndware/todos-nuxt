import { defineEventHandler, getRouterParam } from 'h3'
import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Todo ID is required'
    })
  }

  try {
    // Fetch the todo from the database
    const todo = await prisma.todo.findUnique({
      where: { id }
    })

    if (!todo) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Todo not found'
      })
    }

    return todo
  } catch (error: any) {
    // If it's already a createError, re-throw it
    if (error.statusCode) {
      throw error
    }
    
    console.error('Error fetching todo:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch todo'
    })
  }
})
