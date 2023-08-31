<script setup>
import { filterNumbers } from "@/utils/convert-number";
import { useForm, useField } from "vee-validate";
import { onMounted, reactive, watch } from "vue";
import { usePinia } from "@/store/pinia";
import * as yup from "yup";
///////////////////////////////////
const props = defineProps(["loading", "phoneNumber", "userExists"]);
const emit = defineEmits(["backStepOne", "resendCode", "login"]);
const pinia = usePinia();
///////////////////////////////////
const state = reactive({
  IntervalAgainCodeTimer: null,
  sendAgainCodeTimer: null,
  otpInput: "",
  timer: false,
  schema: yup.object({
    otpInput: yup
      .string()
      .required("لطفا کد پیامک شده را وارد کنید")
      .min(5, "کد پیامک شده پنج رقمی میباشد"),
    IdentificationCode: yup.string(),
  }),
});
/////////////////////////
onMounted(() => {
  handleSendAgainCodeTimer();
});
///////////////////////////////////
const { handleSubmit } = useForm({ validationSchema: state.schema });
const { value: IdentificationCode } = useField("IdentificationCode");
const { value: otpInput } = useField("otpInput");
/////////////////////////////
function onInvalidSubmit({ errors }) {
  const error = Object.values(errors);
  pinia.setNotification({
    ...pinia.state.notificationData,
    name: "error",
    status: true,
    textMain: error[0],
  });
}
/////////////////////////////
const onSubmit = () => {
  clearTimeout(state.timer);
  state.timer = setTimeout(
    handleSubmit((values) => {
      emit("login", values.otpInput);
    }, onInvalidSubmit),
    200
  );
};
/////////////////////////////
watch(
  () => otpInput.value,
  (value) => {
    otpInput.value = filterNumbers(value);
  }
);
////////////////////////////////
const handleSendAgainCodeTimer = () => {
  state.sendAgainCodeTimer = 10;
  state.IntervalAgainCodeTimer = setInterval(() => {
    if (state.sendAgainCodeTimer) {
      state.sendAgainCodeTimer--;
    } else {
      clearInterval(state.IntervalAgainCodeTimer);
    }
  }, 1000);
};
////////////////////////////
const handleResendCode = () => {
  otpInput.value = "";
  emit("resendCode");
  handleSendAgainCodeTimer();
};
</script>
<template>
  <form @submit.prevent autocomplete="on">
    <div>
      <input v-model="otpInput" maxlength="5" type="text" autofocus />
      <svg width="300" height="30">
        <line x1="10" y1="10" x2="60" y2="10" stroke="black" stroke-width="5" />
        <line
          x1="70"
          y1="10"
          x2="120"
          y2="10"
          stroke="black"
          stroke-width="5"
        />
        <line
          x1="130"
          y1="10"
          x2="180"
          y2="10"
          stroke="black"
          stroke-width="5"
        />
        <line
          x1="190"
          y1="10"
          x2="240"
          y2="10"
          stroke="black"
          stroke-width="5"
        />
        <line
          x1="250"
          y1="10"
          x2="300"
          y2="10"
          stroke="black"
          stroke-width="5"
        />
      </svg>
    </div>
    <div>
      <input
        placeholder="کد معرف (اختیاری)"
        v-model="IdentificationCode"
        v-show="!userExists"
        type="text"
      />
    </div>
    <div class="parent-btn">
      <button :disabled="props.loading" @click="onSubmit" type="button">
        {{ props.loading ? "" : "ورود" }}
      </button>
      <button
        :disabled="state.sendAgainCodeTimer"
        @click="handleResendCode"
        type="button"
      >
        {{
          state.sendAgainCodeTimer
            ? `ارسال مجدد ${state.sendAgainCodeTimer} ثانیه دیگر`
            : "ارسال مجدد (کلیک کنید)"
        }}
      </button>
    </div>
    <span @click="emit('backStepOne')">ویرایش شماره تلفن همراه</span>
  </form>
</template>

<style scoped>
form {
  @apply w-full  flex flex-col items-center max-w-[370px] gap-[30px];
}
form div:nth-child(1) {
  @apply w-[240px] inline-block;
}
form div:nth-child(1) input {
  @apply p-0 text-[32px] font-semibold border-none outline-none ml-[9px] mr-[-122px] text-left font-sans tracking-[48px];
}
form div:nth-child(1) svg {
  @apply relative
  left-[23px] w-[300px] h-[10px];
}
form div:nth-child(2) {
  @apply w-full justify-center items-center flex flex-col gap-4;
}

form p {
  @apply text-[#616161] text-center;
}
form span:last-child {
  @apply text-[#4475F2] cursor-pointer text-lg;
}

form div:nth-child(2) input {
  @apply w-full outline-none text-center transition-all bg-slate-100 rounded-md p-2 focus:border-b-[#4475F2]  focus:border-b-2 h-[40px];
}
.parent-btn {
  @apply flex gap-4 items-center justify-center w-full mobileAndTablet:flex-wrap;
}
.parent-btn button:first-child {
  @apply bg-[#4475F2] cursor-pointer rounded-md shadow-md w-[150px] h-[50px] text-white text-center text-lg transition-all hover:scale-105;
}
.parent-btn button:first-child:disabled {
  @apply bg-center bg-slate-500 bg-contain bg-no-repeat cursor-not-allowed rounded-md shadow-md w-[150px] h-[50px] text-white text-center text-lg;
  background-image: url(@/assets/images/global/loading-btn-gif.gif);
  background-size: 30px;
}
.parent-btn button:last-child {
  @apply cursor-pointer rounded-md w-[160px] h-[50px] text-[#616161] text-center text-[15px] transition-all hover:text-[#4475F2];
}
.parent-btn button:last-child:disabled {
  @apply cursor-not-allowed rounded-md h-[50px] text-[#616161] text-center;
}
</style>
