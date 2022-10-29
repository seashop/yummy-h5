import { Image } from "antd-mobile";
import React from "react";
import EmptyImg from "@img/empty.png";
import "./orderBottom.scss";
import "../CategoryItem/categoryItem.scss";
import CategoryItem from "../CategoryItem/CategoryItem";

const OrderList = (props) => {
  const { orderList, updateOrderList } = props;
  const handleEmpty = () => {
    updateOrderList(null, 0);
  };
  console.log("orderList--->", orderList);
  return (
    <div className="orderList">
      <div className="top">
        <div>已选商品</div>
        <div className="emptyBtn" onClick={handleEmpty}>
          <img src={EmptyImg} className="icon" /> 清空购物车
        </div>
      </div>
      <div
        className="categoryItemGroup"
        style={{ padding: "0 10px", width: "calc(100% - 20px)" }}
      >
        {orderList.map((item) => (
          <CategoryItem
            data={item}
            key={`orderList-${item.goods_id}`}
            updateOrderList={updateOrderList}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
