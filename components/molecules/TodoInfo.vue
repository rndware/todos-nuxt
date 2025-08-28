<script setup lang="ts">
const props = defineProps<{
  starredCount: number;
  archivedCount: number;
  totalCount: number;
}>();

const counts = computed(() => [
  { label: 'Starred', value: props.starredCount, class: 'starred' },
  { label: 'Archived', value: props.archivedCount, class: 'archived' },
  { label: 'Count', value: props.totalCount, class: 'total' },
]);
</script>

<template>
  <section class="todo-info">
    <div v-for="item in counts" :key="item.label" class="todo-info__item">
      {{ item.label }}:
      <span :class="['todo-info__count', `todo-info__count--${item.class}`]">{{ item.value }}</span>
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
    margin-left: 0.2rem;
  }

  &__count--starred {
    color: $color-yellow;
  }

  &__count--archived {
    color: $color-pink;
  }

  &__count--total {
    color: $color-green;
  }
}
</style>
