import { View, Text, Button } from '@tarojs/components';
import { useState, useEffect, useContext } from 'react';
import { AtFloatLayout, AtIcon, AtDivider, AtModal, AtButton } from 'taro-ui';
import { Image } from '@tarojs/components';
import useUserToken from '../../hooks/useUserToken';
import { useSelector, useDispatch } from 'react-redux';
import './index.module.scss';
import Taro from '@tarojs/taro';
import Menu from './components/Menu/Index';
import request from '../../utils/request/index';
import APIPATH from '../../utils/request/config';
import useSetToken from '../../hooks/useSetToken';
import LanguageContext from '../../context/language-context';
const curEnv = Taro.getEnv();
function Index() {
  const [showBottomRound, setShowBottomRound] = useState(false);
  const cartList = useSelector((state) => state.cart.cartList);
  const [isVip, setIsVip] = useState(false);
  const allAmount = useSelector((state) => state.cart.allAmount);
  const [merchantInfo, setMerchantInfo] = useState<any>({});
  const [isNeedExtend, setIsNeedExtend] = useState<number>(0);
  const userToken = useUserToken();
  const [isShowGetPhoneModal, setIsShowGetPhoneModal] = useState(false);
  const { data, loginFn: wxLoginFn } = useSetToken();
  const { messages } = useContext(LanguageContext);
  const dispatch = useDispatch();

  useEffect(() => {
    let token = Taro.getStorageSync('yummyh5-token');
    // 获取商户信息
    request({
      url: APIPATH.getMerchantInfo,
      method: 'get',
    }).then((res) => {
      setMerchantInfo(res);
    });
    if (curEnv === Taro.ENV_TYPE.WEB) {
      if (!token) {
        Taro.redirectTo({ url: '/pages/login/index' });
      }
      return;
    }

    if (curEnv === Taro.ENV_TYPE.WEAPP) {
      Taro.login({
        success(res) {
          wxLoginFn('PROVIDER_WECHAT_MINIPROGRAM', res.code, '', 0);
        },
      });
    }
  }, []);

  const handleOrder = () => {
    if (!cartList.length) {
      return;
    }
    Taro.navigateTo({ url: '/pages/order/index' });
  };

  const handleGetUserPhone = (e) => {
    request({
      url: APIPATH.passport,
      method: 'post',
      header: {
        Authorization: 'Bearer ' + userToken,
      },
      data: {
        provider: 'PROVIDER_WECHAT_MINIPROGRAM_PHONE',
        code: e.detail.code,
        auto_signup: true,
      },
    });
  };

  const handleClickContainer = () => {
    if (curEnv !== Taro.ENV_TYPE.WEAPP) return;
    let isShowGetPhone = Taro.getStorageSync('isShowGetPhone');
    console.log(isShowGetPhone);
    if (!isShowGetPhone) {
      setIsShowGetPhoneModal(true);
      Taro.setStorage({
        key: 'isShowGetPhone',
        data: 1,
      });
    } else {
      setIsShowGetPhoneModal(false);
    }
  };

  const goToBeVip = () => {
    Taro.navigateTo({ url: '/pages/membershipDetails/index' });
  };

  return (
    <View className={isNeedExtend ? 'index isExtend' : 'index'} onClick={handleClickContainer}>
      <View className='index-bg'>
        <View className='bg-info'>
          <Image className='avatar' src={APIPATH.getImgUrl.replace('{id}', merchantInfo.logoId)}></Image>
          <View className='info' onClick={() => setShowBottomRound(true)}>
            <View>
              <Text className='text fs-38'>{merchantInfo.title}</Text>
            </View>
            {!isNeedExtend && (
              <View>
                <Text className='text fs-30'>{merchantInfo.slogan}</Text>
              </View>
            )}
          </View>
        </View>
        <View>
          {!isNeedExtend && (
            <View className={isVip ? 'tip vip' : 'tip'}>
              <View>
                <Image
                  className='image'
                  style={{
                    width: Taro.pxTransform(28),
                    height: Taro.pxTransform(22),
                  }}
                  src={require('./assets/icon.png')}
                ></Image>

                {/* <Text>{messages.welcome}</Text> */}
                <Text>{isVip ? '已是本店会员，可消费享抹零优惠' : '加老板微信成为会员，享优惠'}</Text>
              </View>
              {!isVip ? (
                <View className='btn' onClick={goToBeVip}>
                  成为会员
                </View>
              ) : null}
            </View>
          )}
        </View>
      </View>
      <Menu setIsNeedExtend={setIsNeedExtend} isNeedExtend={isNeedExtend}></Menu>
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
          <Text>
            {messages.total} {allAmount}
          </Text>
        </View>
        <View className='btn' onClick={() => handleOrder()}>
          {messages.orderNow}
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
            src={APIPATH.getImgUrl.replace('{id}', merchantInfo.logoId)}
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
      <AtModal isOpened={isShowGetPhoneModal}>
        <Button openType='getPhoneNumber' onGetPhoneNumber={handleGetUserPhone}>
          获取手机号
        </Button>
      </AtModal>
    </View>
  );
}

export default Index;
