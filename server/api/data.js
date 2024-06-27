export default defineEventHandler(async (event) => {
  const todoData = [
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
  ];

  return { todos: todoData };
});
