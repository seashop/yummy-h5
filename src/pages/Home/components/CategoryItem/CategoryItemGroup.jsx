import { Toast } from "antd-mobile";
import React, { useState, useEffect } from "react";
import CategoryItem from "./CategoryItem";
import "./categoryItem.scss";

const CategoryItemGroup = (props) => {
  const { categoryId, productList, updateOrderList } = props;
  const [list, setList] = useState([]);
  useEffect(() => {
    if (productList.length > 0) {
      const temp = productList.filter(
        (item) => String(item.category_id) === String(categoryId)
      );
      setList(temp);
    }
  }, [JSON.stringify(productList)]);
  return (
    <div className="categoryItemGroup">
      {list.map((item) => (
        <CategoryItem
          data={item}
          key={item.goods_id}
          updateOrderList={updateOrderList}
        />
      ))}
    </div>
  );
};

export default CategoryItemGroup;
