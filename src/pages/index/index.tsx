import { View, Text } from '@tarojs/components'
import { Image, Popup, Divider, Icon } from '@nutui/nutui-react';
import { useState, useRef, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import './index.module.scss'
import Taro from '@tarojs/taro';
import Menu from './components/Menu/Index'
import request from '../../utils/request/index'
import APIPATH from '../../utils/request/config'
function Index () {
  const [showBottomRound, setShowBottomRound] = useState(false);
  const cartList = useSelector(state => state.cart.cartList)
  const allAmount = useSelector(state => state.cart.allAmount)
  const [merchantInfo, setMerchantInfo] = useState<any>({})
  const dispatch = useDispatch()
  useEffect(() => {
    // 匿名登陆
    let token = Taro.getStorageSync('yummyh5-token')
    if (!token) {
      request({
        url: APIPATH.getPassport,
        method: 'post',
        data: {}
      }).then((res) => {
        Taro.setStorage({
          key:"yummyh5-token",
          data: res.token
        })
        dispatch({type: 'USER_TOKEN_CHANGE', data: {token: res.token}})
      })
    } else {
      dispatch({type: 'USER_TOKEN_CHANGE', data: {token: token}})
    }

    // 获取商户信息
    request({
      url: APIPATH.getMerchantInfo,
      method: 'get'
    }).then((res) => {
      setMerchantInfo(res)
    })
  }, [])

  const handleOrder = () => {
    if (!cartList.length) {
      return
    }
    Taro.navigateTo({url: 'pages/order/index'})
  }

  return (
    <View className='index'>
      <View className='index-bg'>
        <View className='bg-info'>
          <View className='avatar'></View>
          <View className='info' onClick={() => setShowBottomRound(true)}>
            <View>
              <Text className='text fs-38'>{merchantInfo.title}</Text>
            </View>
            <View>
              <Text className='text fs-30'>{merchantInfo.slogan}</Text>
            </View>
          </View>
        </View>
        <View>
          <View className='tip'>
            <Text>加老板微信成为会员，享优惠</Text>
            <View className='btn'>
              <Text>成为会员</Text>
            </View>
          </View>
        </View>
      </View>
      <Menu></Menu>
      <View className='index-bottom'>
        <View className='cart'>
          <Image
            className='image'
            src={cartList.length === 0 ? require('./assets/cart-empty.png') : require('./assets/cart.png')}
            width={Taro.pxTransform(60)}
            height={Taro.pxTransform(60)}>
            </Image>
            {cartList.length > 0 && <View className='cart-count'>
                {cartList.length}
            </View>}
          <Text>合计 {allAmount}</Text>
        </View>
        <View className='btn' onClick={() => handleOrder()}>
              Order now
        </View>
      </View>
        <Popup visible={ showBottomRound } style={{ height: '60%' }} position="bottom" round onClose={ () => { setShowBottomRound(false) } } className='bottom-popup'>
          <Image
            className='avatar'
            src={require('./assets/cart.png')}
            width={Taro.pxTransform(120)}
            height={Taro.pxTransform(120)}>
          </Image>
          <Text className='name'>{merchantInfo.title}</Text>
          <p className='desc'>{merchantInfo.slogan}</p>
          <Divider className='divider'/>
          <View className='content'>
            <Icon name="my"></Icon>
            <Text>13333</Text>
          </View>
          <Divider className='divider'/>
          <View className='content'>
            <Icon name="comment"></Icon>
            <Text>13333</Text>
          </View>
          <Divider className='divider'/>
          <View className='content'>
            <Icon name="location"></Icon>
            <Text>13333</Text>
          </View>
          <Divider className='divider'/>
        </Popup>
    </View>
  )
}

export default Index

