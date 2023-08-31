<script setup>
import { usePinia } from "@/store/pinia";
import ColorMood from "./color-mood.vue";
/////////////////////////////
const pinia = usePinia();
</script>
<template>
  <header>
    <!-- /////////////////////// -->
    <transition-fade group>
      <template v-if="pinia.state.MenuData.length">
        <div class="header-system">
          <logo />
          <div class="header-system-content">
            <div class="header-system-menu">
              <ul>
                <li v-for="menu in pinia.state.MenuData" :key="menu.id">
                  <router-link :to="`/${menu.link}`">{{
                    menu.title
                  }}</router-link>
                </li>
              </ul>
            </div>
            <ColorMood />
          </div>
        </div>
        <!-- //////////////////////////// -->
        <div class="header-mobile">
          <img
            @click="pinia.handleChangeMenuMobileStatus"
            src="@/assets/images/header/menu-icon.svg"
            class="cursor-pointer"
          />
          <logo class="!shadow-none !w-[60px] !h-[60px]" />
          <ColorMood />
        </div>
      </template>
      <!-- //////////////////////////// -->
      <div v-else class="header-skelton">
        <div class="header-skelton-system">
          <div></div>
          <div></div>
        </div>
        <div class="header-skelton-mobile">
          <div></div>
          <div></div>
        </div>
      </div>
    </transition-fade>
  </header>
</template>
<style scoped>
header {
  @apply px-[10px] py-[10px] text-white font-[dana];
  width: clamp(280px, 100%, 2000px);
}
.header-system {
  @apply w-full gap-x-[10px] flex items-center mobileAndTablet:hidden;
}
.header-system-content {
  @apply flex justify-between items-center px-[20px] bg-[#4475F2] dark:bg-[#474E68] shadow-md h-[70px] rounded-[10px] whitespace-nowrap;
  width: calc(100% - 70px);
}

.header-system-menu ul {
  @apply flex items-center gap-x-[20px];
}
.header-system-menu ul li {
  @apply flex justify-center items-center gap-x-2 cursor-pointer;
}
#icon-home {
  @apply pb-[5px];
}

.header-mobile {
  @apply w-full justify-between bg-white  dark:bg-[#474E68] shadow-md p-[7px] rounded-[15px] h-[70px] items-center hidden mobileAndTablet:flex;
}
.header-skelton {
  @apply w-full h-[70px];
}
.header-skelton-system {
  @apply w-full h-full flex justify-center items-center gap-x-[10px] mobileAndTablet:hidden;
}
.header-skelton-system div:first-child {
  @apply w-[90px] h-full rounded-[10px] shadow-md animate-pulse bg-slate-400;
}
.header-skelton-system div:last-child {
  @apply shadow-md h-full rounded-[10px] animate-pulse bg-slate-400;
  width: calc(100% - 70px);
}
.header-skelton-mobile {
  @apply w-full h-[70px] p-[7px] justify-between rounded-[10px] items-center hidden mobileAndTablet:flex animate-pulse bg-slate-300;
}
.header-skelton-mobile div:first-child {
  @apply w-[70px] h-full rounded-[10px] shadow-md animate-pulse bg-slate-400;
}
.header-skelton-mobile div:last-child {
  @apply w-[70px] h-full rounded-[10px] shadow-md animate-pulse bg-slate-400;
}
</style>
