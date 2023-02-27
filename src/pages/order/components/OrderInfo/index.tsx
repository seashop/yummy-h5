import React, {useEffect, useState} from 'react'
import Taro from '@tarojs/taro';
import {useSelector} from 'react-redux'
import { Image, Input  } from '@nutui/nutui-react';
import APIPATH from '../../../../utils/request/config'
import './index.module.scss'
export default function index() {
  const cartList = useSelector(state => state.cart.cartList)
  const allAmount = useSelector(state => state.cart.allAmount)
  const [extraText, UpdateExtraText] = useState('')
  const arr: any = [
    {
      img :'//img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg',
      text: '默认到店自提，如需快递请加购邮费',
      count: 2,
      amount: 15
    },
    {
      img :'//img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg',
      text: '默认到店自提，如需快递请加购邮费',
      count: 2,
      amount: 15
    }
  ]

  return (
    <div className='order-info-container'>
      <p className='goods-count'>共2件商品</p>
      <div className='goods-list'>
        {cartList.map((item, index) => {
          return <div className='goods-item' key={index}>
            <Image
              src={APIPATH.getImgUrl.replace('{id}', item.imgIds[0])}
              width={Taro.pxTransform(70)}
              height={Taro.pxTransform(70)}
            ></Image>
            <p className='good-name'>{item.title}</p>
            <p className='good-count'>x{item.count}</p>
            <p className='good-amount'>{item.price}</p>
          </div>
        })}
      </div>
      <div className='goods-amount'>
        合计{allAmount}
      </div>
      <div className='extra-text'>
          <Input
            name="extraText"
            label="备注"
            border={false}
            defaultValue={extraText}
            placeholder="（选填）可填写无接触配送等信息"
            onChange={(val) => {
              UpdateExtraText(val)
            }}/>
      </div>
    </div>
  )
}
