const initialState = {
  message: '',
  type: ''
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NOTIFICATION':
    return action.data
  default:
    return state
  }
}

export const notificationShow = (data) => {
  return {
    type: 'NOTIFICATION',
    data
  }
}

export default notificationReducer
