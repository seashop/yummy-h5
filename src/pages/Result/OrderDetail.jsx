import React, { useState } from "react";
import { Collapse, Button } from "antd-mobile";
import styles from "./result.scss";
import styles1 from "../Home/components/CategoryItem/categoryItem.scss";
import CategoryItem from "../Home/components/CategoryItem/CategoryItem";

const OrderDetail = (props) => {
  const [orderList, setOrderList] = useState([]);
  return (
    <div className={styles.orderDetail}>
      <h2>已下单</h2>
      <div className={styles.desc1}>本单消费金额</div>
      <div className={styles.price}>
        $20.00
        <span>$36.00</span>
      </div>
      <div className={styles.desc2}>
        <div>Table: </div>
        <div>Order Time: 12:15</div>
      </div>
      <Collapse defaultActiveKey={["1"]} className={styles.list}>
        <Collapse.Panel key="1" title="订单详情">
          <div
            className={styles1.categoryItemGroup}
            style={{ padding: "0 10px", width: "calc(100% - 20px)" }}
          >
            {orderList.map((item) => (
              <CategoryItem
                data={item}
                key={`orderList-${item.goods_id}`}
                updateOrderList={() => {}}
              />
            ))}
          </div>
        </Collapse.Panel>
      </Collapse>
      <div className={styles.desc3}>
        <div className={styles.desc3Item}>
          <div>小计</div>
          <div>$30.00</div>
        </div>
        <div className={styles.desc3Item}>
          <div>小计</div>
          <div>$30.00</div>
        </div>
        <div className={styles.desc3Item}>
          <div>小计</div>
          <div>$30.00</div>
        </div>
        <div className={styles.desc3Item}>
          <div>小计</div>
          <div>$30.00</div>
        </div>
      </div>
      <div className={styles.handlePart}>
        <div className={styles.leftPart}>待支付: $35.10</div>
        <div className={styles.rightPart}>
          <Button style={{ marginRight: 10 }}>继续加菜</Button>
          <Button color="primary" fill="solid">
            结账
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
