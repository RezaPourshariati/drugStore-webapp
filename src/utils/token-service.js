const AuthService = {
  setToken: (token) => {
    window.localStorage.setItem("tokenWebApp", token);
  },
  setTokenGuest: (token) => {
    window.localStorage.setItem("tokenWebAppGuest", token);
  },
  ///////////////////////////////////////////////
  getToken: () => {
    return window.localStorage.getItem("tokenWebApp");
  },
  getTokenGuest: () => {
    return window.localStorage.getItem("tokenWebAppGuest");
  },
  ///////////////////////////////////////////////
  removeToken: () => {
    window.localStorage.removeItem('tokenWebApp');
  },
  removeTokenGuest: () => {
    window.localStorage.removeItem('tokenWebAppGuest');
  },
};
export default AuthService;
