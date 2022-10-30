import React, { useState } from "react";
import Category from "./components/Category/Category";
import OrderBottom from "./components/OrderBottom/OrderBottom";
import "./home.scss";

const Home = () => {
  const [orderList, setOrderList] = useState([]);
  const handleOrderList = (product, count) => {
    if (product === null && count === 0) {
      return setOrderList([]);
    }
    console.log("handleOrderList--->", product, count);
    const currentGoodsId = product.goods_id;
    product.count = count;
    if (
      orderList.filter((item) => item.goods_id === currentGoodsId).length === 0
    ) {
      orderList.push(product);
    }
    orderList.forEach((item) => {
      if (item.goods_id === currentGoodsId) {
        item.count = count;
      }
    });
    const temp = orderList.filter((item) => item.count > 0);
    setOrderList([...temp]);
  };

  return (
    <div className="home">
      <div className="header">
        Table: <span>{sessionStorage.getItem("table")}</span>
      </div>
      <Category updateOrderList={handleOrderList} />
      <OrderBottom orderList={orderList} />
    </div>
  );
};

export default Home;
