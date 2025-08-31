import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Check if todos already exist
  const existingTodos = await prisma.todo.count()
  
  if (existingTodos > 0) {
    console.log('Todos already exist, skipping seed')
    return
  }

  console.log('Seeding todos...')

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
