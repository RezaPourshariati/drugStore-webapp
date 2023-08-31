<script setup>
import { ref, watch } from "vue";
//////////////////////////////
const emit = defineEmits(["dialogStatus"]);
const props = defineProps({
  statusDialog: {
    type: Boolean,
    required: true,
    default: false,
  },
  dialogWidth: {
    type: Number,
    required: false,
    default: 300,
  },
  headerStatus: {
    type: Boolean,
    required: false,
    default: true,
  },
  headerText: {
    type: String,
    required: () => headerStatus,
    default: "دیالوگ",
  },
  footerStatus: {
    type: Boolean,
    required: false,
    default: true,
  },
  btnAcceptStatus: {
    type: Boolean,
    required: () => footerStatus,
    default: true,
  },
  btnCancelStatus: {
    type: Boolean,
    required: () => footerStatus,
    default: true,
  },
  btnAcceptText: {
    type: String,
    required: () => btnAcceptStatus,
    default: "تایید",
  },
  btnCancelText: {
    type: String,
    required: () => btnCancelStatus,
    default: "بازگشت",
  },
});
////////////////////////////
const dialog = ref(null);
////////////////////////////
watch(
  () => props.statusDialog,
  (value) => {
    if (value) {
      const app = document.getElementById("app");
      app.insertBefore(dialog.value, app.firstChild);
    } else {
      setTimeout(() => {
        dialog.value.remove();
      }, 500);
    }
  }
);
////////////////////////////
const handleDialogStatus = (status) => {
  emit("dialogStatus", status);
};
/////////////////////////////
</script>
<template>
  <transition name="fade-scale">
    <div
      @click.self="handleDialogStatus(false)"
      class="dialog-back-ground"
      v-show="statusDialog"
      ref="dialog"
    >
      <div :style="{ minWidth: `${dialogWidth}px` }" class="dialog-card">
        <!-- ///////////////////////// -->
        <div v-if="headerStatus" class="dialog-header">
          <p class="font-bold">{{ headerText }}</p>
        </div>
        <!-- ////////////////////////// -->
        <div class="dialog-content">
          <slot />
        </div>
        <!-- ////////////////////////// -->
        <div v-if="footerStatus" class="dialog-footer">
          <button
            @click="handleDialogStatus(true)"
            v-if="btnAcceptStatus"
            class="bg-[#2C9AFF] rounded-md hover:scale-105 transition-all text-white w-[123px] h-[43px]"
          >
            {{ btnAcceptText }}
          </button>
          <button
            @click="handleDialogStatus(false)"
            v-if="btnCancelStatus"
            class="bg-[#F9F9F9] rounded-md text-[#7E8299] hover:scale-105 transition-all w-[123px] h-[43px]"
          >
            {{ btnCancelText }}
          </button>
        </div>
        <!-- /////////////////////////// -->
      </div>
    </div>
  </transition>
</template>
<style>
.dialog-back-ground {
  backdrop-filter: blur(3px);
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  position: fixed;
  display: flex;
  height: 100vh;
  width: 100vw;
  z-index: 11;
}
.dialog-card {
  @apply flex font-[dana] flex-col justify-start items-stretch bg-slate-200 overflow-hidden rounded-md shadow-md;
  z-index: 12;
}
.dialog-header {
  @apply flex w-full justify-between items-center p-3 border-b border-slate-300;
}
.dialog-content {
  @apply flex justify-center items-center font-bold p-5;
}
.dialog-footer {
  @apply flex justify-evenly p-2 items-center border-t border-slate-300;
}
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  transition: opacity 0.5s, transform 0.5s;
  transform: scale(0.8);
  opacity: 0;
}
</style>
