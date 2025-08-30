// server/api/todos/index.get.ts
import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  // fetch from database
  return [
    {
      id: "1",
      text: "Invest in unicorn startup",
      starred: false,
      archived: false,
    },
    { id: "2", text: "Hike 5 miles up hill", starred: false, archived: false },
    {
      id: "3",
      text: "Pick up pizza for tonight",
      starred: false,
      archived: false,
    },
    {
      id: "4",
      text: "Hang out clothes to dry",
      starred: false,
      archived: false,
    },
  ];
})
