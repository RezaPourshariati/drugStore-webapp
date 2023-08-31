<template>
  <div class="not-found-parent">
    <div class="not-found">
      <div>
        <p>ERROR 404</p>
        <div>
          <p>صفحه مورد نظر پیدا نشد!</p>
          <section>
            <router-link to="/"><p>صفحه اصلی</p></router-link>
          </section>
        </div>
      </div>
      <p>404</p>
    </div>
  </div>
</template>

<style scoped>
.not-found-parent {
  @apply flex w-full justify-center items-center  bg-[#F3F5F6] h-[100vh];
}
.not-found {
  @apply flex gap-[5rem] w-full justify-between items-center  max-w-[1366px] text-[#4D11AD] flex-wrap px-4 xl:flex-col-reverse;
}
.not-found div {
  @apply flex flex-col gap-2;
}
.not-found > p {
  @apply text-[300px] font-bold xl:text-[200px] sm:text-[150px];
}
.not-found div > p:first-child {
  @apply text-[20px] font-medium;
}
.not-found div > div {
  @apply flex gap-8;
}
.not-found div > div > p:first-child {
  @apply text-[55px] font-[dana] font-bold  sm:text-[30px];
}
.not-found section {
  @apply flex w-full justify-center;
}
.not-found section > a> P {
  @apply px-[40px] py-2 text-[25px] font-[dana]  text-white bg-[#4D11AD] rounded-lg transition-all hover:cursor-pointer hover:shadow-xl;
}
</style>
