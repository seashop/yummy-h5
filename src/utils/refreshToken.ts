import request from './request/index';
import {
  baseUrl,
  APIPATH
}  from './request/config';
import Taro from '@tarojs/taro';
export default function refreshToken() {
  let token = Taro.getStorageSync('yummyh5-token')
  let refreshToken = token.refresh
  return new Promise((resolve, reject) => {
    Taro.request({
    url: baseUrl + APIPATH.refreshToken,
    method: 'POST',
    data: {
      refreshToken: refreshToken
    },
  }).then((result) => {
      console.log(result)
      if (result.data.code === 2) {
        Taro.showToast({
          title: '登录信息过期，请重新登陆',
          icon: 'error',
          duration: 2000
        })
        setTimeout(() => {
               Taro.redirectTo({ url: '/pages/login/index' });
        }, 2000);
      }
      // Taro.setStorage({
      //   key: 'yummyh5-token',
      //   data: result.token,
      // });
      // resolve(result)
    }).catch((err) => {
      console.log(err)
      resolve(err)
    })
  })
}
