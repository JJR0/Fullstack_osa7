import React from 'react'

const User = ({ user }) => (
  <div>
    <h3>{user.name}</h3>
    <h4>Lisätyt blogit</h4>
    <div>
      {user.blogs.map(blog => (
        <div key={blog.url}>{blog.title} tekijältä {blog.author}</div>
      ))}
    </div>
  </div>
)

export default User
