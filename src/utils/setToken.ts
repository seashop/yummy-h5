import request from './request/index';
import {APIPATH} from './request/config';
import Taro from '@tarojs/taro';
export default function setToken(type, wxCode, customToken) {
  return new Promise((resolve, reject) => {
    request({
      url: APIPATH.passport,
      method: 'post',
      header: {
        Authorization: customToken.length > 0 ? 'Bearer ' + customToken.token.access : '',
      },
      data: {
        provider: type,
        code: wxCode.length > 0  ? wxCode : undefined,
        auto_signup: true,
      },
    }).then((result) => {
      Taro.setStorage({
        key: 'yummyh5-token',
        data: result.token,
      });
      resolve(result)
    }).catch((err) => {
      resolve(err)
    })
  })
}
