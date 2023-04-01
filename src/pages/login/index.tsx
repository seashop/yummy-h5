import React, { useEffect, useState, useRef, useContext } from 'react';
import { View, Text, Image, Button } from '@tarojs/components';
import { AtInput, AtButton, AtDivider, AtToast, AtCheckbox, AtFloatLayout } from 'taro-ui';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { useSelector, useDispatch } from 'react-redux';
import CountDown from './components/count-down/index';
import request from '../../utils/request';
import APIPATH from '../../utils/request/config';
import './index.module.scss';
import loginBg from './assets/login-bg.png';
import enIcon from './assets/en.jpg';
import cnIcon from './assets/cn.jpg';
import useSetToken from '../../hooks/useSetToken';
import LanguageContext from '../../context/language-context';
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
  const [checked, setChecked] = useState(false);
  const [isOpenPolicy, setIsOpenPolicy] = useState(false);
  const [isShowSelectLanuage, setIsShowSelectLanuage] = useState(false);
  const { data, loginFn: skipLoginFn } = useSetToken();
  const { messages, setLanguage } = useContext(LanguageContext);
  const dispatch = useDispatch();
  const pageFrom = getCurrentInstance().router.params.from;
  const handleMailChange = (value) => {
    setMail(value);
  };
  const handleCodeChange = (value) => {
    setCaptchaInfo({ ...captchaInfo, captchaValue: value });
  };
  const handleClickCodeBtn = () => {
    var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!reg.test(mail)) {
      setErrorText(messages.emailError);
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
      setErrorText(messages.confirmMailAndCaptcha);
      setIsOpenModal(true);
      return;
    }
    if (!captchaInfo.captchaId) {
      setErrorText(messages.captchaText);
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
        Taro.setStorage({
          key: 'login-email',
          data: mail,
        });
        dispatch({ type: 'USER_TOKEN_CHANGE', data: { token: res.token } });
        if (getCurrentInstance().router.params.from) {
          Taro.navigateBack();
        } else {
          Taro.navigateTo({ url: '/pages/index/index' });
        }
      })
      .catch((err) => {
        setErrorText(err.message);
        setIsOpenModal(true);
      });
  };

  const handleSkipLogin = () => {
    skipLoginFn('PROVIDER_ANONYMOUS', '', '', 1);
  };
  const handleChecked = () => {
    setChecked(!checked);
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
        <View className='local-change'>
          <svg
            width={Taro.pxTransform(36)}
            height={Taro.pxTransform(36)}
            viewBox='0 0 36 36'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            onClick={() => setIsShowSelectLanuage(!isShowSelectLanuage)}
          >
            <path
              d='M18 0C14.4399 0 10.9598 1.05568 7.99974 3.03355C5.03966 5.01141 2.73255 7.82263 1.37018 11.1117C0.00779915 14.4008 -0.348661 18.02 0.345873 21.5116C1.04041 25.0033 2.75474 28.2106 5.27209 30.7279C7.78943 33.2453 10.9967 34.9596 14.4884 35.6541C17.98 36.3487 21.5992 35.9922 24.8883 34.6298C28.1774 33.2675 30.9886 30.9604 32.9665 28.0003C34.9443 25.0402 36 21.5601 36 18C35.9948 13.2277 34.0968 8.65232 30.7222 5.27778C27.3477 1.90324 22.7723 0.00516162 18 0V0ZM30.9705 10.5H26.139C25.0575 7.99348 23.6334 5.64913 21.9075 3.534C25.7272 4.57339 28.9835 7.0762 30.9705 10.5ZM24.75 18C24.7377 19.5272 24.497 21.044 24.036 22.5H11.964C11.503 21.044 11.2623 19.5272 11.25 18C11.2623 16.4728 11.503 14.956 11.964 13.5H24.036C24.497 14.956 24.7377 16.4728 24.75 18ZM13.167 25.5H22.833C21.5599 28.0136 19.9322 30.3313 18 32.382C16.0671 30.3318 14.4394 28.0141 13.167 25.5ZM13.167 10.5C14.4402 7.98641 16.0678 5.66874 18 3.618C19.933 5.66816 21.5606 7.98594 22.833 10.5H13.167ZM14.1 3.534C12.3715 5.64868 10.9449 7.99305 9.86101 10.5H5.02951C7.01829 7.07465 10.2775 4.57163 14.1 3.534ZM3.69151 13.5H8.85001C8.46114 14.9687 8.25955 16.4807 8.25001 18C8.25955 19.5193 8.46114 21.0313 8.85001 22.5H3.69151C2.76952 19.5708 2.76952 16.4292 3.69151 13.5ZM5.02951 25.5H9.86101C10.9449 28.007 12.3715 30.3513 14.1 32.466C10.2775 31.4284 7.01829 28.9254 5.02951 25.5ZM21.9075 32.466C23.6334 30.3509 25.0575 28.0065 26.139 25.5H30.9705C28.9835 28.9238 25.7272 31.4266 21.9075 32.466ZM32.3085 22.5H27.15C27.5389 21.0313 27.7405 19.5193 27.75 18C27.7405 16.4807 27.5389 14.9687 27.15 13.5H32.3055C33.2275 16.4292 33.2275 19.5708 32.3055 22.5H32.3085Z'
              fill='black'
              fillOpacity='0.4'
            />
          </svg>
          {isShowSelectLanuage && (
            <View className='select-language-cotainer'>
              <View
                className='language-item'
                onClick={() => {
                  setLanguage('en');
                  setIsShowSelectLanuage(!isShowSelectLanuage);
                }}
              >
                <Image src={enIcon} className='icon-img' />
                <Text className='item-text'>English</Text>
              </View>
              <View
                className='language-item'
                onClick={() => {
                  setLanguage('cn');
                  setIsShowSelectLanuage(!isShowSelectLanuage);
                }}
              >
                <Image src={cnIcon} className='icon-img' />
                <Text className='item-text'>简体中文</Text>
              </View>
            </View>
          )}
        </View>
      </View>
      <View className='login-desc'>
        <Text>{messages.hi}</Text>
        <Text>{messages.loginEmail}</Text>
      </View>
      <View className='login-form'>
        <AtInput type='text' placeholder={messages.emailLoginText} value={mail} onChange={handleMailChange} />
        <View className='form-code'>
          <AtInput type='number' placeholder={messages.captchaText} value={captchaInfo.captchaValue} onChange={handleCodeChange} />
          {!isRecevingCode ? (
            <AtButton type='secondary' onClick={() => handleClickCodeBtn()}>
              {messages.sendVerification}
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
          {messages.login}
        </View>
        {pageFrom === 'orderSuccess' ? (
          ''
        ) : (
          <>
            <AtDivider content='or' fontColor='#C4C4C4' lineColor='#C4C4C4' />
            <View className='fake-login' onClick={handleSkipLogin}>
              {messages.skipLogin}
            </View>
          </>
        )}
      </View>
      <View className='policy'>
        <View className={`radio ${checked ? 'radioChecked' : ''}`} onClick={handleChecked}>
          <View className='radioChild'></View>
        </View>
        <View className='radioText'>
          <Text>{messages.agree}</Text>
          <Text className='span' onClick={() => setIsOpenPolicy(true)}>
            《Privacy Policy》
          </Text>
          <Text>和</Text>
          <Text className='span'>《Terms & Conditions》</Text>
        </View>
      </View>
      <AtToast isOpened={isOpenModal} text={errorText} onClose={() => setIsOpenModal(false)}></AtToast>
      <AtFloatLayout isOpened={isOpenPolicy} onClose={() => setIsOpenPolicy(false)}>
        <View>
          <View></View>
        </View>
      </AtFloatLayout>
    </View>
  );
}
