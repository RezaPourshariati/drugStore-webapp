<script setup>
import handleLoadAllImage from "@/utils/imageLoader";
import { nextTick, reactive, ref, watch } from "vue";
////////////////////////////////////
const props = defineProps(["api"]);
const section = ref(null);
const state = reactive({
  imagesLoaded: false,
});
////////////////////////////////////
watch(
  () => props.api.data,
  async (data) => {
    if (data.length) {
      await nextTick();
      try {
        state.imagesLoaded = await handleLoadAllImage(section);
    
      } catch (error) {
        console.log(error.message);
      }
      const allP = document.querySelectorAll(".card-main p");
      allP.forEach((item) => {
        if (item.textContent.length > 20) {
          item.classList.add("animationForText");
        }
      });
    }
  }
);
</script>
<template>
  <transition name="fade-scale">
    <section v-show="state.imagesLoaded" ref="section">
      <!-- /////////////////////// -->
      <div class="section-header">
        <div>
          <img src="@/assets/images/global/header-section-title.svg" />
          <p>{{ props.api.name }}</p>
        </div>
        <img
          src="@/assets/images/global/header-section-more.svg"
          class="cursor-pointer"
        />
      </div>
      <!-- /////////////////////// -->
      <div class="section-main">
        <div
          v-for="item in props.api.data"
          class="container-card"
          :key="item.itemId"
        >
          <div class="card-header">
            <img
              src="@/assets/images/section/card-save.svg"
              class="cursor-pointer"
            />
            <div>
              <button type="button">
                <img src="@/assets/images/section/card-score.svg" />
              </button>
              <button v-if="item.gifts.length" type="button">
                <img src="@/assets/images/section/card-bonus.svg" />
              </button>
            </div>
          </div>
          <div class="card-like">
            <button type="button">
              <img src="@/assets/images/section/card-like.svg" />
            </button>
            <p>326</p>
          </div>
          <!-- ////////////////// -->
          <div class="card-main">
            <div
              :style="{
                'background-image': `url('${item.itemSmallImageAddress}')`,
              }"
            ></div>
            <p>{{ item.itemTitle }}</p>
          </div>
          <!-- ///////////////////////// -->
          <img src="@/assets/images/section/card-line.svg" />
          <!-- ////////////////// -->
          <div class="card-footer">
            <div class="card-footer-right">
              <h4>
                {{
                  item.isFree
                    ? "رایگان"
                    : `${item.amount?.toLocaleString()} تومان`
                }}
              </h4>
              <div v-if="!item.isFree">
                <img src="@/assets/images/section/card-arrow-price.svg" />
                <span>183,750</span>
                <p>5% تخفیف</p>
              </div>
              <div v-if="!item.isFree">
                <p>{{ `تنها ${item.remainingCount} عدد باقی مانده` }}</p>
                <img src="@/assets/images/section/card-left-over.svg" />
              </div>
            </div>
            <div v-if="!item.isFree" class="card-footer-left">
              <div>
                <h3>2:48:33</h3>
                <img src="@/assets/images/section/card-timer.svg" />
              </div>
              <button type="button">
                <img src="@/assets/images/section/card-shop.svg" />
              </button>
            </div>
          </div>
          <!-- /////////////////////// -->
        </div>
      </div>
      <!-- /////////////////////// -->
    </section>
  </transition>
  <section v-if="!state.imagesLoaded">
    <div class="section-header-skelton"></div>
    <div class="section-main">
      <div v-for="item in 4" :key="item" class="card-section-skelton"></div>
    </div>
  </section>
</template>
<style scoped>
section {
  @apply w-full flex flex-col gap-y-[20px] font-[dana];
}
.section-header {
  @apply flex items-center justify-between w-full rounded-[10px] bg-[#ffff] dark:bg-[#474E68] dark:text-white p-[10px] px-[15px] text-[1.3rem] font-semibold text-[#8A8A8A] shadow-md;
}
.section-header-skelton {
  @apply w-full rounded-[10px] h-[55px] animate-pulse bg-slate-400 dark:bg-white shadow-md;
}
.section-header div {
  @apply flex gap-[7px] items-center;
}
.section-header > p {
  @apply cursor-pointer;
}
.section-main {
  @apply w-full flex items-center gap-2 flex-nowrap justify-start overflow-x-scroll;
}
.container-card {
  @apply w-[330px] min-w-[330px] h-[466px] border rounded-[13px] p-[20px] flex flex-col bg-white transition-all dark:bg-[#474E68] justify-between items-center relative dark:border-[#474E68];
}
.card-section-skelton {
  @apply w-[330px] min-w-[330px] h-[466px] rounded-[13px] animate-pulse bg-slate-400 dark:bg-white shadow-md;
}
.card-header {
  @apply w-full flex justify-between h-[43px];
}
.card-header div {
  @apply flex items-center gap-[10px];
}
.card-header button {
  @apply flex items-center justify-center w-[43px] h-[43px] bg-[#F8B602] rounded-[10px];
}
.card-like {
  @apply absolute top-[65px] right-3.5 flex flex-col items-center justify-center;
}
.card-like p {
  @apply text-[#8A8A8A] dark:text-white font-normal text-lg font-[kalameh];
}
.card-main {
  @apply flex w-full relative overflow-hidden flex-col items-center gap-y-5 justify-start;
}
.card-main div {
  @apply w-[225px] min-h-[166px] bg-contain bg-center bg-no-repeat;
}
.card-main p {
  @apply text-center text-[#8A8A8A] dark:text-white text-[18px] font-semibold whitespace-nowrap;
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
.card-footer {
  @apply flex w-full h-[85px] items-end justify-between font-[kalameh];
}
.card-footer-right {
  @apply flex flex-col gap-y-[2px];
}
.card-footer-right div {
  @apply w-full flex gap-[5px] items-center justify-start;
}
.card-footer-right h4 {
  @apply font-bold text-[1.5rem] leading-[40.8px] text-[#7A8F75]  dark:text-white;
}
.card-footer-right span {
  @apply font-normal text-lg leading-[30.6px] line-through text-[#EB5757];
}
.card-footer-right p:nth-child(3) {
  @apply shadow-md w-[68px] h-[22px] rounded-[5px] flex  justify-center items-center p-[5px]  bg-[#EB5757]  text-white font-normal text-[13px] leading-[22.1px] text-center;
}
.card-footer-right p:nth-child(1) {
  @apply text-[#EB5757]  font-[dana] font-normal text-[11px];
}
.card-footer-left {
  @apply flex flex-col gap-[8px] items-end;
}
.card-footer-left div {
  @apply w-full flex gap-[5px] items-center justify-start;
}
.card-footer-left button {
  @apply flex items-center justify-center w-[48px] h-[48px] bg-[#F8B602] rounded-lg;
}
.card-footer-left h3 {
  @apply text-[#7A8F75] font-normal text-[20px] leading-[34px] font-[kalameh] dark:text-white;
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
