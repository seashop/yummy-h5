import React, { useState, useEffect } from "react";
import { Tabs, Input, Button, Toast } from "antd-mobile";
import "./login.scss";
import { useNavigate } from "react-router";
import { getUrlParams } from "../../utils";

const Login = () => {
  const nav = useNavigate();
  useEffect(() => {
    console.log("params--->", getUrlParams());
    if (sessionStorage.getItem("username")) {
      return nav("/home");
    }
  }, []);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [tabKey, setTabKey] = useState("Phone");
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
      sessionStorage.setItem("username", phone);
    } else {
      if (!email) {
        return Toast.show({
          duration: 3000,
          content: "Please Input Email",
          icon: "fail",
        });
      }
      sessionStorage.setItem("username", email);
    }
    nav("/home");
  };
  return (
    <div className="login">
      <div className="title">Welcome to yummy</div>
      <Tabs className="tabs" onChange={handleTabsChange}>
        <Tabs.Tab title="Phone" key="Phone">
          <Input
            placeholder="Please Input Phone"
            type="tel"
            max="13"
            className="loginInput"
            onChange={handlePhoneChange}
          />
        </Tabs.Tab>
        <Tabs.Tab title="Email" key="Email">
          <Input
            placeholder="Please Input Email"
            type="email"
            className="loginInput"
            onChange={handleEmailChange}
          />
        </Tabs.Tab>
      </Tabs>
      <Button
        block
        color="primary"
        size="large"
        className="loginBtn"
        onClick={handleLogin}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
