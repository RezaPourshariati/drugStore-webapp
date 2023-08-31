<script setup>
import { useForm, useField } from "vee-validate";
import { usePinia } from "@/store/pinia";
import { reactive } from "vue";
import * as yup from "yup";
//////////////////////////
const emit = defineEmits(["finishStepOne"]);
const props = defineProps(["loading"]);
const pinia = usePinia();
////////////////////////
const state = reactive({
  ProgramRulesDialog: false,
  timer: false,
  schema: yup.object({
    phoneNumber: yup
      .string()
      .required("لطفا شماره تلفن همراه خود را وارد کنید")
      .min(11, "شماره تلفن همراه حداقل باید 11 کاراکتر باشد")
      .matches(
        /^(((\+98|0098)-?)|0)?9\d{2}-?\d{3}-?\d{4}$/,
        "شماره تلفن همراه وارد شده نامعتبر است"
      ),
  }),
});
////////////////////////////////////////////////////////
const { handleSubmit } = useForm({ validationSchema: state.schema });
const { value: phoneNumber } = useField("phoneNumber");
////////////////////////////////////
function onInvalidSubmit({ errors }) {
  const error = Object.values(errors);
  pinia.setNotification({
    ...pinia.state.notificationData,
    name: "error",
    status: true,
    textMain: error[0],
  });
}
///////////////////////
const onSubmit = () => {
  clearTimeout(state.timer);
  state.timer = setTimeout(
    handleSubmit((values) => {
      emit("finishStepOne", values.phoneNumber);
    }, onInvalidSubmit),
    200
  );
};
</script>

<template>
  <form @submit.prevent autocomplete="on">
    <div>
      <input
        placeholder="شماره تلفن خود را وارد کنید"
        :disabled="props.loading"
        v-model="phoneNumber"
        name="phone-number"
        id="phone-number"
        type="text"
        autofocus
      />
      <p class="text-[15px]">
        شماره همراه خود را وارد کنید. کد احراز هویت برای شما ارسال می شود.
      </p>
    </div>
    <div>
      <p @click="state.ProgramRulesDialog = !state.ProgramRulesDialog">
        <span>قوانین استفاده از برنامه </span> را مطالعه کردم و می پذیرم.
      </p>
      <button :disabled="props.loading" @click="onSubmit" type="button">
        {{ props.loading ? "" : "تایید" }}
      </button>
    </div>
    <!-- /////////////////////// -->
    <Dialog
      @dialogStatus="state.ProgramRulesDialog = !state.ProgramRulesDialog"
      :statusDialog="state.ProgramRulesDialog"
      :dialogWidth="280"
      :headerStatus="false"
      :headerText="'قوانین برنامه'"
      :footerStatus="true"
      :btnAcceptStatus="false"
      :btnCancelStatus="true"
      :btnAcceptText="'تایید'"
      :btnCancelText="'بازگشت'"
    >
       <div class="container">
    <h1>به نرم‌افزار/برنامه عطار پیچ خوش آمدید!</h1>
    <p class="rules">
      قوانین استفاده از برنامه:
      <ol>
        <li>لطفاً قوانین را به دقت مطالعه کنید و با آنها موافقت کنید.</li>
        <li>برنامه ما به منظور فروش و توزیع محصولات عطاری طراحی شده است.</li>
        <li>استفاده از برنامه بر اساس قوانین و مقررات جاری کشور محل اقامت شما است.</li>
        <li>هرگونه استفاده نامناسب از برنامه و نقض قوانین می‌تواند منجر به مسدودسازی حساب کاربری شما شود.</li>
        <li>ما از داده‌های شخصی شما با احترام بسیاری استفاده می‌کنیم. لطفاً سیاست حفظ حریم خصوصی ما را مطالعه کنید.</li>
      </ol>
    </p>
    <p>با ورود به برنامه، شما به موافقت با قوانین برنامه اعلام می‌کنید.</p>
    <p>با تشکر از استفاده شما از برنامه عطار پیچ!</p>
  </div>
    </Dialog>
    <!-- /////////////////////// -->
  </form>
</template>

<style scoped>
form {
  @apply w-full  flex flex-col items-center max-w-[370px] gap-[30px];
}
form div {
  @apply w-full justify-center items-center flex flex-col gap-4;
}
form div label,
p {
  @apply text-[#616161] text-center;
}
form div input {
  @apply w-full outline-none text-center transition-all bg-slate-100 rounded-md tracking-[2px] p-2 h-[40px] focus:border-b-[#4475F2] focus:border-b-[3px];
}
form div input:disabled {
  @apply cursor-not-allowed;
}
form div:nth-child(2) p span {
  @apply text-[#4475F2] underline cursor-pointer;
}
form button {
  @apply bg-[#4475F2] cursor-pointer rounded-md shadow-md w-[150px] h-[50px] text-white text-center text-lg transition-all hover:scale-105;
}
form button:disabled {
  @apply bg-center bg-slate-500 bg-contain bg-no-repeat cursor-not-allowed rounded-md shadow-md w-[150px] h-[50px] text-white text-center text-lg;
  background-image: url(@/assets/images/global/loading-btn-gif.gif);
  background-size: 30px;
}
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.container h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.container .rules {
  text-align: right;
}

.container .rules ol {
  padding-right: 20px;
}

.container p {
  margin-bottom: 10px;
}
</style>
