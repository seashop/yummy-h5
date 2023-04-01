import React, { useContext } from 'react';
import Taro from '@tarojs/taro';
import TakeWay from './components/TakeWay/index';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text } from '@tarojs/components';
import OrderInfo from './components/OrderInfo/index';
import request from '../../utils/request';
import APIPATH from '../../utils/request/config';
import useUserToken from '../../hooks/useUserToken';
import LanguageContext from '../../context/language-context';
import './index.module.scss';
export default function index() {
  const allAmount = useSelector((state) => state.cart.allAmount);
  const cartList = useSelector((state) => state.cart.cartList);
  const userToken = useUserToken();
  const { messages } = useContext(LanguageContext);
  const dispatch = useDispatch();
  const handlePay = () => {
    request({
      url: APIPATH.createOrder,
      method: 'post',
      header: {
        Authorization: 'Bearer ' + userToken,
      },
      data: {
        products: cartList.map((item) => {
          return {
            productId: item.id,
            quantity: +item.count,
          };
        }),
      },
    }).then((res) => {
      Taro.redirectTo({
        url: `/pages/orderSuccess/index?orderId=${res.order.id}`,
      });
      dispatch({ type: 'CART_CLEAR' });
    });
  };
  return (
    <View className='order-cotainer'>
      <TakeWay />
      <OrderInfo />
      <View className='bottom'>
        <View>
          <Text>{messages.total}</Text>&nbsp;
          <Text className='total-price'>{allAmount}</Text>
        </View>
        <View className='pay-button' onClick={() => handlePay()}>
          {messages.goToPay}
        </View>
      </View>
    </View>
  );
}
