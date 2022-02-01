import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

async function seed() {
  const guest = await db.user.create({
    data: {
      username: "guest",
      // twixrox
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
      firstName: "Guest",
      lastName: "Account",
    },
  })

  const general = await db.topic.create({
    data: {
      name: "General",
    },
  })

  await Promise.all(
    getTodos().map((todo) => {
      const data = { userId: guest.id, topicId: general.id, ...todo }
      return db.todo.create({ data })
    })
  )

  console.log(`Database has been seeded. 🌱`)
}

seed()

function getTodos(): { content: string }[] {
  return [
    {
      content: "Todo 1",
    },
    {
      content: "Todo 2",
    },
    {
      content: "Todo 3",
    },
    {
      content: "Todo 4",
    },
  ]
}
