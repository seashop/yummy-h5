import React, { useEffect, useState, useContext } from 'react';
import useUserToken from '../../hooks/useUserToken';
import { AtFloatLayout } from 'taro-ui';
import { View, Text } from '@tarojs/components';
import { Image } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import request from '../../utils/request';
import {APIPATH} from '../../utils/request/config';
import LanguageContext from '../../context/language-context';
import './index.module.scss';
export default function index() {
  const { messages, language } = useContext(LanguageContext);
  const [isVip, setIsVip] = useState(true);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    setIsOpened(true);
  }, []);
  return (
    <View className='membership-detail-container'>
      <View className='member-card'>
        <View className='header'>
          <Image
            className='image'
            style={{
              width: Taro.pxTransform(28),
              height: Taro.pxTransform(22),
            }}
            src={require('./assets/icon.png')}
          ></Image>
          <Text className='text'>{isVip ? '已是本店会员' : '本店会员可享'}</Text>
        </View>
        <View className='content'>
          <Image
            className='image'
            style={{
              width: Taro.pxTransform(56),
              height: Taro.pxTransform(56),
            }}
            src={require('./assets/gift.png')}
          ></Image>
          <Text className='text'>消费满10元，自动抹去零头</Text>
        </View>
      </View>
      {isVip ? (
        <View className='mebership-content'>
          <View className='text'>可享以下优惠</View>
          <View className='list'>消费满10元自动抹去零头</View>
        </View>
      ) : null}
      <AtFloatLayout isOpened={isOpened} onClose={() => setIsOpened(false)}>
        <View className='dialog'>
          <Text>长按识别二维码加老板微信，成为会员</Text>
        </View>
      </AtFloatLayout>
    </View>
  );
}
