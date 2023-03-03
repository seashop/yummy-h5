// 请求连接前缀
export const baseUrl = 'https://dev-ygo.fly.dev/';


const APIPATH = {
  'getCategoryList': 'v1:customer/inns/01860607-dc41-7ab5-9164-376602087b48/cats',
  'getProductList': 'v1:customer/inns/01860607-dc41-7ab5-9164-376602087b48/products',
  'getImgUrl': baseUrl + 'v1:common/images/{id}/url',
  'createOrder': 'v1:customer/inns/01860607-dc41-7ab5-9164-376602087b48/orders:place',
  'getPassport': 'v1:customer/inns/01860607-dc41-7ab5-9164-376602087b48/passport',
  'getOrderDetail': 'v1:customer/inns/01860607-dc41-7ab5-9164-376602087b48/orders/{id}',
  'getMerchantInfo': 'v1:customer/inns/01860607-dc41-7ab5-9164-376602087b48'
}

export default APIPATH
