import { defineEventHandler, readBody } from 'h3'
import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    ids: string[];
  }>(event)

  // Validate the request body
  if (!body || !body.ids || !Array.isArray(body.ids)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Request body must contain an array of todo IDs'
    })
  }

  if (body.ids.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'At least one todo ID is required'
    })
  }

  try {
    // Check how many todos exist with the provided IDs
    const existingTodos = await prisma.todo.findMany({
      where: {
        id: {
          in: body.ids
        }
      },
      select: { id: true }
    })

    if (existingTodos.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'No todos found with the provided IDs'
      })
    }

    // Delete the todos from the database
    const deleteResult = await prisma.todo.deleteMany({
      where: {
        id: {
          in: body.ids
        }
      }
    })

    // Find which IDs were not found (if any)
    const existingIds = existingTodos.map(todo => todo.id)
    const notFoundIds = body.ids.filter(id => !existingIds.includes(id))

    return {
      success: true,
      deletedCount: deleteResult.count,
      requestedIds: body.ids,
      deletedIds: existingIds,
      notFoundIds: notFoundIds.length > 0 ? notFoundIds : undefined,
      message: `Successfully deleted ${deleteResult.count} todo(s)`
    }
  } catch (error) {
    // If it's already a createError, re-throw it
    if (error.statusCode) {
      throw error
    }
    
    console.error('Error deleting todos:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete todos'
    })
  }
})
