import axios from 'axios';
import { apiBaseUrl } from '../config';
// import getSigns from '../utils/getSigns';

const defaultMsg = '请求失败,请稍后重试';

const httpClient = axios.create({
  // API 请求的默认前缀
  baseURL: apiBaseUrl,
  timeout: 60000, // 请求超时时间
});

httpClient.interceptors.request.use(
  (config) => config,
  (error) => {
    console.error('interceptors.request error=', error);
    const result = { message: error.message || '请求初始化失败，请重试...', success: false };
    // Network Error
    // Promise.reject(result);
    return Promise.resolve(result);
  },
);

httpClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('error=', error);
    let result = { message: error.message || '网络请求异常，请重试...', success: false };
    if (error.response) {
      const { message } = error.response.data || {};
      console.log('message=', message);
      result = {
        ...error.response,
        message: message || defaultMsg,
        success: false,
      };
    }
    // Network Error
    return Promise.resolve(result);
  },
);

async function request({
  url, params, data, method = 'get', toastError, timeout, headers, ...options
}) {
  let fixParams;
  // const sign = await getSigns(signKey || 'VUE_APP_SK_HTTP');
  if (params) {
    fixParams = {};
    Object.keys(params).forEach((key) => {
      if (typeof params[key] !== 'undefined'
        && params[key] !== '') {
        fixParams[key] = params[key];
      }
    });
  }
  const opts = {
    method,
    params: fixParams,
    data,
    url,
    timeout,
    ...options,
    headers: headers || {
      // ...sign,
    },
  };
  const resData = await httpClient(opts);
  //
  const {
    message, success, code,
  } = resData;
  //
  if (success === false) {
    const msg = message || defaultMsg;
    if (toastError !== false) {
      console.error(`url=${url},message=${msg}`);
    }
    return {
      code,
      success: false,
      message: msg,
      originRes: resData,
    };
  }
  return {
    ...resData,
    success: true,
  };
}

export const post = (url, data, options) => request({
  ...options, url, data, method: 'POST',
});

export const get = (url, params, options) => request({
  ...options, url, params, method: 'GET',
});

export const del = (url, params, options) => request({
  ...options, url, params, method: 'DELETE',
});
export const put = (url, data, options) => request({
  ...options, url, data, method: 'PUT',
});

export default request;
