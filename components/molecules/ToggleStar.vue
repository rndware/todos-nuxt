<script setup lang="ts">
import IconButton from "../atoms/IconButton.vue";

const props = defineProps<{
  starred: boolean;
}>();

const emit = defineEmits(["toggled"]);
</script>

<template>
  <div class="toggle-star">
    <IconButton
      v-if="props.starred"
      iconName="star-fill"
      @click="emit('toggled')"
    />
    <IconButton v-else iconName="star" @click="emit('toggled')" />
  </div>
</template>

<style scoped lang="scss">
.toggle-star {
  button {
    border-radius: 50%;
    padding: 0.5rem;
  }
}
</style>
