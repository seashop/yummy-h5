import React, { useEffect, useState, useContext } from 'react';
import { AtModal } from 'taro-ui';
import useUserToken from '../../hooks/useUserToken';
import { View, Text } from '@tarojs/components';
import { Image } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import request from '../../utils/request';
import APIPATH from '../../utils/request/config';
import successIcon from './assets/success-icon.png';
import LanguageContext from '../../context/language-context';
import './index.module.scss';
export default function index() {
  const userToken = useUserToken();
  const [total, setTotal] = useState(0);
  const [pickCode, setPickCode] = useState('');
  const [orderTime, setOrderTime] = useState('');
  const [isOpened, setIsOpened] = useState(false);
  const { messages, language } = useContext(LanguageContext);
  const [dialogContent, setDialogContent] = useState('');
  const loginEmail = Taro.getStorageSync('login-email') || '';
  useEffect(() => {
    let routerParams = getCurrentInstance().router.params;
    console.log(routerParams);
    request({
      url: APIPATH.getOrderDetail.replace('{id}', routerParams.orderId),
      method: 'get',
      header: {
        Authorization: 'Bearer ' + userToken,
      },
    }).then((res) => {
      console.log(res);
      let { total, createdAt, pickCode } = res.order;
      setTotal(total);
      setPickCode(pickCode);
      setOrderTime(createdAt);
    });
  }, []);

  const handleSendMail = () => {
    if (loginEmail) {
      setDialogContent(messages.confirmSendOrderToMail);
    } else {
      setDialogContent(messages.plaseLoginWithMail);
    }
    setIsOpened(true);
  };

  const handleConfirm = () => {
    setIsOpened(false);
    if (loginEmail) {
      // setDialogContent('订单将发送邮箱');
      Taro.showToast({
        title: messages.sendOrderToMailToast,
        icon: 'none',
        duration: 2000,
      });
    } else {
      Taro.navigateTo({ url: '/pages/login/index?from=orderSuccess' });
    }
  };

  return (
    <View className='order-success-container'>
      <Image
        src={successIcon}
        style={{
          width: Taro.pxTransform(132.74),
          height: Taro.pxTransform(132.74),
        }}
      ></Image>
      <View className='success-text'>{messages.orderSuccess}</View>
      <View className='wait-text'>{messages.preparing}</View>
      <View className='order-num'>{pickCode}</View>
      <View className='order-amount'>S$ {total}</View>
      <View className='order-time'>
        {messages.orderTime}: {new Date(orderTime).toLocaleString()}
      </View>
      <View className='send-btn' onClick={handleSendMail}>
        <svg width='25' height='25' viewBox='0 0 33 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M28.6364 0H4.09091C3.00593 0 1.96539 0.431005 1.1982 1.1982C0.431005 1.96539 0 3.00593 0 4.09091L0 30H32.7273V4.09091C32.7273 3.00593 32.2963 1.96539 31.5291 1.1982C30.7619 0.431005 29.7213 0 28.6364 0V0ZM4.09091 2.72727H28.6364C28.998 2.72727 29.3449 2.87094 29.6006 3.12667C29.8563 3.3824 30 3.72925 30 4.09091V5.00045L19.2573 15.7445C18.4888 16.51 17.4483 16.9397 16.3636 16.9397C15.279 16.9397 14.2385 16.51 13.47 15.7445L2.72727 5.00045V4.09091C2.72727 3.72925 2.87094 3.3824 3.12667 3.12667C3.3824 2.87094 3.72925 2.72727 4.09091 2.72727V2.72727ZM2.72727 27.2727V8.86364L11.5418 17.6727C12.8218 18.9494 14.5558 19.6664 16.3636 19.6664C18.1715 19.6664 19.9055 18.9494 21.1855 17.6727L30 8.86364V27.2727H2.72727Z'
            fill='white'
          />
        </svg>
        {messages.sendOrderToMail}
      </View>
      <AtModal
        className='send-mail-dialog'
        isOpened={isOpened}
        cancelText={messages.cancle}
        confirmText={loginEmail ? messages.confirm : messages.login}
        onClose={() => setIsOpened(false)}
        onCancel={() => setIsOpened(false)}
        onConfirm={handleConfirm}
        content={dialogContent}
      />
    </View>
  );
}
