<script setup>
import stepOne from "./components/step-one.vue";
import stepTwo from "./components/step-two.vue";
import tokenService from "@/utils/token-service";
import { usePinia } from "@/store/pinia";
import accountApi from "@/api/account";
import { useRouter } from "vue-router";
import { reactive } from "vue";
/////////////////////////
const router = useRouter();
const pinia = usePinia();
const state = reactive({
  phoneNumber: "",
  loading: false,
  step: 1,
  isUserExists: false,
});
/////////////////////////////
const requestSendPhoneNumber = (mobile) => {
  state.phoneNumber = mobile;
  state.loading = true;
  accountApi
    .phoneNumber({ mobile })
    .then((response) => {
      pinia.setNotification({
        ...pinia.state.notificationData,
        name: "info",
        status: true,
        textMain: response.message,
        textHeader: "توجه",
      });
      state.step = 2;
      state.isUserExists = response.data.isExistUser;
    })
    .catch((error) => {
      console.log(error);
      pinia.setNotification({
        ...pinia.state.notificationData,
        name: "error",
        status: true,
        textMain: error.message,
      });
    })
    .finally(() => {
      state.loading = false;
    });
};
//////////////////////////
const requestSendLoginData = (phoneNumberCode) => {
  state.loading = true;
  const loginData = {
    mobileNumber: state.phoneNumber,
    code: phoneNumberCode,
  };
  accountApi
    .phoneNumberCode(loginData)
    .then((response) => {
      tokenService.setToken(response.data.accessToken);
      router.push("/");
    })
    .catch((error) => {
      pinia.setNotification({
        ...pinia.state.notificationData,
        name: "error",
        status: true,
        textMain: error.message,
      });
    })
    .finally(() => {
      state.loading = false;
    });
};
//////////////////////////
const handleBackStepOne = () => {
  state.phoneNumber = "";
  pinia.setNotification({
    ...pinia.state.notificationData,
    status: false,
  });
  state.step = 1;
};
</script>
<template>
  <div class="parent-login">
    <div class="card-login">
      <logo />
      <transition-slide group>
        <stepOne
          @finish-stepOne="requestSendPhoneNumber"
          :loading="state.loading"
          v-if="state.step === 1"
        />
        <stepTwo
          @resendCode="requestSendPhoneNumber(state.phoneNumber)"
          :phone-number="state.phoneNumber"
          :user-exists="state.isUserExists"
          @backStepOne="handleBackStepOne"
          @login="requestSendLoginData"
          :loading="state.loading"
          v-if="state.step === 2"
        />
      </transition-slide>
    </div>
  </div>
</template>
<style scoped>
.parent-login {
  @apply flex justify-center items-center bg-[#F5F5F5] w-[100vw] h-[100vh] p-6;
}
.card-login {
  @apply flex flex-col font-[dana] overflow-hidden caret-[#4475F2] items-center bg-white gap-10  rounded-xl p-6 shadow-md;
  width: clamp(280px, 100%, 500px);
}
.card-login div {
  @apply w-full max-w-[100px] h-full max-h-[100px];
}
.card-login div img {
  @apply rounded-md;
}
</style>
