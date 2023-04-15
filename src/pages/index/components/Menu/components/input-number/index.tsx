import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.module.scss';
export default function index(props) {
  let [count, setCount] = useState(0);
  let { max, min, onChange } = props;
  const handleSub = () => {
    if (count === min) {
      return;
    }
    setCount((prevState) => {
      prevState = prevState - 1;
      props.onChange(prevState);
      return prevState;
    });
  };

  const handleAdd = () => {
    if (count === max) {
      return;
    }
    setCount((prevState) => {
      prevState = prevState + 1;
      props.onChange(prevState);
      return prevState;
    });
  };
  return (
    <View className='input-number'>
      {count > 0 && (
        <>
          <View className='at-icon at-icon-subtract' onClick={() => handleSub()}></View>
          <Text className='count'>{count}</Text>
        </>
      )}
      <View className='at-icon at-icon-add' onClick={() => handleAdd()}></View>
    </View>
  );
}
