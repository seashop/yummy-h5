import React, { useState } from "react";
import { Stepper, Image, ImageViewer } from "antd-mobile";
import "./categoryItem.scss";

const CategoryItem = (props) => {
  const { data, updateOrderList } = props;
  const [visible, setVisible] = useState(false);
  const handleClick = (value) => {
    updateOrderList(data, value);
  };
  return (
    <div className="categoryItem">
      <Image
        className="img"
        src={data.img.full_url}
        onClick={() => setVisible(true)}
      />
      <div className="detail">
        <div className="title">{data.title}</div>
        {/* <div className="tags">{data.description}</div> */}
        <div className="price">
          <div className="discountPrice">{data.price}</div>
          <div className="normalPrice"></div>
        </div>
        <Stepper
          className="handleBtn"
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
