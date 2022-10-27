import React from "react";
import { SideBar, Badge } from "antd-mobile";
import OrderBottom from "./components/OrderBottom/OrderBottom";
import "./home.scss";

const tabs = [
  {
    key: "key1",
    title: "选项一",
    badge: Badge.dot,
  },
  {
    key: "key2",
    title: "选项二",
    badge: "5",
  },
  {
    key: "key3",
    title: "选项三",
    badge: "99+",
    disabled: true,
  },
];

const Home = () => {
  return (
    <div className="home">
      <SideBar>
        {tabs.map((item) => (
          <SideBar.Item key={item.key} title={item.title} badge={item.badge} />
        ))}
      </SideBar>
      <OrderBottom />
    </div>
  );
};

export default Home;
