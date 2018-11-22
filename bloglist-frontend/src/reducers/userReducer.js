const userReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_USER':
    return [...state, action.data]
  case 'DELETE':
    return []
  default:
    return state
  }
}

export const userCreation = data => {
  return {
    type: 'NEW_USER',
    data
  }
}

export const usersDeleted = () => {
  return {
    type: 'DELETE'
  }
}

export default userReducer
