import { PrismaClient } from '@prisma/client'
import data from '@/data/seed.json'

const prisma = new PrismaClient()

async function main() {
  // Check if todos already exist
  const existingTodos = await prisma.todo.count()
  
  if (existingTodos > 0) {
    console.log('Todos already exist, skipping seed')
    return
  }

  console.log('Seeding todos...')

  await prisma.todo.createMany({
    data,
  })

  console.log('Seeding completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
