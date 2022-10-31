import { Image } from "antd-mobile";
import React from "react";
import EmptyImg from "@img/empty.png";
import styles from "./orderBottom.scss";
import styles1 from "../CategoryItem/categoryItem.scss";
import CategoryItem from "../CategoryItem/CategoryItem";

const OrderList = (props) => {
  const { orderList, updateOrderList } = props;
  const handleEmpty = () => {
    updateOrderList(null, 0);
  };
  console.log("orderList--->", orderList);
  return (
    <div className={styles.orderList}>
      <div className={styles.top}>
        <div>Cart</div>
        <div className={styles.emptyBtn} onClick={handleEmpty}>
          <img src={EmptyImg} className={styles.icon} /> Empty Cart
        </div>
      </div>
      <div
        className={styles1.categoryItemGroup}
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
