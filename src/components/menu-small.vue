<script setup>
import { usePinia } from "@/store/pinia";
///////////////////////////////////////
const pinia = usePinia();
</script>
<template>
  <transition-fade v-show="pinia.state.menuMobileStatus"
    ><div
      @click="pinia.handleChangeMenuMobileStatus"
      class="bg-menu-small"
    ></div>
  </transition-fade>
  <!-- ////////////////////// -->
  <div
    class="content-menu-small"
    :class="pinia.state.menuMobileStatus ? 'w-[280px]' : 'w-[0px] !p-0'"
  >
    <div class="header-menu-small">
      <div class="profile">
        <div>
          <img src="../assets/images/header/account.svg" alt="profile" />
        </div>
        <div>
          <h3>اشکان نامداری</h3>
          <p>ashfaksayem@gmail.com</p>
        </div>
      </div>
      <img
        src="@/assets/images/header/close-menu-small.svg"
        @click="pinia.handleChangeMenuMobileStatus"
        alt="icon"
      />
    </div>
    <ul>
      <li v-for="menu in pinia.state.MenuData" :key="menu.id">
        <router-link :to="`/${menu.link}`">{{ menu.title }}</router-link>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.bg-menu-small {
  @apply w-full h-full fixed z-[995];
  backdrop-filter: blur(3px);
}
.content-menu-small {
  @apply bg-[#4475F2]  dark:bg-[#474E68] h-full transition-all shadow-lg duration-500 fixed z-[996] right-0 overflow-hidden font-[dana] flex flex-col gap-8;
}
.header-menu-small {
  @apply py-5 flex justify-between items-center px-3 border-b border-b-white w-[280px] overflow-hidden;
}
.profile {
  @apply flex gap-2;
}
.profile div h3 {
  @apply font-semibold text-lg  text-right  text-white;
}
.profile div:nth-child(1) {
  @apply w-[48px] h-[48px];
}
.profile div img {
  @apply w-full h-full rounded-full;
}
.profile div p {
  @apply text-slate-200 whitespace-pre-wrap text-sm font-normal;
}
.content-menu-small ul {
  @apply flex flex-col w-[280px] items-start gap-2  px-3;
}
.content-menu-small ul li {
  @apply flex justify-start items-center whitespace-nowrap gap-x-[10px] cursor-pointer text-white transition-all  hover:bg-white hover:text-[#8A8A8A] rounded-[5px] w-full  text-right  p-[10px] font-[dana] ;
}
.content-menu-small ul li a{
  @apply w-full
}
</style>
