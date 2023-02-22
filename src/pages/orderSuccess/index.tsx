import React from 'react'

import {useSelector} from 'react-redux'
import { View, Text } from '@tarojs/components'
import { Image } from '@nutui/nutui-react';
import Taro from '@tarojs/taro';
import request from '../../utils/request'
import APIPATH from '../../utils/request/config'
import successIcon from './assets/success-icon.jpg'
import './index.module.scss'
export default function index() {

  return (
    <div className='order-success-container'>
      <Image
        src={successIcon}
        width={Taro.pxTransform(219)}
        height={Taro.pxTransform(219)}>
      </Image>
      <View className='success-text'>Ordered Sucessfully</View>
      <View className='wait-text'>商家备餐中，请稍等…</View>

      <View className='order-num'>A006</View>
      <View className='order-amount'>S$ 16.00</View>
      <View className='order-time'>Order Time: 2022-12-22 08:53:40</View>
    </div>
  )
}
