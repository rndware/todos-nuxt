<template>
  <NuxtLayout>
    <NuxtPage />
    <Background />
  </NuxtLayout>
</template>
<script>
import "~/assets/css/style.css";
import Background from "@/components/atoms/Background.vue";

export default {
  components: {
    Background,
  },
};
</script>
