<script setup lang="ts">
const props = defineProps<{
  starredCount: number;
  archivedCount: number;
  totalCount: number;
}>();
</script>

<template>
  <section class="todo-info">
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
  </section>
</template>

<style scoped lang="scss">
.todo-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  border: 1px solid $color-gray;
  border-radius: $border-radius;
  padding: $spacing-unit;
  margin: 0 1.5rem $spacing-unit;
  gap: 0.5rem;

  div {
    min-width: 6rem;
  }
  span {
    font-weight: bold;
  }

  &__starred-count {
    color: $color-yellow;
  }
  &__archived-count {
    color: $color-pink;
  }
  &__total-count {
    color: $color-green;
  }
}
</style>
