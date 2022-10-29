import React, { useState } from "react";
import { Badge, Button, Popup, Toast } from "antd-mobile";
import { useNavigate } from "react-router";
import shoppingCartImg from "@img/shopping_cart.png";
import "./orderBottom.scss";
import OrderList from "./OrderList";
import Path from "../../../../path";
import request from "../../../../request";

const Bottom = (props) => {
  const { orderList, updateOrderList } = props;
  const nav = useNavigate();
  const [visible, setVisible] = useState(false);
  const totalCount = orderList.reduce((total, cur) => {
    total += Number(cur.count);
    return total;
  }, 0);
  const totalPrice = orderList.reduce((total, cur) => {
    total += Number(cur.price) * Number(cur.count);
    return total;
  }, 0);
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    if (orderList.length === 0) {
      return Toast.show({
        content: "请添加餐品",
        icon: "fail",
      });
    }
    setLoading(true);
    const url = `${Path.APIBaseUrl}${Path.v0.orderPlace}`;
    const data = {
      coupon_id: 0,
      coupon_price: 0,
      delivery_method: "local",
      dintbl_id: "",
      goods_id: orderList.map((item) => item.goods_id),
      invite_code: "",
      items: orderList.map((item) => {
        return {
          goods_id: item.goods_id,
          num: item.count,
          price: item.price,
          sku_id: 0,
        };
      }),
      message: "123",
      order_from: "wap",
      pay_cate: "empty",
      payment_type: "wx",
      privacy_status: true,
      total_price: totalPrice,
    };
    try {
      const result = await request.post(url, data);
      console.log("order--->", result);
      if (result.code === 0) {
        nav("/result/" + result.result.id);
      } else {
        Toast.show({
          content: result.message,
          icon: "fail",
        });
      }
      setLoading(false);
    } catch (error) {
      Toast.show({
        content: "network error",
        icon: "fail",
      });
      setLoading(false);
      nav("/result/12345678");
    }
  };
  const handleShowOrderList = () => {
    setTimeout(() => {
      setVisible(true);
    }, 500);
  };
  return (
    <div className="orderBottom">
      <Badge content={totalCount}>
        <img
          src={shoppingCartImg}
          className="cartImg"
          onClick={handleShowOrderList}
        />
      </Badge>
      <div className="totalPrice">Price: ${totalPrice.toFixed(2)}</div>
      <Button
        loading={loading}
        color="primary"
        fill="none"
        className="orderBtn"
        loadingText=""
        onClick={handleClick}
      >
        Order Now
      </Button>
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{ height: "40vh", marginBottom: 51 }}
      >
        <OrderList
          updateOrderList={updateOrderList}
          orderList={[...orderList]}
        />
      </Popup>
    </div>
  );
};

export default Bottom;
