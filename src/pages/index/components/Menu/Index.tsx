import React, { useState, useRef, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, ScrollView } from '@tarojs/components';
import { Image } from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui';
import Taro from '@tarojs/taro';
import InputNumber from './components/input-number/index';
import request from '../../../../utils/request';
import {APIPATH} from '../../../../utils/request/config';
import LanguageContext from '../../../../context/language-context';
import './index.module.scss';
function Menu(props) {
  const [tab1value, setTab1value] = useState<number>(0);
  const [leftCur, setLeftCur] = useState<number>(1);
  const [contentTop, setContentTop] = useState<number[]>([]);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [isSettingScroll, setIsSettingScroll] = useState<boolean>(false);
  const { messages } = useContext(LanguageContext);
  const [menuList, setMenuList] = useState([]);
  const dispatch = useDispatch();
  const rightMenu = useRef(null);
  const query = Taro.createSelectorQuery();
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
      Object.entries(map).forEach(([key, value], index) => {
        rigthArr.push({ type: key, arr: value });
        query.select('#goods-box' + index).boundingClientRect();
      });
      setMenuList(rigthArr);
      query.selectViewport().scrollOffset();
      setTimeout(() => {
        query.exec((resQuery) => {
          let tops: any = [];
          let fristTop: number = 0;
          console.log(resQuery);
          resQuery.map((item, i) => {
            if (i < rigthArr.length) {
              if (i == 0) {
                fristTop = item.top;
                tops.push(0);
              } else {
                tops.push(parseInt((item.top - fristTop).toString()));
              }
            }
          });
          setContentTop(tops);
        });
      }, 500);
    });
  }, []);

  const handleScroll = (e) => {
    if (!isSettingScroll) {
      // 处理滚动逻辑
      let scrollTop = e.detail.scrollTop;
      if (scrollTop >= 200) {
        props.setIsNeedExtend(1);
      } else {
        props.setIsNeedExtend(0);
      }
      if (contentTop.length > 1) {
        let index = 1;
        for (let i = 1; index < contentTop.length; i++) {
          if (scrollTop >= contentTop[i - 1] && scrollTop < contentTop[i]) {
            index = i;
            break;
          }
        }
        if (leftCur != index) {
          setLeftCur(index);
        }
      }
    }
  };

  const setScroll = (index) => {
    setIsSettingScroll(true);
    setLeftCur(index + 1);
    setScrollTop(+contentTop[index]);
    setTimeout(() => {
      setIsSettingScroll(false);
    }, 500);
  };

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

  function handleCountChange(value, good) {
    dispatch({ type: 'CART_LIST_CHANGE', data: { value, good } });
  }

  function handleChangeTab(paneKey) {
    setTab1value(paneKey);
  }
  const tabList = [
    // { title: messages.dynamic },
    { title: messages.placeAnOrder },
  ];
  return (
    <View className='index-content'>
      <AtTabs
        animated={false}
        current={tab1value}
        tabList={tabList}
        onClick={(paneKey) => {
          handleChangeTab(paneKey);
        }}
      >
        {/* <AtTabsPane current={tab1value} className='shop-message' index={0}>
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
        </AtTabsPane> */}
        <AtTabsPane current={tab1value} index={0}>
          {/* props.isNeedExtend */}
          <View className={`${props.isNeedExtend ? 'order-content isExtend' : 'order-content'}`}>
            <ScrollView className='menu-left'>
              {menuList.map((item, index) => (
                <View
                  key={index}
                  className='menu-item'
                  style={{ color: index + 1 === leftCur ? '#F24822' : '#919191' }}
                  onClick={() => {
                    setScroll(index);
                  }}
                >
                  {item.type}
                </View>
              ))}
            </ScrollView>
            <ScrollView className='menu-right' ref={rightMenu} onScroll={handleScroll} scrollTop={scrollTop} scrollY={true}>
              {menuList.map((item, index) => (
                <View key={index} className='goods-box' id={`goods-box` + index}>
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
