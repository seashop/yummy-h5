import { View, Text } from '@tarojs/components';
import { useState, useRef, useEffect } from 'react';
import { AtFloatLayout, AtIcon, AtDivider } from 'taro-ui';
import { Image } from '@tarojs/components';
import { useSelector, useDispatch } from 'react-redux';
import './index.module.scss';
import Taro from '@tarojs/taro';
import Menu from './components/Menu/Index';
import request from '../../utils/request/index';
import APIPATH from '../../utils/request/config';
function Index() {
  const [showBottomRound, setShowBottomRound] = useState(false);
  const cartList = useSelector((state) => state.cart.cartList);
  const allAmount = useSelector((state) => state.cart.allAmount);
  const [merchantInfo, setMerchantInfo] = useState<any>({});
  const dispatch = useDispatch();
  useEffect(() => {
    let token = Taro.getStorageSync('yummyh5-token');
    if (!token) {
      Taro.redirectTo({ url: '/pages/login/index' });
    }

    // 获取商户信息
    request({
      url: APIPATH.getMerchantInfo,
      method: 'get',
    }).then((res) => {
      setMerchantInfo(res);
    });
  }, []);

  const handleOrder = () => {
    if (!cartList.length) {
      return;
    }
    Taro.navigateTo({ url: '/pages/order/index' });
  };

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
            <Text>欢迎下单~</Text>
            {/* <Text>加老板微信成为会员，享优惠</Text>
            <View className="btn">
              <Text>成为会员</Text>
            </View> */}
          </View>
        </View>
      </View>
      <Menu></Menu>
      <View className='index-bottom'>
        <View className='cart'>
          <Image
            className='image'
            style={{
              width: Taro.pxTransform(60),
              height: Taro.pxTransform(60),
            }}
            src={cartList.length === 0 ? require('./assets/cart-empty.png') : require('./assets/cart.png')}
          ></Image>
          {cartList.length > 0 && <View className='cart-count'>{cartList.length}</View>}
          <Text>合计 {allAmount}</Text>
        </View>
        <View className='btn' onClick={() => handleOrder()}>
          Order now
        </View>
      </View>
      <AtFloatLayout
        isOpened={showBottomRound}
        onClose={() => {
          setShowBottomRound(false);
        }}
      >
        <View className='bottom-popup'>
          <Image
            className='avatar'
            style={{
              width: Taro.pxTransform(120),
              height: Taro.pxTransform(120),
            }}
            src={require('./assets/cart.png')}
          ></Image>
          <Text className='name'>{merchantInfo.title}</Text>
          <Text className='desc'>{merchantInfo.slogan}</Text>
          <View className='content'>
            <AtIcon value='user' size='30'></AtIcon>
            <Text>13333</Text>
          </View>
          <AtDivider></AtDivider>
          <View className='content'>
            <AtIcon value='message' size='30'></AtIcon>
            <Text>13333</Text>
          </View>
          <AtDivider></AtDivider>
          <View className='content'>
            <AtIcon value='home' size='30'></AtIcon>
            <Text>13333</Text>
          </View>
        </View>
      </AtFloatLayout>
    </View>
  );
}

export default Index;
