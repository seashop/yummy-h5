import React, { useState } from "react";
import { Tabs, TabPane } from "@nutui/nutui-react";
import { View, Text } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import "./index.module.scss";
export default function index() {
  const [tabvalue, setTabvalue] = useState(0);
  const tabList = [{ title: "堂食" }, { title: "自提" }];
  return (
    <View className="takeway-container">
      <AtTabs
        animated={false}
        current={tabvalue}
        tabList={tabList}
        onClick={(paneKey) => {
          setTabvalue(paneKey);
        }}
      >
        <AtTabsPane current={tabvalue}>
          <View className="canteen">
            <Text className="text">请确认你已在店内</Text>
          </View>
        </AtTabsPane>
        <AtTabsPane current={tabvalue}>123123123123</AtTabsPane>
      </AtTabs>
    </View>
  );
}
