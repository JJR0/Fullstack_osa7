import React from 'react'
import blogService from '../services/blogs'
import { connect } from 'react-redux'
import { blogCommented } from '../reducers/blogReducer'

const Blog = (props) => {
  const { blog, like, remove, notify } = props

  const addComment = async (event) => {
    event.preventDefault()
    try {
      const comment = event.target.comment.value
      event.target.comment.value = ''

      const newBlog = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
        comments: blog.comments.concat(comment),
        user: blog.user
      }
      await blogService.update(blog._id, newBlog)
      props.blogCommented(blog._id, comment)

      notify(`Kommentti "${comment}" lisätty`)
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className='container blog'>
      <div>
        {blog.title} {blog.author}
      </div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} tykkäystä <button className='btn btn-success' onClick={like(blog._id)}>Tykkää</button>
      </div>
      <div>
        Lisännyt {blog.user ? blog.user.name : 'nimetön'}
      </div>
      <div>
        <div><button className='btn btn-danger' onClick={remove(blog._id)}>Poista</button></div>
      </div>
      <p/>
      <div>
        <h4>Kommentit</h4>
        <div>
          {blog.comments.map((comment, index) => (
            <div key={index}>{comment}</div>
          ))}
        </div>
        <p/>
        <form  onSubmit={addComment} autoComplete='off'>
          <div>
            <label htmlFor='commentInput'>Kommentoi</label>
            <input name='comment' className='form-control' id='commentInput' />
          </div>
          <button type='submit' className='btn btn-primary'>Lisää kommentti</button>
        </form>
      </div>
    </div>
  )
}

export default connect(
  null,
  { blogCommented }
)(Blog)
