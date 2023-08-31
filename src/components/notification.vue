<script setup>
import { useElementSize } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { usePinia } from "@/store/pinia";
/////////////////////////////////////
const parentNotification = ref(null);
const { width } = useElementSize(parentNotification);
const borderBottomWidth = ref(0);
let borderBottomWidthSetTimeOut;
let borderBottomWidthInterVal;
const pinia = usePinia();

////////////////////////////
watch(
  () => pinia.state.notificationData.status,
  (value) => {
    if (value) {
      hadnleTimerNotification();
    } else {
      clearInterval(borderBottomWidthInterVal);
      clearTimeout(borderBottomWidthSetTimeOut);
      borderBottomWidth.value = 0;
    }
  }
);
////////////////////////////////
const hadnleTimerNotification = () => {
  borderBottomWidthInterVal = setInterval(() => {
    borderBottomWidth.value +=
      width.value / (pinia.state.notificationData.timer / 70);
  }, 70);
  borderBottomWidthSetTimeOut = setTimeout(() => {
    handleCloseNotification();
  }, pinia.state.notificationData.timer + 1000);
};
///////////////////////////////
const handleColor = computed(() => {
  switch (pinia.state.notificationData.name) {
    case "error":
      return "#EB5757";
    case "warning":
      return "#F2C94C";
    case "info":
      return "#5458F7";
    case "success":
      return "#00CC99";
    default:
      return "";
  }
});
/////////////////////////////////
const handleCloseNotification = () => {
  pinia.setNotification({ ...pinia.state.notificationData, status: false });
};
</script>

<template>
  <div
    :class="[
      'parent-notification',
      { '!translate-x-[0px]': pinia.state.notificationData.status },
    ]"
    @click="handleCloseNotification"
    ref="parentNotification"
  >
    <div
      :style="{
        backgroundImage: `url('src/assets/images/notification/${pinia.state.notificationData.name}.svg')`,
        backgroundColor: `${handleColor}`,
      }"
    ></div>
    <section>
      <h4 :style="{ color: handleColor }">
        {{ pinia.state.notificationData.textHeader }}
      </h4>
      <p>{{ pinia.state.notificationData.textMain }}</p>
    </section>
    <div
      :style="{ width: `${borderBottomWidth}px`, backgroundColor: handleColor }"
    ></div>
  </div>
</template>

<style>
.parent-notification {
  @apply flex gap-[1rem] shadow-2xl overflow-hidden bg-white top-0 w-full items-center duration-500 cursor-pointer p-[1rem]  rounded-l-[5px] font-[dana]  fixed right-0 translate-x-[450px] transition-all z-[994];
  width: clamp(280px, 100%, 450px);
}

.parent-notification div:nth-child(1) {
  @apply flex rounded-full min-w-[60px] h-[60px] bg-no-repeat bg-center;
}

.parent-notification > h4 {
  @apply font-bold text-[18px] md:text-[15px];
}

.parent-notification > p {
  @apply font-normal text-[15px] md:text-[12px];
}

.parent-notification div:nth-child(3) {
  @apply absolute right-0 bottom-0 h-[3px] transition-all;
  transition: width linear 0.5s;
}
</style>
