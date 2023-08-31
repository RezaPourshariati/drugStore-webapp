import HttpClient from './axios-base';

export default {
  Splash: () => HttpClient.get('v2/NewDashBoard/GetSplashDetail'),
  socialMedias: () => HttpClient.get('v1/Dashboard/GetSocialMedias'),
};