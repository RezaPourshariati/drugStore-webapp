import tokenService from '@/utils/token-service'
import axios from 'axios';
import { usePinia } from '../store/pinia';
/////////////////////////

const HttpClient = axios.create({
  baseURL: 'https://attarpich.hamrahefadak.ir/api/',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});
///////////////////////////////////
HttpClient.interceptors.request.use(
  (config) => {
    config.headers['authorization'] = `Bearer ${tokenService.getToken() ? tokenService.getToken() : tokenService.getTokenGuest()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
///////////////////////////////////
HttpClient.interceptors.response.use(
  (response) => {
    if (
      response.headers['content-type'] ===
      'application/octet-stream;charset=UTF-8'
    ) {
      return response.data || null;
    }
    return response.data || null;
  },
  ////////////////////
  (error) => {
    if (error.code === "ERR_NETWORK") {
      console.log(error.code);
    }
    if (error && error.response) {
      const pinia = usePinia();
      switch (error.response.status) {
        case 400:
          pinia.setNotification({
            ...pinia.state.notificationData,
            name: "error", status: true,
            textHeader: "Bad Request",
            textMain: "سرور نمی‌تواند یا نمی‌خواهد درخواست را پردازش کند، زیرا به نظر می‌رسد خطای مشتری است."
          });
          // console.log("Bad Request: The server cannot or will not process the request due to something that is perceived to be a client error.");
          break;
        case 401:
          pinia.setNotification({
            ...pinia.state.notificationData,
            name: "error", 
            status: true,
            textHeader: "غیر مجاز",
            textMain: "درخواست فاقد اعتبارنامه معتبر احراز هویت برای منبع هدف است."
          });
          // console.log("Unauthorized: The request lacks valid authentication credentials for the target resource.");
          tokenService.removeToken();
          break;
        case 403:
          pinia.setNotification({
            ...pinia.state.notificationData,
            name: "error", 
            status: true,
            textHeader: "Forbidden",
            textMain: "مشتری حق دسترسی به محتوا را ندارد."
          });
          // console.log("Forbidden: The client does not have access rights to the content.");
          break;
        case 404:
          pinia.setNotification({
            ...pinia.state.notificationData,
            name: "error", status: true,
            textHeader: "یافت نشد",
            textMain: "سرور نمی تواند منبع درخواستی را پیدا کند."
          });
          // console.log("Not Found: The server can not find the requested resource.");
          break;
        case 405:
          pinia.setNotification({
            ...pinia.state.notificationData,
            name: "error", status: true,
            textHeader: "روش مجاز نیست",
            textMain: "روش درخواست توسط سرور شناخته شده است اما غیر فعال شده است و نمی توان از آن استفاده کرد."
          });
          // console.log("Method Not Allowed: The request method is known by the server but has been disabled and cannot be used.");
          break;
        case 408:
          pinia.setNotification({
            ...pinia.state.notificationData,
            name: "error", status: true,
            textHeader: "مهلت زمانی درخواست",
            textMain: "سرور در مدت زمانی که آماده انتظار بود، پیام درخواست  کاملی را دریافت نکرد."
          });
          // console.log("Request Timeout: The server did not receive a complete request message within the time that it was prepared to wait.");
          break;
        case 411:
          pinia.setNotification({
            ...pinia.state.notificationData,
            name: "error", status: true,
            textHeader: "طول مورد نیاز",
            textMain: "سرور از پذیرش درخواست بدون هدر Content-Length تعریف شده خودداری می کند."
          });
          // console.log("Length Required: The server refuses to accept the request without a defined Content-Length header.");
          break;
        case 413:
          pinia.setNotification({
            ...pinia.state.notificationData,
            name: "error", status: true,
            textHeader: "Payload Too Large",
            textMain: "موجودیت درخواست بزرگتر از محدودیت های تعریف شده توسط سرور است."
          });
          // console.log("Payload Too Large: The request entity is larger than limits defined by server.");
          break;
        case 414:
          pinia.setNotification({
            ...pinia.state.notificationData,
            name: "error", status: true,
            textHeader: "URI Too Long",
            textMain: "URI ارائه شده برای سرور برای پردازش بیش از حد طولانی بود"
          });
          // console.log("URI Too Long: The URI provided was too long for the server to process.");
          break;
        case 415:
          pinia.setNotification({
            ...pinia.state.notificationData,
            name: "error", status: true,
            textHeader: "نوع رسانه پشتیبانی نشده",
            textMain: "موجودیت درخواست دارای یک نوع رسانه است که سرور یا منبع آن را پشتیبانی نمی کند."
          });
          // console.log("Unsupported Media Type: The request entity has a media type which the server or resource does not support.");
          break;
        case 500:
          pinia.setNotification({
            ...pinia.state.notificationData,
            name: "error", status: true,
            textHeader: "خطای سرور داخلی",
            textMain: "سرور با یک وضعیت غیرمنتظره مواجه شده است که مانع از انجام درخواست شد."
          });
          // console.log("Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request.");
          break;
        case 501:
          pinia.setNotification({
            ...pinia.state.notificationData,
            name: "error", status: true,
            textHeader: "اجرا نشد",
            textMain: "سرور از عملکرد مورد نیاز برای انجام درخواست پشتیبانی نمی کند."
          });
          // console.log("Not Implemented: The server does not support the functionality required to fulfill the request.");
          break;
        case 502:
          pinia.setNotification({
            ...pinia.state.notificationData,
            name: "error", status: true,
            textHeader: "Bad Gateway",
            textMain: "سرور به عنوان یک دروازه یا پروکسی عمل می کرد و یک پاسخ نامعتبر از سرور بالادستی دریافت کرد."
          });
          // console.log("Bad Gateway: The server was acting as a gateway or proxy and received an invalid response from the upstream server.");
          break;
        case 503:
          pinia.setNotification({
            ...pinia.state.notificationData,
            name: "error", status: true,
            textHeader: "سرور در دسترس نیست",
            textMain: "سرور در حال حاضر به دلیل اضافه بار موقت یا نگهداری برنامه ریزی شده قادر به رسیدگی به درخواست نیست."
          });
          // console.log("Service Unavailable: The server is currently unable to handle the request due to a temporary overload or scheduled maintenance.");
          break;
        case 504:
          pinia.setNotification({
            ...pinia.state.notificationData,
            name: "error", status: true,
            textHeader: "زمان پایان دروازه",
            textMain: "سرور به عنوان یک دروازه یا پروکسی عمل می کرد و پاسخی به موقع از سرور بالادست دریافت نکرد."
          });
          // console.log("Gateway Timeout: The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.");
          break;
        case 505:
          pinia.setNotification({
            ...pinia.state.notificationData,
            name: "error", status: true,
            textHeader: "نسخه HTTP پشتیبانی نمی شود",
            textMain: "سرور از نسخه اصلی HTTP که در پیام درخواست استفاده شده است، پشتیبانی نمی کند یا از آن امتناع می کند."
          });
          // console.log("HTTP Version Not Supported: The server does not support, or refuses to support, the major version of HTTP that was used in the request message.");
          break;
        default:
          console.log(`http client status : ${error.response.status}`);
      }
    }
    return Promise.reject(error);
  }
);
export default HttpClient;
