import React, { useEffect, useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { AtInput, AtButton, AtDivider, AtToast } from 'taro-ui';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { useSelector, useDispatch } from 'react-redux';
import CountDown from './components/count-down/index';
import request from '../../utils/request';
import APIPATH from '../../utils/request/config';
import './index.module.scss';
import loginBg from './assets/login-bg.png';

export default function index() {
  const [mail, setMail] = useState('');
  const [captchaInfo, setCaptchaInfo] = useState({
    captchaId: '',
    captchaSn: 0,
    captchaValue: '',
  });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isRecevingCode, setIsRecevingCode] = useState(false);
  const [errorText, setErrorText] = useState('');
  const dispatch = useDispatch();
  const handleMailChange = (value) => {
    setMail(value);
  };
  const handleCodeChange = (value) => {
    setCaptchaInfo({ ...captchaInfo, captchaValue: value });
  };
  const handleClickCodeBtn = () => {
    var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!reg.test(mail)) {
      setErrorText('请输入正确的邮箱');
      setIsOpenModal(true);
      return;
    }
    request({
      url: APIPATH.generateCode,
      method: 'get',
      data: {
        email: mail,
        scene: 'SCENE_SIGNUP_BY_EMAIL',
      },
    }).then((res) => {
      setCaptchaInfo({ ...captchaInfo, captchaId: res.id, captchaSn: res.sn });
      setIsRecevingCode(true);
    });
  };
  const handleComplete = () => {
    setIsRecevingCode(false);
  };
  const handleLogin = () => {
    if (!mail || !captchaInfo.captchaValue) {
      setErrorText('请确认邮箱或验证码完整');
      setIsOpenModal(true);
      return;
    }
    if (!captchaInfo.captchaId) {
      setErrorText('请输入您收到的验证码');
      setIsOpenModal(true);
      return;
    }
    request({
      url: APIPATH.singup,
      method: 'post',
      data: {
        email: mail,
        ...captchaInfo,
      },
    })
      .then((res) => {
        Taro.setStorage({
          key: 'yummyh5-token',
          data: res.token,
        });
        dispatch({ type: 'USER_TOKEN_CHANGE', data: { token: res.token } });
        Taro.navigateTo({ url: '/pages/index/index' });
      })
      .catch((err) => {
        console.log(err);
        setErrorText(err);
        setIsOpenModal(true);
      });
  };
  const handleFakeLogin = () => {
    // 匿名登陆
    let token = Taro.getStorageSync('yummyh5-token');
    if (!token) {
      request({
        url: APIPATH.getPassport,
        method: 'post',
        data: {},
      }).then((res) => {
        Taro.setStorage({
          key: 'yummyh5-token',
          data: res.token,
        });
        dispatch({ type: 'USER_TOKEN_CHANGE', data: { token: res.token } });
        Taro.navigateTo({ url: '/pages/index/index' });
      });
    } else {
      dispatch({ type: 'USER_TOKEN_CHANGE', data: { token: token } });
      Taro.navigateTo({ url: '/pages/index/index' });
    }
  };
  return (
    <View className='login-container'>
      <View className='login-bg'>
        <Image
          src={loginBg}
          style={{
            width: Taro.pxTransform(400),
            height: Taro.pxTransform(241),
          }}
        ></Image>
      </View>
      <View className='login-desc'>
        <Text>Hi~</Text>
        <Text>Login Email1112323</Text>
      </View>
      <View className='login-form'>
        <AtInput type='text' placeholder='请输入您的电子邮箱' value={mail} onChange={handleMailChange} />
        <View className='form-code'>
          <AtInput type='number' placeholder='请输入您收到的验证码' value={captchaInfo.captchaValue} onChange={handleCodeChange} />
          {!isRecevingCode ? (
            <AtButton type='secondary' onClick={handleClickCodeBtn}>
              发送验证
            </AtButton>
          ) : (
            <CountDown seconds={60} onComplete={handleComplete} />
          )}
        </View>
      </View>
      <View className='login-btn'>
        <View
          className='truely-login'
          style={{
            background:
              !mail || !captchaInfo.captchaValue
                ? 'linear-gradient(0deg, rgba(242, 72, 34, 0.7) 8.33%, rgba(242, 72, 34, 0.532) 100%)'
                : 'linear-gradient(0deg, #F24822 8.33%, rgba(242, 72, 34, 0.76) 100%)',
          }}
          onClick={handleLogin}
        >
          登录
        </View>
        <AtDivider content='or' fontColor='#C4C4C4' lineColor='#C4C4C4' />
        <View className='fake-login' onClick={handleFakeLogin}>
          跳过登录
        </View>
      </View>
      <AtToast isOpened={isOpenModal} text={errorText} onClose={() => setIsOpenModal(false)}></AtToast>
    </View>
  );
}
