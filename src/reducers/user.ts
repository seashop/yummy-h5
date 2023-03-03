import { USER_TOKEN_CHANGE } from '../constants/user'

const INITIAL_STATE = {
  userToken: ''
}

export default function user(state = INITIAL_STATE, action) {
  switch(action.type) {
    case USER_TOKEN_CHANGE:
      return {
        ...state,
        userToken: action.data.token
      }
      default:
        return state
  }
}
