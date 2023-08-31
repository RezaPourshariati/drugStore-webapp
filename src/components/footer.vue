<script setup>
import { usePinia } from "@/store/pinia";
///////////////////////////////////////
const pinia = usePinia();
</script>
<template>
  <footer>
    <div class="footer-container">
      <div class="footer-top">
        <logo />
        <div>
          <transition-fade group>
            <ul v-if="pinia.state.socialMedias.length" class="social-links">
              <li
                v-for="(social, index) in pinia.state.socialMedias"
                :key="index"
              >
                <a :href="social.link">
                  <img :src="social.image" />
                </a>
              </li>
            </ul>
            <ul v-else class="social-links-skelton">
              <li v-for="item in 4" :key="item"></li>
            </ul>
          </transition-fade>
        </div>
      </div>

      <div class="footer-info">
        <div class="single-info">
          <h5>hamrahefadak@gmail.com</h5>
          <div class="logo-info">
            <img src="@/assets/images/footer/email.svg" alt="email-link" />
          </div>
        </div>
        <div class="single-info">
          <h5>
            خیابان امام قبل از کوچه 43 جنب پلیس 10+ ساختمان شهابیه طبقه دوم
          </h5>
          <div class="logo-info">
            <img src="@/assets/images/footer/location.svg" alt="address" />
          </div>
        </div>
        <div class="single-info">
          <h5>33801435</h5>
          <div class="logo-info">
            <img src="@/assets/images/footer/telephone.svg" alt="tel" />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  @apply bg-[#4475F2] dark:bg-[#474E68];
  width: clamp(280px, 100%, 2000px);
}
.footer-container {
  @apply text-center px-[20px] py-[40px] flex justify-center items-center flex-col gap-y-[56px];
}
.footer-top {
  @apply flex w-full flex-col items-center justify-center gap-y-[24px];
}
.footer-logo {
  @apply w-[90px] h-[70px] rounded-[10px] bg-contain bg-white bg-no-repeat bg-center shadow-md;
}
.social-links {
  @apply flex justify-center gap-3 flex-wrap;
}
.social-links li a {
  @apply flex w-[60px] h-[60px]  rounded-full cursor-pointer;
}
.social-links-skelton {
  @apply flex justify-center gap-3 flex-wrap;
}
.social-links-skelton li {
  @apply w-[60px] h-[60px] shadow-md animate-pulse bg-slate-200 rounded-full;
}
.footer-info {
  @apply flex flex-wrap gap-16 justify-center font-[dana];
}
.single-info {
  @apply flex gap-y-3 items-center justify-center flex-col-reverse text-white;
}
.single-info h5 {
  @apply w-[260px];
}
.logo-info {
  @apply flex w-[55px] h-[55px] items-center justify-center bg-white rounded-full shadow-xl dark:bg-[#50577A];
}
</style>
