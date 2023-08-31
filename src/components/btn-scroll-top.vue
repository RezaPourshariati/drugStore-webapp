<script setup>
import { useElementSize } from "@vueuse/core";
import { computed, ref } from "vue";
////////////////////////
const app = useElementSize(document.getElementById("app"));
const btnScrollTopStatus = ref(false);
////////////////////////////////////////////////
const handleBtnScrollTopPosetion = computed(() => {
  return `${
    (app.width.value -
      (document.getElementsByTagName("main")[0]?.offsetWidth - 35)) /
    2
  }px`;
});
/////////////////////////////////////
window.addEventListener("scroll", () => {
  if (window.scrollY > 90) {
    btnScrollTopStatus.value = true;
  } else {
    btnScrollTopStatus.value = false;
  }
});
////////////////////////////
const handleScrollTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>
<template>
  <div
    :class="['btn-scroll-top', { '!bottom-5': btnScrollTopStatus }]"
    :style="{
      right: handleBtnScrollTopPosetion,
    }"
    @click="handleScrollTop"
  >
    <img src="@/assets/images/global/arrow-up.svg" />
  </div>
</template>
<style scoped>
.btn-scroll-top {
  @apply w-12 h-12 fixed bottom-[-48px] duration-500 transition-all bg-slate-50 dark:bg-[#50577A] cursor-pointer rounded-md shadow-xl  flex justify-center items-center z-[992];
}
</style>
