<script setup>
import { usePinia } from "@/store/pinia";
import { ref } from "vue";

//////////////////////////
const props = defineProps(["MenuData"]);
const headerScroll = ref(false);
const pinia = usePinia();
////////////////////////////
window.addEventListener("scroll", () => {
  if (window.scrollY > 90) {
    headerScroll.value = true;
  } else {
    headerScroll.value = false;
  }
});
</script>
<template>
  <div
    :class="['container-header-scroll', { '!translate-y-[0px]': headerScroll }]"
  >
    <transition-fade group>
      <div class="header-scroll-content" v-if="pinia.state.MenuData.length">
        <logo />
        <ul>
          <li v-for="menu in pinia.state.MenuData" :key="menu.id">
            <router-link :to="`/${menu.link}`">{{ menu.title }}</router-link>
          </li>
        </ul>
      </div>
      <div class="header-scroll-skelton" v-else>
        <div></div>
        <div></div>
      </div>
    </transition-fade>
  </div>
</template>

<style scoped>
.container-header-scroll {
  @apply flex translate-y-[-100px] transition-all duration-300 mobileAndTablet:!hidden justify-center fixed top-0 items-center px-[10px] py-[10px] text-white font-[dana] z-[991];
}
.header-scroll-content {
  @apply flex items-center  gap-3;
}
.header-scroll-content ul {
  @apply flex items-center gap-x-[20px] bg-[#4475F2]  dark:bg-[#474E68] px-[20px] rounded-[10px]  h-[70px] whitespace-nowrap shadow-md;
}
.header-scroll-content ul li {
  @apply flex justify-center items-center gap-x-2 cursor-pointer;
}
.header-scroll-skelton {
  @apply flex gap-3 w-[359.58px]  h-[70px] rounded-[10px];
}
.header-scroll-skelton div:first-child {
  @apply w-[70px] h-full animate-pulse bg-slate-400 rounded-full;
}
.header-scroll-skelton div:last-child {
  @apply w-[299px] h-full animate-pulse bg-slate-400 rounded-[10px];
}
</style>
