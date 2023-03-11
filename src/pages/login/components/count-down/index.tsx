import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import './index.module.scss';
const CountdownTimer = ({ seconds, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  useEffect(() => {
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);
  useEffect(() => {
    if (!timeLeft) onComplete();
  }, [timeLeft, onComplete]);
  return (
    <View className='count-down-cotainer'>
      <AtButton type='secondary'>{timeLeft}s</AtButton>
    </View>
  );
};
export default CountdownTimer;
