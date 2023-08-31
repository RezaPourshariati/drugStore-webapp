import HttpClient from './axios-base';
export default {
  mainPage: () => HttpClient.get('v2/NewDashBoard/MainPage'),
};