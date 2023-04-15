import request from './request/index';
import APIPATH from './request/config';
import Taro from '@tarojs/taro';
export default function refreshToken() {
  let token = Taro.getStorageSync('yummyh5-token')
  let refreshToken = token.refresh
  return new Promise((resolve, reject) => {
    request({
      url: APIPATH.refreshToken,
      method: 'post',
      data: {
        refreshToken: refreshToken
      },
    }).then((result) => {
      console.log(result)
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
