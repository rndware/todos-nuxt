import { PrismaClient } from '@prisma/client'

export default defineNitroPlugin(async () => {
  if (process.env.NODE_ENV === 'development') {
    const prisma = new PrismaClient()
    
    try {
      // Check if todos already exist
      const existingTodos = await prisma.todo.count()
      
      if (existingTodos === 0) {
        console.log('🌱 No todos found, seeding database...')
        
        const todos = [
          {
            text: "Invest in unicorn startup",
            starred: false,
            archived: false,
          },
          { 
            text: "Hike 5 miles up hill", 
            starred: false, 
            archived: false 
          },
          {
            text: "Pick up pizza for tonight",
            starred: false,
            archived: false,
          },
          {
            text: "Hang out clothes to dry",
            starred: false,
            archived: false,
          },
        ]

        await prisma.todo.createMany({
          data: todos,
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
