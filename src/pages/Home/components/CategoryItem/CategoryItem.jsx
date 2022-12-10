import React, { useState } from "react";
import { Stepper, Image, ImageViewer } from "antd-mobile";
import styles from "./categoryItem.scss";

const CategoryItem = (props) => {
  const { data, updateOrderList, addedGoods } = props;
  // if (addedGoods && addedGoods.length > 0) {
  //   const temp = addedGoods.find(
  //     (item) => String(item.goods_id) === String(data.goods_id)
  //   );
  //   if (temp) {
  //     data.count = temp.quantity;
  //   }
  // }
  const [visible, setVisible] = useState(false);
  const handleClick = (value) => {
    updateOrderList(data, value);
  };
  return (
    <div className={styles.categoryItem}>
      <Image
        className={styles.img}
        src={data.img.full_url}
        onClick={() => setVisible(true)}
      />
      <div className={styles.detail}>
        <div className={styles.title}>{data.title}</div>
        {/* <div className="tags">{data.description}</div> */}
        <div className={styles.price}>
          <div className={styles.discountPrice}>{data.price}</div>
          <div className={styles.normalPrice}></div>
        </div>
        <Stepper
          value={data.count || 0}
          disabled={data.disabled}
          className={styles.handleBtn}
          defaultValue={data.count || 0}
          onChange={handleClick}
        />
      </div>
      <ImageViewer
        image={data.img.full_url}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default CategoryItem;
