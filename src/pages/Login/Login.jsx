import React, { useState, useEffect } from "react";
import { Tabs, Input, Button, Toast } from "antd-mobile";
import styles from "./login.scss";
import { useNavigate } from "react-router";
import { getUrlParams, checkEmail, checkPhone } from "../../utils";

const Login = () => {
  const nav = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("username")) {
      return nav("/home");
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
