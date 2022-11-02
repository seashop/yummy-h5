import React, { useState, useEffect } from "react";
import { Tabs, Input, Button, Toast } from "antd-mobile";
import moment from "moment";
import styles from "./login.scss";
import { useNavigate } from "react-router";
import { getUrlParams, checkEmail, checkPhone } from "../../utils";
import Path from "../../path";
import request from "../../request";
import { expireTime } from "../../config/config";

const Login = () => {
  const nav = useNavigate();
  useEffect(() => {
    loadTable();
    if (localStorage.getItem("expire") !== null) {
      const expire = localStorage.getItem("expire");
      if (moment().diff(moment(Number(expire)), "seconds") < expireTime) {
        const urlParams = getUrlParams();
        Object.keys(urlParams).forEach((key) => {
          sessionStorage.setItem(key, urlParams[key]);
        });
        nav("/home");
      }
    }
  }, []);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [tabKey, setTabKey] = useState("Email");
  const handlePhoneChange = (val) => {
    setPhone(val);
  };
  const handleEmailChange = (val) => {
    setEmail(val);
  };
  const handleTabsChange = (val) => {
    setTabKey(val);
  };
  const loadTable = async () => {
    const urlParams = getUrlParams();
    const table = urlParams.table;
    const url = `${Path.APIBaseUrl}${Path.v0.getTableIdByNo}?title=${table}`;
    try {
      const result = await request.get(url);
      if (result.code === 0) {
        if (result.result.items.length > 0) {
          const tableId = result.result.items[0].id;
          sessionStorage.setItem("tableId", tableId);
        } else {
          Toast.show({
            content: "No Table",
            icon: "fail",
          });
        }
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
  const handleLogin = () => {
    if (tabKey === "Phone") {
      if (!phone) {
        return Toast.show({
          duration: 3000,
          content: "Please Input Phone",
          icon: "fail",
        });
      }
      if (!checkPhone(phone)) {
        return Toast.show({
          duration: 3000,
          content: "Please Input The Correct Phone",
          icon: "fail",
        });
      }
      sessionStorage.setItem("username", phone);
    } else {
      if (!email) {
        return Toast.show({
          duration: 3000,
          content: "Please Input Email",
          icon: "fail",
        });
      }
      if (!checkEmail(email)) {
        return Toast.show({
          duration: 3000,
          content: "Please Input The Correct Email",
          icon: "fail",
        });
      }
      sessionStorage.setItem("username", email);
    }
    const urlParams = getUrlParams();
    Object.keys(urlParams).forEach((key) => {
      sessionStorage.setItem(key, urlParams[key]);
    });
    localStorage.setItem("expire", new Date().getTime());
    nav("/home");
  };
  return (
    <div className={styles.login}>
      <div className={styles.title}>Welcome to yummy</div>
      <Tabs className={styles.tabs} onChange={handleTabsChange}>
        <Tabs.Tab title="Email" key="Email">
          <Input
            placeholder="Please Input Email"
            type="email"
            className={styles.loginInput}
            onChange={handleEmailChange}
          />
        </Tabs.Tab>
        <Tabs.Tab title="Phone" key="Phone">
          <Input
            placeholder="Please Input Phone"
            type="tel"
            max="13"
            className={`${styles.loginInput} ${styles.phoneInput}`}
            onChange={handlePhoneChange}
          />
          <div className={styles.phonePre}>+65</div>
        </Tabs.Tab>
      </Tabs>
      <Button
        block
        color="primary"
        size="large"
        className={styles.loginBtn}
        onClick={handleLogin}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
