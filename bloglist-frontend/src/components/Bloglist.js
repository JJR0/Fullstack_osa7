import React from 'react'
import { Link } from 'react-router-dom'

const Bloglist = ({ blogsInOrder }) => (
  <div className='container bloglist'>
    {blogsInOrder.map(blog => (
      <div className='blog-item' key={blog._id}>
        <Link to={`/blogs/${blog._id}`}>
          <span className='blog-text'>
            {blog.title}
          </span>
        </Link>
        <span className='blog-text'>{blog.author}</span>
      </div>
    ))}
  </div>
)

export default Bloglist
