import {useSelector} from 'react-redux'
import Taro from '@tarojs/taro';
export default function useUserToken () {
  const userToken = useSelector(state => state.user.userToken.access)
  const localToken = Taro.getStorageSync('yummyh5-token').access
  return userToken || localToken
}


