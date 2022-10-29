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
        title={`Order Success, Order Num: 
        ${sn.slice(-4)}`}
        description=""
      />
    );
  }
  return <ResultPage status="error" title="Order Failed" description="" />;
};

export default Result;
