<script setup>
import handleLoadAllImage from "@/utils/imageLoader";
import { nextTick, reactive, ref, watch } from "vue";
///////////////////////////////////
const props = defineProps(["api"]);
const banner = ref(null);
const state = reactive({
  imagesLoaded: false,
});
// ///////////////////
watch(
  () => props.api.data,
  async (data) => {
    if (data.length) {
      await nextTick();
      try {
        state.imagesLoaded = await handleLoadAllImage(banner);
      } catch (error) {
        console.log(error.message);
      }
    }
  }
);
</script>

<template>
  <transition name="fade-scale">
    <div v-show="state.imagesLoaded" class="banner" ref="banner">
      <img :src="props.api?.data[0]?.adsImageAddress" />
    </div>
  </transition>
  <div v-if="!state.imagesLoaded" class="banner-skeleton"></div>
</template>

<style scoped>
.banner {
  @apply w-full h-[250px] rounded-lg shadow-md overflow-hidden;
}
.banner > img {
  @apply w-full h-full;
}

.banner-skeleton {
  @apply w-full h-[250px] rounded-lg shadow-md animate-pulse dark:bg-white bg-slate-400;
}
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
