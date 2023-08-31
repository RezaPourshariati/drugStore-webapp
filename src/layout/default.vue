<script setup>
import ScrollProgressTop from "@/components/scroll-progress-top.vue";
import BtnScrollTop from "@/components/btn-scroll-top.vue";
import HeaderScroll from "@/components/header-scroll.vue";
import MenuSmall from "@/components/menu-small.vue";
import Footer from "@/components/footer.vue";
import Header from "@/components/header.vue";
import { usePinia } from "@/store/pinia";
//////////////////////////////
const pinia = usePinia();
//////////////////////
</script>
<template>
  <div class="parent-web-layout">
    <!-- ///////////////// -->
    <ScrollProgressTop />
    <MenuSmall />
    <HeaderScroll />
    <BtnScrollTop />
    <!-- ///////////////// -->
    <Header />
    <main>
      <RouterView :tokenStatus="pinia.state.tokenStatus" />
    </main>
    <Footer />
    <!-- ///////////////// -->
  </div>
</template>
<style scoped>
.parent-web-layout {
  @apply bg-[#F5F5F5] dark:bg-[#404258] gap-y-2 relative flex flex-col items-center;
}
main {
  @apply flex flex-col px-[10px] justify-start items-center gap-y-[20px] overflow-hidden;
  width: clamp(280px, 100%, 1366px);
}
</style>
