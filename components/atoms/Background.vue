<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const particles = [1, 2, 3];
const shootingStarActive = ref(false);
let intervalId: NodeJS.Timeout | null = null;
const shootingAnimationMs = 3000;

type Range = [number, number];

const triggerShootingStar = () => {
  shootingStarActive.value = true;
  
  // Reset after animation completes (3 seconds)
  setTimeout(() => {
    shootingStarActive.value = false;
    scheduleNextShootingStar();
  }, shootingAnimationMs);
};

const scheduleNextShootingStar = (between: Range = [7000, 9000]) => {
  const randomDelay = Math.random() * (between[1] - between[0]) + between[0];
  intervalId = setTimeout(triggerShootingStar, randomDelay);
};

onMounted(() => {
  scheduleNextShootingStar();
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <div>
    <div class="page-bg"></div>
    <div class="animation-wrapper">
      <div
        v-for="i in particles"
        :key="`particle-${i}`"
        :class="[ 'particle', `particle-${i}` ]"
      ></div>  
      <div
        v-if="shootingStarActive"
        class="shooting-star"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$colorBackground: #1e1e1e;
$color-particle: #fff;
$spacing: 2560px;
$time-1: 60s;
$time-2: 120s;
$time-3: 180s;
$time-4: 200s;
$particle-sm: 1px;
$particle-md: 2px;
$particle-lg: 3px;

/* mixins */
@function particles($max) {
  $val: 0px 0px $color-particle;
  @for $i from 1 through $max {
    $val:
      #{$val},
      random($spacing) + px random($spacing) + px $color-particle;
  }
  @return $val;
}

@mixin particles($max) {
  box-shadow: particles($max);
  border-radius: 50%;
}

.page-bg,
.animation-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.page-bg {
  background: $colorBackground;
  background-blend-mode: screen;
  background-size: cover;
  filter: grayscale(100%);
  z-index: -1;
}

.particle,
.particle:after {
  background: transparent;
}

.particle:after {
  position: absolute;
  content: "";
  top: $spacing;
}

.particle-1 {
  animation: animParticle $time-1 linear infinite;
  @include particles(1000);
  height: $particle-md;
  width: $particle-md;
}

.particle-1:after {
  @include particles(900);
  height: $particle-md;
  width: $particle-md;
}

.particle-2 {
  animation: animParticle $time-2 linear infinite;
  @include particles(800);
  height: $particle-md;
  width: $particle-md;
}

.particle-2:after {
  @include particles(500);
  height: $particle-lg;
  width: $particle-lg;
}

.particle-3:after {
  @include particles(1100);
  height: $particle-lg;
  width: $particle-lg;
  border-radius: 50%;
}

.particle-4 {
  animation: animParticle $time-4 linear infinite;
  @include particles(1200);
  height: $particle-sm;
  width: $particle-sm;
}

.particle-4:after {
  @include particles(700);
  height: $particle-sm;
  width: $particle-sm;
}

.shooting-star {
  position: absolute;
  top: -5%;
  left: -5%;
  width: $particle-md;
  height: $particle-md;
  background: $color-particle;
  border-radius: 50%;
  animation: shootingStar 3s linear forwards;
}

@keyframes shootingStar {
  0% {
    transform: translate(0, 0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  80% {
    opacity: 0.2;
  }
  100% {
    transform: translate(calc(105vw), calc(105vh));
    opacity: 0;
  }
}

@keyframes animParticle {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY($spacing * -1);
  }
}

.page-wrapper {
  text-align: center;
  color: $color-particle;
  z-index: 2;
}
</style>
