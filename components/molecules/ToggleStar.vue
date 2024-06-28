<script setup lang="ts">
import { computed } from "vue";
import { IconButton } from "@/components/atoms";

const props = defineProps<{
  starred: boolean;
}>();

const emit = defineEmits(["toggled"]);

const iconName = computed(() => (props.starred ? "star-fill" : "star"));
</script>

<template>
  <div class="toggle-star">
    <IconButton :iconName="iconName" @click="emit('toggled')" />
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
