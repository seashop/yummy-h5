import React, { useState } from "react";
import { Badge, Button, Popup, Toast } from "antd-mobile";
import { useNavigate } from "react-router";
import shoppingCartImg from "@img/shopping_cart.png";
import styles from "./orderBottom.scss";
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
    const tableId = sessionStorage.getItem("tableId");
    if (orderList.length === 0) {
      return Toast.show({
        content: "Please Add Meals",
        icon: "fail",
      });
    }
    setLoading(true);
    let url = `${Path.APIBaseUrl}${Path.v0.createCart}`;
    let data = {
      dintbl_id: tableId,
      diners: sessionStorage.getItem("dinners"),
      invite_code: "",
      goods: orderList.map((item) => {
        return {
          goods_id: item.goods_id,
          quantity: item.count,
          // price: item.price,
          sku_id: 0,
        };
      }),
    };
    const cartId = sessionStorage.getItem("cartId");
    if (cartId) {
      url = `${Path.APIBaseUrl}${Path.v0.updateCart}`.replace(
        "{cartId}",
        cartId
      );
      data = {
        goods: orderList.map((item) => {
          return {
            goods_id: item.goods_id,
            quantity: item.count,
            sku_id: 0,
          };
        }),
      };
    }
    try {
      const result = await request.post(url, data);
      console.log("result--->", result);
      if (result.code === 0) {
        sessionStorage.setItem("cartId", result.result.id);
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
    }
  };
  const handleClick1 = async () => {
    const tableId = sessionStorage.getItem("tableId");
    if (orderList.length === 0) {
      return Toast.show({
        content: "Please Add Meals",
        icon: "fail",
      });
    }
    setLoading(true);
    const url = `${Path.APIBaseUrl}${Path.v0.orderPlace}`;
    const data = {
      coupon_id: 0,
      coupon_price: 0,
      delivery_method: "1",
      dintbl_id: tableId,
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
      message: `table: ${sessionStorage.getItem("table")}`,
      order_from: "wap",
      pay_cate: "empty",
      payment_type: "wx",
      privacy_status: true,
      total_price: totalPrice,
      is_anonymous: true,
    };
    const calculateUrl = `${Path.APIBaseUrl}${Path.v0.orderCalculate}`;
    const calculateData = {
      coupon_id: 0,
      coupon_price: 0,
      delivery_method: "1",
      dintbl_id: tableId,
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
      message: `table: ${sessionStorage.getItem("table")}`,
      order_from: "wap",
      pay_cate: "empty",
      payment_type: "wx",
      privacy_status: true,
      total_price: 0,
      is_anonymous: true,
    };
    try {
      const calculateResult = await request.post(calculateUrl, calculateData);
      // console.log("calculateResult--->", calculateResult);
      if (calculateResult.code === 0) {
        const totalMoney = calculateResult.result.total_money;
        data.total_price = totalMoney;
        const result = await request.post(url, data);
        // console.log("order--->", result);
        if (result.code === 0) {
          nav("/result/" + result.result.order_num);
        } else {
          Toast.show({
            content: result.message,
            icon: "fail",
          });
        }
      } else {
        Toast.show({
          content: calculateResult.message,
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
    <div className={styles.orderBottom}>
      <Badge content={totalCount}>
        <img
          src={shoppingCartImg}
          className={styles.cartImg}
          onClick={handleShowOrderList}
        />
      </Badge>
      <div className={styles.totalPrice}>Price: ${totalPrice.toFixed(2)}</div>
      <Button
        loading={loading}
        color="primary"
        fill="none"
        className={styles.orderBtn}
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
