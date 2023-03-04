import React, { useEffect, useState } from "react";

import useUserToken from "../../hooks/useUserToken";
import { View, Text } from "@tarojs/components";
import { Image } from "@tarojs/components";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import request from "../../utils/request";
import APIPATH from "../../utils/request/config";
import successIcon from "./assets/success-icon.png";
import "./index.module.scss";
export default function index() {
  const userToken = useUserToken();
  const [total, setTotal] = useState(0);
  const [pickCode, setPickCode] = useState("");
  const [orderTime, setOrderTime] = useState("");
  useEffect(() => {
    let routerParams = getCurrentInstance().router.params;
    console.log(routerParams);
    request({
      url: APIPATH.getOrderDetail.replace("{id}", routerParams.orderId),
      method: "get",
      header: {
        Authorization: "Bearer " + userToken,
      },
    }).then((res) => {
      console.log(res);
      let { total, createdAt, pickCode } = res.order;
      setTotal(total);
      setPickCode(pickCode);
      setOrderTime(createdAt);
    });
  }, []);

  return (
    <View className="order-success-container">
      <Image
        src={successIcon}
        style={{
          width: Taro.pxTransform(132.74),
          height: Taro.pxTransform(132.74),
        }}
      ></Image>
      <View className="success-text">Ordered Sucessfully</View>
      <View className="wait-text">商家备餐中，请稍等…</View>

      <View className="order-num">{pickCode}</View>
      <View className="order-amount">S$ {total}</View>
      <View className="order-time">Order Time: {orderTime}</View>
    </View>
  );
}
