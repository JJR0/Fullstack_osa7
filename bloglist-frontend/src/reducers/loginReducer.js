const initialState = null

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  default:
    return state
  }
}

export const newLogin = user => {
  return {
    type: 'LOGIN',
    data: user
  }
}

export default loginReducer
