
import { defineEventHandler, getRouterParam, readBody } from 'h3'
import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Todo ID is required'
    })
  }

  const body = await readBody<{
    text?: string;
    starred?: boolean;
    archived?: boolean;
  }>(event)

  // Validate that at least one field is being updated
  if (!body || Object.keys(body).length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Request body is required with at least one field to update'
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

    // Build the update data object (only include fields that are provided)
    const updateData: {
      text?: string;
      starred?: boolean;
      archived?: boolean;
    } = {}

    if (body.text !== undefined) {
      updateData.text = body.text
    }
    if (body.starred !== undefined) {
      updateData.starred = body.starred
    }
    if (body.archived !== undefined) {
      updateData.archived = body.archived
    }

    // Update the todo in the database
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: updateData
    })

    return {
      success: true,
      todo: updatedTodo,
      message: 'Todo updated successfully'
    }
  } catch (error: any) {
    // If it's already a createError, re-throw it
    if (error.statusCode) {
      throw error
    }
    
    console.error('Error updating todo:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update todo'
    })
  }
})
