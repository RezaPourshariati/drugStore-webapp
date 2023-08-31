<script setup>
import handleLoadAllImage from "@/utils/imageLoader";
import { reactive, ref, watch, nextTick } from "vue";
// //////////////////////////////////
const props = defineProps(["api"]);
const category = ref(null);
const state = reactive({
  imagesLoaded: false,
});
// ///////////////////////
watch(
  () => props.api.data,
  async (data) => {
    if (data.length) {
      await nextTick();
      try {
        state.imagesLoaded = await handleLoadAllImage(category);
      } catch (error) {
        console.log(error.message);
      }
      const allP = document.querySelectorAll(".category-main p");
      allP.forEach((item) => {
        if (item.textContent.length > 14) {
          item.classList.add("animationForText");
        }
      });
    }
  }
);

</script>
<template>
  <!-- /////////////////////////////// -->
  <transition name="fade-scale">
    <div v-show="state.imagesLoaded" class="category" ref="category">
      <div class="category-header">
        <div>
          <img
            src="@/assets/images/global/header-section-title.svg"
            class="cursor-pointer"
          />
          <p>{{ props.api.name }}</p>
        </div>
        <img
          src="@/assets/images/global/header-section-more.svg"
          class="cursor-pointer"
        />
      </div>
      <div class="category-main">
        <div v-for="item in props.api.data" :key="item.categoryId">
          <div>
            <img class="rounded-full" :src="item.imageName" />
          </div>

          <p>{{ item.categoryTitle }}</p>
        </div>
      </div>
    </div>
  </transition>
  <!-- /////////////////////////////// -->
  <div class="category" v-show="!state.imagesLoaded">
    <div class="category-header-skelton"></div>
    <div class="category-main">
      <div v-for="item in 10" :key="item" class="card-category-skelton"></div>
    </div>
  </div>
  <!-- /////////////////////////////// -->
</template>

<style scoped>
.category {
  @apply flex flex-col w-full gap-y-[30px] font-[dana];
}
.category-header {
  @apply flex shadow-md items-center justify-between w-full rounded-[10px] bg-[#ffff] dark:bg-[#474E68] dark:text-white  p-[10px] px-[15px] text-[1.3rem] font-semibold text-[#8A8A8A];
}
.category-header-skelton {
  @apply shadow-md w-full h-[55px] rounded-[10px] animate-pulse bg-slate-400 dark:bg-white;
}
.category-header div {
  @apply flex gap-x-[7px] items-center;
}
.category-main {
  @apply flex w-full justify-evenly gap-[15px] text-[#8A8A8A] flex-wrap;
}
.category-main > div {
  @apply flex flex-col items-center gap-y-[10px] w-[120px] min-w-[120px] text-center overflow-hidden;
}
.card-category-skelton {
  @apply w-[120px] min-w-[120px] h-[134px] animate-pulse bg-slate-400 dark:bg-white rounded-lg;
}
.category-main > div > div {
  @apply w-full h-[120px] bg-white dark:bg-[#474E68] rounded-lg shadow-lg  dark:shadow-none hover:shadow-none duration-500 overflow-hidden p-5 cursor-pointer;
}
.category-main > div > div img {
  @apply w-full h-full;
}
.category-main p {
  @apply text-[1rem] font-normal whitespace-nowrap cursor-pointer dark:text-white;
}
.animationForText {
  animation: marquee 8s linear infinite;
}
@keyframes marquee {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
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
