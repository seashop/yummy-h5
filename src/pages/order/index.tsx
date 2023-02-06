import React from 'react'
import TakeWay from './components/TakeWay/index'
import OrderInfo from './components/OrderInfo/index'
import './index.module.scss'
export default function index() {
  return (
    <div className='order-cotainer'>
      <TakeWay/>
      <OrderInfo/>
      <div className='bottom'>
        <p>合计30</p>
        <p className='pay-button'>Pay now</p>
      </div>
    </div>
  )
}
