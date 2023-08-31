import HttpClient from './axios-base';
export default {
  admin: () => HttpClient.post('v1/Activations/loginadmin', { userName: '09195412801', password: '09195412801' }),
  phoneNumber: (phoneNumber) => HttpClient.post(`v1/Activations/Register`, phoneNumber),
  phoneNumberCode: (loginData) => HttpClient.post(`v1/Activations/SendUserCode`, loginData),
};