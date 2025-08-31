import { PrismaClient } from '@prisma/client'
import data from '@/data/seed.json'

export default defineNitroPlugin(async () => {
  if (process.env.NODE_ENV === 'development') {
    const prisma = new PrismaClient()
    
    try {
      // Check if todos already exist
      const existingTodos = await prisma.todo.count()
      
      if (existingTodos === 0) {
        console.log('🌱 No todos found, seeding database...')

        await prisma.todo.createMany({
          data,
        })

        console.log('✅ Database seeded successfully!')
      } else {
        console.log('📋 Todos already exist, skipping seed')
      }
    } catch (error) {
      console.error('❌ Error during seeding:', error)
    } finally {
      await prisma.$disconnect()
    }
  }
})
