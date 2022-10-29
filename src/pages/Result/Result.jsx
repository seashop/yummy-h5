import React, { useEffect } from "react";
import { ResultPage } from "antd-mobile";
import { useParams } from "react-router";

const Result = () => {
  const params = useParams();
  console.log("params--->", params);
  const sn = params.sn;
  if (String(sn) !== "0") {
    return (
      <ResultPage
        status="success"
        title={`下单成功，订单尾号是: ${sn.slice(-4)}`}
        description="请凭订单后四位取餐"
      />
    );
  }
  return (
    <ResultPage
      status="error"
      title="下单失败"
      description="请检查网络或重新尝试"
    />
  );
};

export default Result;
