import { View, Text } from '@tarojs/components'
import { Image, Popup, Divider, Icon } from '@nutui/nutui-react';
import { useState, useRef, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import './index.module.scss'
import Taro from '@tarojs/taro';
import Menu from './components/Menu/Index'

function Index () {
  console.log('rerender')
  const [showBottomRound, setShowBottomRound] = useState(false);
  const cartList = useSelector(state => state.cart.cartList)
  const allAmount = useSelector(state => state.cart.allAmount)


  return (
    <View className='index'>
      <View className='index-bg'>
        <View className='bg-info'>
          <View className='avatar'></View>
          <View className='info' onClick={() => setShowBottomRound(true)}>
            <View>
              <Text className='text fs-38'>HAB|面包房</Text>
            </View>
            <View>
              <Text className='text fs-30'>温润落胃的日常面包</Text>
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
        <View className='btn' onClick={() => Taro.navigateTo({url: 'pages/order/index'})}>
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
          <Text className='name'>HAB|面包房</Text>
          <p className='desc'>温润落胃的日常面包</p>
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

