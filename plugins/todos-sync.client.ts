import { useTodosStore } from "@/stores/todos"
import { TodoAction, TodoGroupAction } from "@/types"

export default defineNuxtPlugin(() => {
  const store = useTodosStore()

  store.$onAction(({ name, args, after, onError }) => {
    if (name === "createTodo") {
      after(async () => {
        await $fetch("/api/todos", {
          method: "POST",
          body: { text: args[0] }
        })
      })
    }

    if (name === "handleAction") {
      after(async (result) => {
        const [actionType, id] = args
        
        if (actionType === TodoAction.Delete) {
          await $fetch(`/api/todos/${id}`, {
            method: "DELETE"
          })
        } else {
          // Handle other actions (Edit, Star, Archive) with PUT method
          await $fetch(`/api/todos/${id}`, {
            method: "PUT" as any,
            body: result
          })
        }
      })
    }

    if (name === "handleGroupAction") {
      after(async () => {
        const [actionType, selectedIds] = args

        if (actionType === TodoGroupAction.DeleteRange) {
          await $fetch('/api/todos/bulk', {
            method: 'DELETE',
            body: { ids: selectedIds }
          })
        } else if (actionType === TodoGroupAction.DeleteAll) {
          await $fetch('/api/todos/bulk', {
            method: 'DELETE',
            body: { ids: store.todos.map(t => t.id) }
          })
        }
      })
    }

    onError((error) => {
      console.error("Failed to sync todos with API, using localStorage", error)
    })
  })
})
