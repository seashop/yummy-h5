import React from 'react'
import Taro from '@tarojs/taro';
import TakeWay from './components/TakeWay/index'
import {useSelector} from 'react-redux'
import { View, Text } from '@tarojs/components'
import OrderInfo from './components/OrderInfo/index'
import request from '../../utils/request'
import APIPATH from '../../utils/request/config'
import useUserToken from '../../hooks/useUserToken'
import './index.module.scss'
export default function index() {
  const allAmount = useSelector(state => state.cart.allAmount)
  const cartList = useSelector(state => state.cart.cartList)
  const userToken = useUserToken()
  const handlePay = () => {
    request({
      url: APIPATH.createOrder,
      method: 'post',
      header: {
        Authorization: 'Bearer ' + userToken
      },
      data: {
        products: cartList.map((item) => {
          return {
            productId: item.id,
            quantity: +item.count
          }
        })
      }
    }).then((res) => {
      Taro.navigateTo({url: `pages/orderSuccess/index?orderId=${res.order.id}`})
    })
  }
  return (
    <div className='order-cotainer'>
      <TakeWay/>
      <OrderInfo/>
      <div className='bottom'>
        <View>
          <span>合计</span><span className='total-price'>{allAmount}</span>
        </View>
        <p className='pay-button' onClick={() => handlePay()}>Pay now</p>
      </div>
    </div>
  )
}
