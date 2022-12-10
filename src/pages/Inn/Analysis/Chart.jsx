import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";
import styles from "./analysis.scss";

const Chart = (props) => {
  const { chartData } = props;
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const initChart = (data) => {
    chartInstanceRef.current = echarts.init(chartRef.current);
    const option = {
      xAxis: {
        type: "category",
        data: data.map((item) => item.date),
      },
      yAxis: {
        type: "value",
      },
      grid: {
        top: 20,
        bottom: 0,
        height: 200,
        left: 40,
        right: 20,
      },
      series: [
        {
          data: data.map((item) =>
            item.money === 0 ? 0 : item.money || item.order
          ),
          type: "line",
          smooth: true,
        },
      ],
    };
    // console.log("option--->", option);
    chartInstanceRef.current && chartInstanceRef.current.resize();
    chartInstanceRef.current && chartInstanceRef.current.clear();
    chartInstanceRef.current && chartInstanceRef.current.setOption(option);
  };

  useEffect(() => {
    if (chartData && chartData.length > 0) {
      initChart(chartData);
    }
  }, [JSON.stringify(chartData)]);

  return <div className={styles.chart} ref={chartRef}></div>;
};

export default Chart;
