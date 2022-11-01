import React, { useEffect } from "react";
import { ResultPage } from "antd-mobile";
import { useParams } from "react-router";
import OrderDetail from "./OrderDetail";

const Result = () => {
  const params = useParams();
  // console.log("params--->", params);
  const sn = params.sn;
  if (String(sn) !== "0") {
    return <OrderDetail />;
  }
  return <ResultPage status="error" title="Order Failed" description="" />;
};

export default Result;
