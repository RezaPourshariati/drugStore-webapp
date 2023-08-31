import firstLoadingApi from "@/api/first-loading";
import tokenService from "@/utils/token-service";
import { defineStore } from 'pinia'
import { reactive } from 'vue'
///////////////////////////////
export const usePinia = defineStore('state', () => {
  const state = reactive({
    menuMobileStatus: false,
    MenuData: [],
    socialMedias: [],
    logo: '',
    userInfo: {},
    notificationData: {
      status: false,
      name: "info",
      textHeader: "خطا",
      textMain: "خطا",
      timer: 3000,
    },
    tokenStatus: false
  })
  ///////////////////////////////////
  const setNotification = (data) => {
    state.notificationData = data
  }
  ///////////////////////////////////
  const setUserInfo = (data) => {
    state.userInfo = data
  }
  ////////////////////////////////
  const setLogo = (data) => {
    state.logo = data
  }
  ////////////////////////////////
  const requestGetSplash = () => {
    tokenService.removeTokenGuest();
    state.tokenStatus = false
    // ////////////////////////
    firstLoadingApi.Splash().then((splashResponse) => {
      console.log(splashResponse);
      const routesName = ["", "mezagShenasi", "porseshVaPasokh"];
      state.logo = splashResponse.data.sponsers[1].image;
      state.MenuData = splashResponse.data.activities
        .filter(
          (item) =>
            item.sectionType === 2 && item.title !== "فروشگاه"
        )
        .sort((a, b) => a.priority - b.priority);
      for (let index = 0; index < state.MenuData.length; index++) {
        state.MenuData[index].link = routesName[index];
      }
      //////////////////////////////////
      tokenService.setTokenGuest(splashResponse.data.tokenGuest);
      state.tokenStatus = true
      //////////////////////////////////
      return firstLoadingApi
        .socialMedias()
        .then((socialMediaResponse) => {
          state.socialMedias = socialMediaResponse.data;
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  ///////////////////////////
  const handleChangeMenuMobileStatus = () => {
    state.menuMobileStatus = !state.menuMobileStatus;
  };
  ////////////////////////////////
  return { state, setNotification, setUserInfo, setLogo, requestGetSplash, handleChangeMenuMobileStatus }
})