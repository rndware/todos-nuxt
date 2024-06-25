<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  iconName: string;
}>();

const classList = computed(() => ({
  pi: true,
  [`pi-${props.iconName}`]: props.iconName,
}));
</script>

<template>
  <button :class="classList" />
</template>
