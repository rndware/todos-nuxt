<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  starredCount: number;
  archivedCount: number;
  totalCount: number;
}>();
</script>

<template>
  <div class="todo-info">
    <div>
      Starred:
      <span class="todo-info__starred-count">{{ props.starredCount }}</span>
    </div>
    <div>
      Archived:
      <span class="todo-info__archived-count">{{ props.archivedCount }}</span>
    </div>
    <div>
      Count: <span class="todo-info__total-count">{{ props.totalCount }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.todo-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  border: 1px solid #3d3d3d;
  border-radius: 10px;
  padding: 1rem;
  
  > div {
    min-width: 6rem;
  }
  
  &__starred-count {
    flex-grow: 1;
    font-weight: bold;
    color: yellow;
  }
  &__archived-count {
    flex-grow: 1;
    font-weight: bold;
    color: red;
  }
  &__total-count {
    flex-grow: 1;
    font-weight: bold;
    color: green;
  }
}
</style>
