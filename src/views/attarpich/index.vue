<script setup>
import { reactive, watch, markRaw, onMounted, computed } from "vue";
import Category from "./components/category.vue";
import section from "./components/section.vue";
import Slider from "./components/slider.vue";
import Banner from "./components/banner.vue";
import attarpichApi from "@/api/attarpich";
////////////////////////////////
const props = defineProps(["tokenStatus"]);
const state = reactive({
  mainPage: [
    {
      id: 1,
      priority: null,
      api: { name: "اسلایدر", data: [] },
      component: markRaw(Slider),
    },
    {
      id: 2,
      priority: null,
      api: { name: "دسته بندی", data: [] },
      component: markRaw(Category),
    },
    {
      id: 3,
      priority: null,
      api: { name: "پر فروش ها", data: [] },
      component: markRaw(section),
    },
    {
      id: 4,
      priority: null,
      api: { name: "تازه ها", data: [] },
      component: markRaw(section),
    },
    {
      id: 5,
      priority: null,
      api: { name: "بنر 1", data: [] },
      component: markRaw(Banner),
    },
    {
      id: 6,
      priority: null,
      api: { name: "بنر 2", data: [] },
      component: markRaw(Banner),
    },
    {
      id: 7,
      priority: null,
      api: { name: "بنر 3", data: [] },
      component: markRaw(Banner),
    },
    {
      id: 8,
      priority: null,
      api: { name: "محصولات منتخب", data: [] },
      component: markRaw(section),
    },
    {
      id: 9,
      priority: null,
      api: { name: "محصولات مناسبتی", data: [] },
      component: markRaw(section),
    },
    {
      id: 10,
      priority: null,
      api: { name: "محتوای روز", data: [] },
      component: markRaw(section),
    },
    {
      id: 11,
      priority: null,
      api: { name: "گیاه شناسی", data: [] },
      component: markRaw(section),
    },
    {
      id: 12,
      priority: null,
      api: { name: "ترفندستان", data: [] },
      component: markRaw(section),
    },
    {
      id: 13,
      priority: null,
      api: { name: "نسخه های شفابخش", data: [] },
      component: markRaw(section),
    },
    {
      id: 14,
      priority: null,
      api: { name: "سلامتیت رو بساز", data: [] },
      component: markRaw(section),
    },
    {
      id: 15,
      priority: null,
      api: { name: "فیلم", data: [] },
      component: markRaw(section),
    },
    {
      id: 16,
      priority: null,
      api: { name: "صوت", data: [] },
      component: markRaw(section),
    },
    {
      id: 17,
      priority: null,
      api: { name: "تصاویر", data: [] },
      component: markRaw(section),
    },
  ],
});
///////////////////////////////////
onMounted(() => {
  if (props.tokenStatus) {
    requestGetMainPage();
  }
}),
  ///////////////////////////////////
  watch(
    () => props.tokenStatus,
    (value) => {
      if (value) requestGetMainPage();
    }
  );
///////////////////////////////////
const updateLocalData = (apiData, localData) => {
  if (apiData) {
    const { priority, title, itemList } = apiData;
    localData.priority = priority;
    localData.api.name = title;
    localData.api.data = JSON.parse(itemList.replace(/\r|\n/g, ""));
  }
};
/////////////////////////////////
const requestGetMainPage = () => {
  attarpichApi
    .mainPage()
    .then((response) => {
      state.mainPage.forEach((localData) => {
        const apiData = response.data.find(
          (api) => api.title === localData.api.name
        );
        updateLocalData(apiData, localData);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
//////////////////////////////
const mainPageSorted = computed(() => {
  return state.mainPage.sort((a, b) => a.priority - b.priority);
});
//////////////////////////////
</script>
<template>
    <component
      v-for="item in mainPageSorted"
      :is="item.component"
      :api="item.api"
      :key="item.id"
    ></component>
</template>