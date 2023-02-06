import React, { useState, useRef, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { View, Text } from '@tarojs/components'
import { Tabs, TabPane, Image, InputNumber } from '@nutui/nutui-react';
import Taro from '@tarojs/taro';
import './index.module.scss'
function Menu() {
  const [tab1value, setTab1value] = useState<string>('0');
  const [leftCur, setLeftCur] = useState<number>(0)
  const goodsBoxOffsetHeightArr = useRef([])
  const dispatch = useDispatch()
  const cartList = useSelector(state => state.cart.cartList)
  const allAmount = useSelector(state => state.cart.allAmount)
  const rightMenu = useRef(null);


  const leftVal = [{id: 0, name: '司康'}, {id: 1, name: '肉桂卷'}, {id:2, name: '贝果'}]
  let rightVal = [
    {rootIndex: 0, type: '司康', arr: [
      {id: 0, img: '', name: 'Mocktail', amount: 15},
      {id: 1, img: '', name: 'Mocktail', amount: 16},
      {id: 2, img: '', name: 'Mocktail', amount: 17},
      {id: 3, img: '', name: 'Mocktail', amount: 18}]},
    {rootIndex: 1, type: '肉桂卷', arr: [
      {id: 4, img: '', name: 'Mocktail1', amount: 15},
      {id: 5, img: '', name: 'Mocktail1', amount: 16},
      {id: 6, img: '', name: 'Mocktail1', amount: 17},
      {id: 7, img: '', name: 'Mocktail1', amount: 18}]},
    {rootIndex: 2, type: '贝果', arr: [
      {id: 8, img: '', name: 'Mocktail1', amount: 15},
      {id: 9, img: '', name: 'Mocktail1', amount: 16},
      {id: 10, img: '', name: 'Mocktail1', amount: 17},
      {id: 11, img: '', name: 'Mocktail1', amount: 18}]}]

  let messageList = [
    {
      text: '这里是发布的文字内容，字号36，左右对齐，两边间距各30....',
      imgList: ['//img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg'],
      date: '2023-1-6 11:48'
    },
    {
      text: '这里是发布的文字内容，字号36，左右对齐，两边间距各30....',
      imgList: ['//img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg', '//img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg'],
      date: '2023-1-6 11:48'
    },
    {
      text: '这里是发布的文字内容，字号36，左右对齐，两边间距各30....',
      imgList: ['//img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg'],
      date: '2023-1-6 11:48'
    },
  ]
    // 点击左侧菜单
  function handleLeftMenuClick (type: number) {
    // hack 修改scrollTop 同时触发了scroll事件
    setTimeout(() => {
      setLeftCur(type)
    }, 20);
    rightMenu.current.scrollTop = goodsBoxOffsetHeightArr.current[type]
  }

  function handleCountChange(value, e, good) {
    dispatch({type: 'CART_LIST_CHANGE', data: {value, good}})
  }


  useEffect(() => {
    let goodsBoxEls = document.getElementsByClassName('goods-box')
    let arr = []
    for(let el of goodsBoxEls) {
      arr.push(el.offsetTop)
      goodsBoxOffsetHeightArr.current = arr
      // setGoodsBoxOffsetHeightArr(arr)
    }
  })

  useEffect(() => {
    rightMenu.current.addEventListener('scroll', () => {
      let scrollTop = rightMenu.current.scrollTop
      let arr = goodsBoxOffsetHeightArr.current
      let curIndex = 0
      // 与左侧联动
      for (let i = 1; i < arr.length; i++) {
        if (i - 1 >= 0 && arr[i-1] < scrollTop && arr[i] > scrollTop) {
          curIndex = i - 1
          // setLeftCur(i-1)
        } else if (scrollTop > arr[arr.length - 1]) {
          curIndex = arr.length - 1
          // setLeftCur(arr.length - 1)
        }
      }
      setLeftCur(curIndex)
    })
    return () => {
      rightMenu.current.removeEventListener('scroll', () => {})
    }
  }, [])

  return (
    <View className='index-content'>
    <Tabs value={tab1value} onChange={({ paneKey }) => {
      setTab1value(paneKey)
    }}>
      <TabPane title="动态" className='shop-message'>
        <View className="message-box">
          {
            messageList.map((item, index) => {
              return <View key={index} className="message-item">
                <Text className='message-text'>{item.text}</Text>
                <View className='img-box'>
                  {item.imgList.map((imgItem, imgIndex) => {
                    return <Image
                      key={imgIndex}
                      src={imgItem}
                      onClick={() => handleClickImage(imgItem)}
                      width={Taro.pxTransform(220)}
                      height={Taro.pxTransform(225)}>
                    </Image>
                  })}
                </View>
                <p className='date'>{item.date}</p>
              </View>
            })
          }
        </View>
      </TabPane>
      <TabPane title="下单" className='order-content'>
        <View
          className='menu-left'>
          {leftVal.map((item, index) =>
            <View
              key={index}
              className='menu-item'
              style={{color: (item.id === leftCur) ? '#F24822' : '#919191'}}
              onClick={() => handleLeftMenuClick(item.id)}>
                {item.name}
            </View>)}
        </View>
        <View className='menu-right' ref={rightMenu}>
            {rightVal.map((item, index) => <View key={index} className='goods-box'>
                <p>{item.type}</p>
                <View>{item.arr.map((good, index1) => {
                  return <View key={index1} className='goods-item'>
                    <Image
                      className='good-image'
                      src={require('../../assets/goods-img-default.png')}
                      width={Taro.pxTransform(195)}
                      height={Taro.pxTransform(195)}>
                    </Image>
                    <View className="good-info">
                      <Text>{good.name}</Text>
                      <View className='good-count'>
                        <Text className='good-amnout'>{good.amount}</Text>
                        <InputNumber min={0} readonly onChangeFuc={(value, e) => handleCountChange(value, e, good)}></InputNumber>
                      </View>
                    </View>
                  </View>
                })}
              </View>
            </View>)}
        </View>
      </TabPane>
    </Tabs>
    </View>
  )
}
export default Menu
