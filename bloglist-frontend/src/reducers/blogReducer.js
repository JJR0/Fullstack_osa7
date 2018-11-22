const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'REMOVE':
    const newState = state.filter(blog => blog._id !== action.id)
    return [...newState]
  case 'INIT':
    return [...action.blogs]
  case 'LIKE':
    const toLike = state.find(blog => blog._id === action.id)
    const liked = { ...toLike, likes: toLike.likes + 1 }
    return state.map(blog => blog._id === action.id ? liked : blog)
  case 'COMMENT':
    const toComment = state.find(blog => blog._id === action.id)
    const commented = { ...toComment, comments: toComment.comments.concat(action.comment) }
    return state.map(blog => blog._id === action.id ? commented : blog)
  default:
    return state
  }
}

export const blogCreation = data => {
  return {
    type: 'NEW_BLOG',
    data: {
      title: data.title,
      author: data.author,
      url: data.url,
      likes: 0,
      comment: data.comments
    }
  }
}

export const blogRemove = id => {
  return {
    type: 'REMOVE',
    id
  }
}

export const blogsInitialization = blogs => {
  return {
    type: 'INIT',
    blogs
  }
}

export const blogLiked = id => {
  return {
    type: 'LIKE',
    id
  }
}

export const blogCommented = (id, comment) => {
  return {
    type: 'COMMENT',
    id,
    comment
  }
}

export default blogReducer