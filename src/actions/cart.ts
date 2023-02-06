import {
  CART_LIST_CHANGE,
} from '../constants/cart'

export const cartListChange = (good) => {
  return {
    type: CART_LIST_CHANGE,
    data: good
  }
}
