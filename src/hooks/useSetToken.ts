import Taro from '@tarojs/taro';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import request from '../utils/request/index';
import {APIPATH} from '../utils/request//config';


const currentPage = Taro.getCurrentPages().pop();
export default function useSetToken() {

  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const loginFn = (type, wxCode, customToken, isJumpToIndex) => {
    request({
      url: APIPATH.passport,
      method: 'post',
      header: {
        Authorization: customToken.length > 0 ? 'Bearer ' + customToken.token.access : '',
      },
      data: {
        provider: type,
        code: wxCode.length > 0 ? wxCode : undefined,
        auto_signup: true,
      },
    })
      .then((result) => {
        Taro.setStorage({
          key: 'yummyh5-token',
          data: result.token,
        });
        dispatch({ type: 'USER_TOKEN_CHANGE', data: { token: result.token } });
        isJumpToIndex ? Taro.navigateTo({ url: '/pages/index/index' }) : '';
        setData(result.token);
      })
      .catch((err) => {
      });
  };

  return {data, loginFn};
}
