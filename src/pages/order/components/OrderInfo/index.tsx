import React, { useEffect, useState, useContext } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image, Input } from '@tarojs/components';
import { useSelector } from 'react-redux';
import LanguageContext from '../../../../context/language-context';
import {APIPATH} from '../../../../utils/request/config';
import './index.module.scss';
export default function index() {
  const cartList = useSelector((state) => state.cart.cartList);
  const allAmount = useSelector((state) => state.cart.allAmount);
  const { language, messages } = useContext(LanguageContext);
  const [extraText, UpdateExtraText] = useState('');
  const arr: any = [
    {
      img: '//img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg',
      text: '默认到店自提，如需快递请加购邮费',
      count: 2,
      amount: 15,
    },
    {
      img: '//img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg',
      text: '默认到店自提，如需快递请加购邮费',
      count: 2,
      amount: 15,
    },
  ];

  return (
    <View className='order-info-container'>
      <Text className='goods-count'>{language === 'cn' ? `共${cartList.length}件商品` : `${cartList.length} items in total`}</Text>
      <View className='goods-list'>
        {cartList.map((item, index) => {
          return (
            <View className='goods-item' key={index}>
              <Image
                src={APIPATH.getImgUrl.replace('{id}', item.imgIds[0])}
                style={{
                  width: Taro.pxTransform(70),
                  height: Taro.pxTransform(70),
                }}
              ></Image>
              <Text className='good-name'>{item.title}</Text>
              <Text className='good-count'>x{item.count}</Text>
              <Text className='good-amount'>{item.price.toFixed(2)}</Text>
            </View>
          );
        })}
      </View>
      <View className='goods-amount'>
        {messages.total}&nbsp;
        {allAmount}
      </View>
      <View className='extra-text'>
        <Text className='text'>{messages.notes}</Text>
        <Input type='text' placeholder={messages.Optional} />
      </View>
    </View>
  );
}
