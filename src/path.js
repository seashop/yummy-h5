const Path = {
  APIBaseUrl: "/api/v0",

  v0: {
    category: "/category",
    product: "/product",
    orderPlace: "/order/place",
    orderCalculate: "/order/calculate",
    getOrderDetail: "/order/info",
    getTableList: "/dining/user/table",
    getTableIdByNo: "/dining/user/table",

    createCart: "/dining/user/cart",
    updateCart: "/dining/user/cart/{cartId}/append",
    getCart: "/dining/user/cart/{id}/show",
    getCalculate: "/dining/user/cart/{id}/calculate",
  },
};

export default Path;
