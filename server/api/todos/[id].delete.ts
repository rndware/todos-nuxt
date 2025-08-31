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
    // Check if the todo exists first
    const existingTodo = await prisma.todo.findUnique({
      where: { id }
    })

    if (!existingTodo) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Todo not found'
      })
    }

    // Delete the todo from the database
    await prisma.todo.delete({
      where: { id }
    })

    return { 
      success: true, 
      deletedId: id,
      message: 'Todo deleted successfully'
    }
  } catch (error: any) {
    // If it's already a createError, re-throw it
    if (error.statusCode) {
      throw error
    }
    
    console.error('Error deleting todo:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete todo'
    })
  }
})
