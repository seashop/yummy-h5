import React, { useEffect, useState } from "react";
import { Collapse, Button, Toast, SpinLoading } from "antd-mobile";
import styles from "./result.scss";
import styles1 from "../Home/components/CategoryItem/categoryItem.scss";
import CategoryItem from "../Home/components/CategoryItem/CategoryItem";
import { useParams } from "react-router";
import moment from "moment";
import { useNavigate } from "react-router";
import Path from "../../path";
import request from "../../request";

const OrderDetail = (props) => {
  const params = useParams();
  const nav = useNavigate();
  const sn = params.sn;
  const [calculateDetail, setCalculateDetail] = useState({});
  const [orderDetail, setOrderDetail] = useState({});

  const loadData = async () => {
    const url = `${Path.APIBaseUrl}${Path.v0.getCart}`.replace("{id}", sn);
    try {
      const result = await request.get(url);
      // console.log("result--->", result);
      if (result.code === 0) {
        const goods = result.result.goods;
        const productList = JSON.parse(sessionStorage.getItem("productList"));
        const temp = [];
        goods.forEach((good) => {
          const item = productList.find((a) => a.goods_id === good.goods_id);
          item.count = good.quantity;
          item.disabled = true;
          temp.push(item);
        });
        const obj = result.result;
        obj.goods = temp;
        setOrderDetail(obj);
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

  const loadCalculate = async () => {
    const url = `${Path.APIBaseUrl}${Path.v0.getCalculate}`.replace("{id}", sn);
    try {
      const result = await request.post(url, {});
      if (result.code === 0) {
        setCalculateDetail(result.result);
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

  const handleContinue = () => {
    nav("/home");
  };

  useEffect(() => {
    loadData();
    loadCalculate();
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
        $ {calculateDetail.money}
        {/* <span>$ {orderDetail.goods_money}</span> */}
      </div>
      <div className={styles.desc2}>
        <div>Table: {sessionStorage.getItem("table")}</div>
        <div>
          Order Time:{" "}
          {moment(orderDetail.created_at).format("YYYY-MM-DD hh:mm:ss")}
        </div>
      </div>
      <Collapse defaultActiveKey={["1"]} className={styles.list}>
        <Collapse.Panel key="1" title="订单详情">
          <div
            className={styles1.categoryItemGroup}
            style={{ padding: "0 10px", width: "calc(100% - 20px)" }}
          >
            {orderDetail.goods.map((item) => (
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
          <div>$ {calculateDetail.sub_money}</div>
        </div>
        <div className={styles.desc3Item}>
          <div>税费</div>
          <div>$ {calculateDetail.gts_fee}</div>
        </div>
        <div className={styles.desc3Item}>
          <div>服务费</div>
          <div>$ {calculateDetail.svc_fee}</div>
        </div>
        <div className={styles.desc3Item}>
          <div>总计</div>
          <div>$ {calculateDetail.total_money}</div>
        </div>
      </div>
      <div className={styles.handlePart}>
        <div className={styles.leftPart}>
          待支付: $ {calculateDetail.total_money}
        </div>
        <div className={styles.rightPart}>
          <Button
            style={{ marginRight: 10 }}
            color="primary"
            onClick={handleContinue}
          >
            Continue
          </Button>
          {/* <Button color="primary" fill="solid">
            结账
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
