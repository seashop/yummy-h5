import { Popup, Grid } from "antd-mobile";
import React, { useState, useEffect } from "react";
import Category from "./components/Category/Category";
import OrderBottom from "./components/OrderBottom/OrderBottom";
import Path from "../../path";
import request from "../../request";
import styles from "./home.scss";

const Home = () => {
  const [orderList, setOrderList] = useState([]);
  const [addedGoods, setAddedGoods] = useState([]);
  const [visible, setVisible] = useState(false);
  const [productList, setProductList] = useState([]);
  const handleOrderList = (product, count) => {
    if (product === null && count === 0) {
      return setOrderList([]);
    }
    // console.log("handleOrderList--->", product, count);
    const currentGoodsId = product.goods_id;
    product.count = count;
    if (
      orderList.filter((item) => item.goods_id === currentGoodsId).length === 0
    ) {
      orderList.push(product);
    }
    orderList.forEach((item) => {
      if (item.goods_id === currentGoodsId) {
        item.count = count;
      }
    });
    const temp = orderList.filter((item) => item.count > 0);
    setOrderList([...temp]);
  };

  const handleClick = (index) => {
    sessionStorage.setItem("dinners", index + 1);
    setVisible(false);
  };

  const loadProductList = async () => {
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

  const loadCart = async () => {
    const cartId = sessionStorage.getItem("cartId");
    if (!cartId) return false;
    const url = `${Path.APIBaseUrl}${Path.v0.getCart}`.replace("{id}", cartId);
    try {
      const result = await request.get(url);
      if (result.code === 0) {
        const goods = result.result.goods;
        const temp = [];
        goods.forEach((item) => {
          const good = productList.find(
            (child) => String(child.goods_id) === String(item.goods_id)
          );
          if (good) {
            good.count = item.quantity;
            temp.push(good);
          }
        });
        setOrderList(temp);
        setAddedGoods(goods);
      }
    } catch (error) {
      console.log("error--->", error);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("dinners")) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    loadProductList();
  }, []);

  useEffect(() => {
    if (productList.length > 0) {
      loadCart();
    }
  }, [JSON.stringify(productList)]);

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        Table: <span>{sessionStorage.getItem("table")}</span>
      </div>
      {productList.length > 0 && (
        <Category
          updateOrderList={handleOrderList}
          addedGoods={addedGoods}
          productList={productList}
        />
      )}
      <OrderBottom orderList={orderList} />
      <Popup visible={visible} bodyStyle={{ height: "40vh" }}>
        <div className={styles.popupTitle}>Please Select Number of Dinners</div>
        <Grid columns={4} gap={20} style={{ padding: 20 }}>
          {Array(15)
            .fill("")
            .map((item, index) => {
              return (
                <Grid.Item
                  key={"dinnerNumItem-" + index}
                  onClick={() => handleClick(index)}
                >
                  <div className={styles.dinnerNumItem}>{index + 1}</div>
                </Grid.Item>
              );
            })}
        </Grid>
      </Popup>
    </div>
  );
};

export default Home;
