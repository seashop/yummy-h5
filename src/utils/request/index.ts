import Taro from '@tarojs/taro';
import {
  baseUrl,
} from './config';

const request_data = {

};

type options = {
  url: string,
  method: string,
  data?: Object,
  header?: Object
}

export default (options:options) => {
  return new Promise((resolve,reject) => {
    Taro.request({
    url: baseUrl + options.url,
    data: {
      ...request_data,
      ...options.data,
    },
    header: {
      'Content-Type': 'application/json',
      ...options.header
    },
    method: (options.method as any).toUpperCase(),
  }).then(res => {
    const {
      statusCode,
      data
    } = res;
    if (statusCode >= 200 && statusCode < 300) {
      // if (data.status !== 'ok') {
      //   Taro.showToast({
      //     title: `${res.data.error.message}~` || res.data.error.code,
      //     icon: 'none',
      //     mask: true,
      //   });
      // }
      resolve(data);
    } else {
      reject(data)
    }
  }).catch((err) => {
    return err
  })
  })
};
