<script setup>
import { usePinia } from "@/store/pinia";
///////////////////////////////////////
const pinia = usePinia();
</script>
<template>
  <transition-fade group class="w-[70px] h-[70px]">
    <div
      v-if="pinia.state.logo"
      :style="{ backgroundImage: `url('${pinia.state.logo}')` }"
      class="logo"
    ></div>
    <div class="logo-skelton" v-else></div>
  </transition-fade>
</template>
<style scoped>
.logo {
  @apply w-full h-full rounded-full bg-contain bg-white bg-no-repeat bg-center shadow-md;
}
.logo-skelton {
  @apply w-full h-full rounded-full shadow-md animate-pulse bg-slate-400;
}
</style>
