<script setup lang="ts">
import { ref } from "vue";
const model = ref<string>("");

const emit = defineEmits(["create"]);

const submit = (e: Event) => {
  e.preventDefault();

  if (model.value !== "") {
    emit("create", model.value);
  }

  model.value = "";
};
</script>

<template>
  <section class="todo-create">
    <form class="todo-create__form" @submit="submit">
      <label for="todo-create">✏️</label>
      <input
        type="text"
        name="todo-create"
        v-model="model"
        aria-label="Create a new todo item"
        placeholder=" I need to..."
        required
      />
    </form>
  </section>
</template>

<style scoped lang="scss">
label {
  margin-right: 0.5rem;
}
.todo-create {
  padding: 2rem 0;
}
</style>
