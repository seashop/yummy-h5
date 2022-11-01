import React, { useEffect, useState } from "react";
import { Collapse, Button, Toast, SpinLoading } from "antd-mobile";
import styles from "./result.scss";
import styles1 from "../Home/components/CategoryItem/categoryItem.scss";
import CategoryItem from "../Home/components/CategoryItem/CategoryItem";
import { useParams } from "react-router";
import moment from "moment";
import Path from "../../path";
import request from "../../request";

const OrderDetail = (props) => {
  const params = useParams();
  const sn = params.sn;
  const [orderList, setOrderList] = useState([]);
  const [orderDetail, setOrderDetail] = useState({});

  const loadData = async () => {
    const url = `${Path.APIBaseUrl}${Path.v0.getOrderDetail}`;
    const data = {
      order_num: sn,
    };
    try {
      const result = await request.post(url, data);
      // console.log("result--->", result);
      if (result.code === 0) {
        setOrderDetail(result.result);
      } else {
        Toast.show({
          content: result.message,
          icon: "fail",
        });
      }
    } catch (error) {
      Toast.show({
        content: "network error",
        icon: "fail",
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  if (Object.keys(orderDetail).length === 0) {
    return (
      <SpinLoading
        style={{
          "--size": "48px",
          width: "100%",
          margin: "0 auto",
          marginTop: "30vh",
        }}
      />
    );
  }
  return (
    <div className={styles.orderDetail}>
      <h2>已下单</h2>
      <div className={styles.desc1}>本单消费金额</div>
      <div className={styles.price}>
        $ {orderDetail.goods_money}
        <span>$ {orderDetail.goods_money}</span>
      </div>
      <div className={styles.desc2}>
        <div>Table: {orderDetail.diningTable.title}</div>
        <div>Order Time: {moment().format("YYYY-MM-DD hh:mm:ss")}</div>
      </div>
      <Collapse defaultActiveKey={["1"]} className={styles.list}>
        <Collapse.Panel key="1" title="订单详情">
          <div
            className={styles1.categoryItemGroup}
            style={{ padding: "0 10px", width: "calc(100% - 20px)" }}
          >
            {/* {orderDetail.ordergoods.map((item) => (
              <CategoryItem
                data={item}
                key={`orderList-${item.goods_id}`}
                updateOrderList={() => {}}
              />
            ))} */}
          </div>
        </Collapse.Panel>
      </Collapse>
      <div className={styles.desc3}>
        <div className={styles.desc3Item}>
          <div>小计</div>
          <div>$ {orderDetail.goods_money}</div>
        </div>
        <div className={styles.desc3Item}>
          <div>税费</div>
          <div>$ {orderDetail.svc_fee}</div>
        </div>
        <div className={styles.desc3Item}>
          <div>服务费</div>
          <div>$ {orderDetail.reduction_money}</div>
        </div>
        <div className={styles.desc3Item}>
          <div>总计</div>
          <div>$ {orderDetail.order_money}</div>
        </div>
      </div>
      <div className={styles.handlePart}>
        <div className={styles.leftPart}>
          待支付: $ {orderDetail.order_money}
        </div>
        <div className={styles.rightPart}>
          {/* <Button style={{ marginRight: 10 }}>继续加菜</Button> */}
          {/* <Button color="primary" fill="solid">
            结账
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
