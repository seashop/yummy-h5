import React from 'react'
import TakeWay from './components/TakeWay/index'
import {useSelector} from 'react-redux'
import { View, Text } from '@tarojs/components'
import OrderInfo from './components/OrderInfo/index'
import request from '../../utils/request'
import APIPATH from '../../utils/request/config'
import './index.module.scss'
export default function index() {
  const allAmount = useSelector(state => state.cart.allAmount)
  const cartList = useSelector(state => state.cart.cartList)
  const handlePay = () => {
    request({
      url: APIPATH.createOrder,
      method: 'post',
      data: {
        products: cartList.map((item) => {
          return {
            productId: item.id,
            quantity: +item.count
          }
        })
      }
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
