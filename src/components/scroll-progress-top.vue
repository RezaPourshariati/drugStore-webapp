<script setup>
import { onMounted } from "vue";
////////////////////////////////
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
////////////////////////////
const handleScroll = () => {
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const progress = (scrollTop / scrollHeight) * 100;
  const progressBar = document.querySelector(".scroll-progress");
  progressBar.style.width = `${progress}%`;
};
</script>
<template>
  <div class="scroll-progress-container">
    <div class="scroll-progress"></div>
  </div>
</template>

<style scoped>
.scroll-progress-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  z-index: 995;
}

.scroll-progress {
  position: absolute;
  top: 0;
  left: 50%;
  width: 0;
  height: 100%;
  background: linear-gradient(to right, #0a7cff, #ff1717);
  transform: translateX(-50%);
}
</style>
