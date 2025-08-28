<script setup lang="ts">
import { ref } from "vue";
const model = ref<string>("");

const emit = defineEmits(["create"]);

const props = defineProps<{
  placeholder?: string;
}>();

const onSubmit = () => {
  if (model.value !== "") {
    emit("create", model.value);
  }

  // clear on submit
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
        :placeholder="`${props.placeholder || 'I need to...' } `"
        autocomplete="off"
        required
      />
    </form>
  </div>
</template>

<style scoped lang="scss">
.todo-create {
  padding: $spacing-double 0;

  &__form {
    display: flex;
    justify-content: center;
    margin-left: -20px;
  }

  input {
    width: 250px;
  }

  label {
    margin: 0rem 0.75rem;
  }
}
</style>
