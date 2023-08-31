<script setup>
import handleLoadAllImage from "@/utils/imageLoader";
import { onMounted, reactive, ref, watch, nextTick } from "vue";
///////////////////////
const props = defineProps(["api"]);
const parentSlider = ref(null);
const sliderWidth = ref(0);
///////////////////////
const state = reactive({
  sliderTranslateX: "",
  timerSlider: null,
  current: 1,
});
//////////////////////////

watch(
  () => props.api.data,
  async (data) => {
    if (data.length) {
      await nextTick();
      try {
        state.imagesLoaded = await handleLoadAllImage(parentSlider);
      } catch (error) {
        console.log(error.message);
      }
    }
  }
);

onMounted(() => {
  const observer = new ResizeObserver((entries) => {
    const { width: newWidth } = entries[0].contentRect;
    sliderWidth.value = newWidth;
  });
  observer.observe(parentSlider.value);
  ///////////////////
  handleTimerSlider();
});
//////////////////////////
watch(
  () => state.current,
  (value) => {
    if (value === 1) state.sliderTranslateX = "translateX(0%)";
    else
      state.sliderTranslateX = `translateX(${
        (value - 1) * sliderWidth.value
      }px)`;
  }
);
/////////////////////////
const handlePrevOrNext = (dirction, sliderNumber) => {
  clearInterval(state.timerSlider);
  if (sliderNumber) {
    state.current = sliderNumber;
  } else {
    if (dirction === "next") {
      if (state.current === props.api.data.length) state.current = 1;
      else state.current++;
    } else {
      if (state.current === 1) state.current = props.api.data.length;
      else state.current--;
    }
  }
  handleTimerSlider();
};
/////////////////////////
const handleTimerSlider = () => {
  state.timerSlider = setInterval(() => {
    handlePrevOrNext("next");
  }, 3000);
};
</script>
<template>
  <div ref="parentSlider" class="parent-slider">
    <template v-if="props.api.data.length">
      <!-- ////////////////////// -->
      <div @click="handlePrevOrNext('prev')" class="btn-slider prev">
        <img src="@/assets/images/slider/btn-slider.svg" />
      </div>
      <!-- ////////////////////// -->
      <div
        :style="{
          transform: state.sliderTranslateX,
          width: `${sliderWidth * props.api.data.length}px`,
        }"
        class="parent-slider-image"
      >
        <div
          class="w-full h-full bg-[length:100%_100%] bg-no-repeat"
          :style="{ backgroundImage: `url('${item.adsImageAddress}')` }"
          v-for="item in props.api.data"
          :key="item.id"
        ></div>
      </div>
      <!-- ////////////////////// -->
      <div @click="handlePrevOrNext('next')" class="btn-slider next">
        <img src="@/assets/images/slider/btn-slider.svg" />
      </div>
      <!-- ////////////////////// -->
      <div class="parent-slider-status">
        <span
          :class="[
            'slider-status-circle',
            { 'slider-status-circle-active': state.current === index + 1 },
          ]"
          v-for="(item, index) in props.api.data.length"
          @click="handlePrevOrNext(null, index + 1)"
          :key="index"
        ></span>
      </div>
    </template>
    <div class="slider-skelton" v-else></div>
  </div>
</template>
<style scoped>
.parent-slider {
  @apply relative w-full rounded-[10px] overflow-hidden shadow-md h-[400px] mobileAndTablet:h-[268px];
}
.slider-skelton {
  @apply w-full h-full animate-pulse bg-slate-400;
}
.btn-slider {
  @apply mobileAndTablet:hidden flex z-50 justify-center items-center w-[50px] h-[50px] rounded-full bg-[#F3F9FB] border-[8px] border-white cursor-pointer transition-all hover:shadow-none dark:bg-[#474E68] dark:border-[#474E68];
  box-shadow: 0px 4px 4px #0000004d;
}
.prev {
  @apply absolute rotate-180 top-0 bottom-0 right-5 my-auto;
}
.next {
  @apply absolute top-0 bottom-0 left-5 my-auto;
}
.parent-slider-image {
  @apply flex justify-start items-center relative transition-all duration-500 h-full;
}
.parent-slider-status {
  @apply absolute w-fit bottom-2 bg-white dark:bg-[#474E68] p-2 rounded-full shadow-md left-0 right-0 mx-auto flex gap-x-2;
}
.slider-status-circle {
  @apply w-2 h-2 bg-slate-300 rounded-full cursor-pointer transition-all duration-300;
}
.slider-status-circle-active {
  @apply w-4 bg-slate-400 shadow-md;
}
</style>
