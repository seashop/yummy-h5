import React, { useState, useEffect } from "react";
import { Tabs } from "antd-mobile";
import moment from "moment";
import { LeftOutline, RightOutline } from "antd-mobile-icons";
import Chart from "./Chart";
import Path from "../../../path";
import request from "../../../request";
import styles from "./analysis.scss";

const dateLengthArr = [3, 7, 30];

const Analysis = () => {
  const [tabKey, setTabKey] = useState("income");
  const [dateLength, setDateLength] = useState(3);
  const [currentDate, setCurrentDate] = useState(moment());
  const [details, setDetails] = useState(null);

  const handleDateChange = (step) => {
    const temp = currentDate.add(Number(step), "days");
    setCurrentDate(moment(temp));
  };

  const handleTabChange = (val) => {
    setTabKey(val);
  };

  const handleDateLengthChange = (val) => {
    setDateLength(val);
  };

  const loadData = async () => {
    // const url = `${Path.APIOtherUrl}${Path.others.analysis}?sid=sweetea&query_days=3`;
    const url = `https://airdb.fly.dev/apis/daily_report?sid=sweetea&query_days=${dateLength}`;
    try {
      const result = await request.get(url);
      console.log("result--->", result);
      setDetails(result);
    } catch (error) {
      Toast.show({
        content: JSON.stringify(error),
        icon: "fail",
      });
    }
  };

  useEffect(() => {
    loadData();
  }, [currentDate.format("YYYY-MM-DD"), tabKey, dateLength]);

  let lastMoney = 0;
  let lastOrder = 0;
  if (details && details.money_details.length > 0) {
    lastMoney = details.money_details[details.money_details.length - 1].money;
  }
  if (details && details.order_details.length > 0) {
    lastOrder = details.order_details[details.order_details.length - 1].order;
  }
  return (
    <div className={styles.analysis}>
      <div className={styles.title}>营收分析</div>
      <div className={styles.price}>
        昨日营收: S$ {Number(lastMoney).toFixed(2)}
      </div>
      <div className={styles.orderNum}>
        昨日订单: <span>{Number(lastOrder)}</span>
      </div>
      <div className={styles.datePart}>
        <LeftOutline
          onClick={() => handleDateChange(-1)}
          className={`${styles.datePartIcon} ${styles.datePartLeft}`}
        />
        <div className={styles.datePartCenter}>
          {currentDate.format("YYYY-MM-DD")}
        </div>
        <RightOutline
          onClick={() => handleDateChange(1)}
          className={`${styles.datePartIcon} ${styles.datePartRight}`}
        />
      </div>
      <Tabs onChange={handleTabChange}>
        <Tabs.Tab title="收入趋势" key="income">
          <Chart chartData={details && details.money_details} />
        </Tabs.Tab>
        <Tabs.Tab title="订单趋势" key="order">
          <Chart chartData={details && details.order_details} />
        </Tabs.Tab>
      </Tabs>
      <div className={styles.dateLengthPart}>
        {dateLengthArr.map((item) => {
          return (
            <div
              onClick={() => handleDateLengthChange(item)}
              key={`key-${item}`}
              className={`${styles.dateLengthItem} ${
                dateLength === item ? styles.active : ""
              }`}
            >
              {item === 0 ? "全部" : item + "日"}
            </div>
          );
        })}
      </div>
      <div className={styles.totalPart}>
        <div className={`${styles.totalLeft} ${styles.totalItem}`}>
          <div>近{dateLength}日收入累计</div>
          <div className={styles.totalPrice}>
            S$ {details && Number(details.total_money).toFixed(2)}
          </div>
        </div>
        <div className={`${styles.totalRight} ${styles.totalItem}`}>
          <div>近{dateLength}日订单累计</div>
          <div className={styles.totalPrice}>
            S$ {details && details.total_order}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
