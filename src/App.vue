<script setup>
import { usePinia } from "@/store/pinia";
import { onMounted } from "vue";
///////////////////////////////////
const pinia = usePinia();
////////////////////////
onMounted(() => {
  pinia.requestGetSplash();
});
////////////////////////
</script>
<template>
  <Notification />
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" :tokenStatus="pinia.state.tokenStatus" />
    </transition>
  </router-view>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
