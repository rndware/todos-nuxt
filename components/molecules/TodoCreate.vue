<script setup lang="ts">
import { ref } from "vue";
const model = ref<string>("");

const emit = defineEmits(["create"]);

const onSubmit = () => {
  if (model.value !== "") {
    emit("create", model.value);
  }

  model.value = "";
};
</script>

<template>
  <div class="todo-create">
    <form class="todo-create__form" @submit.prevent="onSubmit">
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
  </div>
</template>

<style scoped lang="scss">
.todo-create {
  padding: 2rem 0;

  label {
    margin-right: 0.75rem;
  }
}
</style>
