import React, { useEffect, useRef, useState } from "react";
import { Empty, SideBar, SpinLoading, Toast } from "antd-mobile";
import styles from "./category.scss";
import { useThrottleFn } from "ahooks";
import NoData from "@img/nodata.png";
import Path from "../../../../path";
import request from "../../../../request";
import CategoryItemGroup from "../CategoryItem/CategoryItemGroup";

const Category = (props) => {
  const { updateOrderList } = props;
  const [activeKey, setActiveKey] = useState(0);
  const [list, setList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { run } = useThrottleFn(
    () => {
      let currentKey = activeKey;
      for (const item of list) {
        const element = document.getElementById(`anchor-${item.category_id}`);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= 80) {
          currentKey = item.category_id;
        } else {
          break;
        }
      }
      setActiveKey(currentKey);
    },
    {
      leading: true,
      trailing: true,
      wait: 100,
    }
  );

  const mainElementRef = useRef(null);

  useEffect(() => {
    loadData();
    loadProductList();
  }, []);

  useEffect(() => {
    const mainElement = mainElementRef.current;
    if (list.length > 0) {
      if (!mainElement) return;
      mainElement.addEventListener("scroll", run);
    }
    return () => {
      mainElement && mainElement.removeEventListener("scroll", run);
    };
  }, [list.length > 0]);

  const loadData = async () => {
    setLoading(true);
    const url = `${Path.APIBaseUrl}${Path.v0.category}`;
    try {
      const result = await request.get(url);
      if (result.code === 0) {
        setList(result.result.items);
        if (result.result.items.length > 0) {
          setActiveKey(result.result.items[0].category_id);
        }
      } else {
        Toast.show({
          content: result.message,
          icon: "fail",
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(JSON.stringify(error));
      Toast.show({
        content: "network error",
        icon: "fail",
      });
      setLoading(false);
    }
  };

  const loadProductList = async () => {
    setLoading(true);
    const url = `${Path.APIBaseUrl}${Path.v0.product}`;
    try {
      const result = await request.get(url);
      if (result.code === 0) {
        setProductList(result.result.items);
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  const handleChange = (key) => {
    setActiveKey(key);
    document.getElementById(`anchor-${key}`).scrollIntoView();
  };

  return (
    <div className={styles.container}>
      {loading && (
        <SpinLoading
          style={{ width: "100%", margin: "0 auto", marginTop: "30vh" }}
        />
      )}
      {!loading && list.length === 0 && (
        <div className={styles.empty}>
          <img src={NoData} style={{ width: 100 }} />
          <div className={styles.emptyText}>No Data</div>
        </div>
      )}
      {!loading && list.length > 0 && (
        <>
          <div className={styles.side}>
            <SideBar activeKey={String(activeKey)} onChange={handleChange}>
              {list.map((item) => (
                <SideBar.Item key={item.category_id} title={item.title} />
              ))}
            </SideBar>
          </div>
          <div className={styles.main} ref={mainElementRef}>
            {list.map((item) => (
              <div key={item.category_id}>
                <h2 id={`anchor-${item.category_id}`}>{item.title}</h2>
                <CategoryItemGroup
                  productList={productList}
                  categoryId={item.category_id}
                  updateOrderList={updateOrderList}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Category;
