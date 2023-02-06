import { CART_LIST_CHANGE } from '../constants/cart'



const INITIAL_STATE: any = {
  cartList: [],  // 购物车信息
  allAmount: 0 // 总价
}

export default function cart (state = INITIAL_STATE, action) {
  switch (action.type) {
    // 算价
    case CART_LIST_CHANGE:
      let { good, value } = action.data
      let existItem = state.cartList.find((item) => item.id === good.id)
      if (existItem) {
        if (+value === 0) {
          state.cartList = state.cartList.filter((item) => item.id !== good.id)
        } else {
          existItem.count = value
        }
      } else {
        state.cartList = [...state.cartList, {...good, count: value}]
      }
      return {
        ...state,
        allAmount: state.cartList.reduce((prev, next) => {
          return prev + next.amount * +next.count
        }, 0)
      }
     default:
       return state
  }
}
