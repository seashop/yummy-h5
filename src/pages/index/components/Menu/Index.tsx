import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, ScrollView } from '@tarojs/components';
import { Image } from '@tarojs/components';
import { usePageScroll } from '@tarojs/taro';
import { AtTabs, AtTabsPane } from 'taro-ui';
import Taro from '@tarojs/taro';
import InputNumber from './components/input-number/index';
import request from '../../../../utils/request';
import APIPATH from '../../../../utils/request/config';
import './index.module.scss';
function Menu() {
  const [tab1value, setTab1value] = useState<number>(0);
  const [leftCur, setLeftCur] = useState<number>(0);
  const goodsBoxOffsetHeightArr = useRef([]);
  const [leftVal, setLeftVal] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const dispatch = useDispatch();
  const rightMenu = useRef(null);
  useEffect(() => {
    request({
      url: APIPATH.getProductList,
      method: 'get',
      data: {},
    }).then((res) => {
      let map = {};
      let rigthArr = [];
      res.products.forEach((item, index) => {
        let { catTitle } = item;
        if (map[catTitle]) {
          map[catTitle].push(item);
        } else {
          map[catTitle] = [item];
        }
      });
      Object.entries(map).forEach(([key, value]) => {
        rigthArr.push({ type: key, arr: value });
      });
      setMenuList(rigthArr);
    });
  }, []);

  let messageList = [
    {
      text: '这里是发布的文字内容，字号36，左右对齐，两边间距各30....',
      imgList: ['//img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg'],
      date: '2023-1-6 11:48',
    },
    {
      text: '这里是发布的文字内容，字号36，左右对齐，两边间距各30....',
      imgList: [
        '//img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg',
        '//img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg',
      ],
      date: '2023-1-6 11:48',
    },
    {
      text: '这里是发布的文字内容，字号36，左右对齐，两边间距各30....',
      imgList: ['//img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg'],
      date: '2023-1-6 11:48',
    },
  ];
  // 点击左侧菜单
  function handleLeftMenuClick(type: number) {
    // hack 修改scrollTop 同时触发了scroll事件
    setTimeout(() => {
      setLeftCur(type);
    }, 20);
    rightMenu.current.scrollTop = goodsBoxOffsetHeightArr.current[type];
  }

  function handleCountChange(value, good) {
    console.log(value, good);
    dispatch({ type: 'CART_LIST_CHANGE', data: { value, good } });
  }

  function handleChangeTab(paneKey) {
    setTab1value(paneKey);
  }

  useEffect(() => {
    Taro.createSelectorQuery()
      .select('.goods-box')
      .boundingClientRect((res) => {
        console.log(res); // 获取元素的offsetTop
      })
      .exec();
    let goodsBoxEls = document.getElementsByClassName('goods-box');
    let arr = [];
    for (let el of goodsBoxEls) {
      arr.push(el.offsetTop);
      goodsBoxOffsetHeightArr.current = arr;
      // setGoodsBoxOffsetHeightArr(arr)
    }
  });

  useEffect(() => {
    rightMenu.current.addEventListener('scroll', () => {
      let scrollTop = rightMenu.current.scrollTop;
      let arr = goodsBoxOffsetHeightArr.current;
      let curIndex = 0;
      // 与左侧联动
      for (let i = 1; i < arr.length; i++) {
        if (i - 1 >= 0 && arr[i - 1] < scrollTop && arr[i] > scrollTop) {
          curIndex = i - 1;
          // setLeftCur(i-1)
        } else if (scrollTop > arr[arr.length - 1]) {
          curIndex = arr.length - 1;
          // setLeftCur(arr.length - 1)
        }
      }
      setLeftCur(curIndex);
    });
    return () => {
      rightMenu.current.removeEventListener('scroll', () => {});
    };
  }, []);

  return (
    <View className='index-content'>
      <AtTabs
        animated={false}
        current={tab1value}
        tabList={[{ title: '动态' }, { title: '下单' }]}
        onClick={(paneKey) => {
          handleChangeTab(paneKey);
        }}
      >
        <AtTabsPane current={tab1value} className='shop-message' index={0}>
          <View className='message-box'>
            {messageList.map((item, index) => {
              return (
                <View key={index} className='message-item'>
                  <Text className='message-text'>{item.text}</Text>
                  <View className='img-box'>
                    {item.imgList.map((imgItem, imgIndex) => {
                      return (
                        <Image
                          style={{
                            width: Taro.pxTransform(220),
                            height: Taro.pxTransform(225),
                          }}
                          key={imgIndex}
                          src={imgItem}
                        ></Image>
                      );
                    })}
                  </View>
                  <Text className='date'>{item.date}</Text>
                </View>
              );
            })}
          </View>
        </AtTabsPane>
        <AtTabsPane current={tab1value} index={1}>
          <View className='order-content'>
            <ScrollView className='menu-left'>
              {menuList.map((item, index) => (
                <View
                  key={index}
                  className='menu-item'
                  style={{ color: index === leftCur ? '#F24822' : '#919191' }}
                  onClick={() => handleLeftMenuClick(index)}
                >
                  {item.type}
                </View>
              ))}
            </ScrollView>
            <ScrollView className='menu-right' ref={rightMenu}>
              {menuList.map((item, index) => (
                <View key={index} className='goods-box'>
                  <Text>{item.type}</Text>
                  <View>
                    {item.arr.map((good, index1) => {
                      return (
                        <View key={index1} className='goods-item'>
                          <Image
                            className='good-image'
                            style={{
                              width: Taro.pxTransform(195),
                              height: Taro.pxTransform(195),
                            }}
                            src={APIPATH.getImgUrl.replace('{id}', good.imgIds[0])}
                          ></Image>
                          <View className='good-info'>
                            <Text>{good.title}</Text>
                            <View className='amount-count'>
                              <Text className='good-amnout'>{good.price.toFixed(2)}</Text>
                              <InputNumber min={0} max={99} onChange={(value) => handleCountChange(value, good)}></InputNumber>
                              {/* <AtInputNumber
                                className="good-count"
                                min={0}
                                disabledInput
                                value={0}
                                onChange={(value) =>
                                  handleCountChange(value, good)
                                }
                              ></AtInputNumber> */}
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </AtTabsPane>
      </AtTabs>
    </View>
  );
}
export default Menu;
