// 请求连接前缀
export const baseUrl = 'https://dev-ygo.fly.dev/';


const APIPATH = {
  'getCategoryList': 'v1:customer/inns/01860607-dc41-7ab5-9164-376602087b48/cats',
  'getProductList': 'v1:customer/inns/01860607-dc41-7ab5-9164-376602087b48/products',
  'getImgUrl': baseUrl + 'v1:common/images/{id}/url'
}

export default APIPATH
