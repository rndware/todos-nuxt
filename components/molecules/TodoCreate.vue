<script setup lang="ts">
const model = defineModel();

const emit = defineEmits(["create"]);

const submit = (e: any) => {
  e.preventDefault();

  emit("create", model.value);
  model.value = "";
};
</script>

<template>
  <div class="todo-create">
    <form class="todo-create__form" action="submit" @submit="submit">
      <input
        type="text"
        name="todo-create"
        v-model="model"
        placeholder="I need to..."
      />
    </form>
  </div>
</template>

<style scoped lang="scss">
label {
  margin-right: 0.5rem;
}
.todo-create {
  padding: 2rem 0;
}
</style>
