import React from 'react'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { blogCreation } from '../reducers/blogReducer'

const BlogForm = (props) => {
  const addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    const result = await blogService.create(blog)
    props.blogCreation(result)
    props.notify(`blogi '${result.title}' tekijältä ${result.author} lisätty`)
  }

  return (
    <div className='container'>
      <h4>Luo uusi blogi</h4>

      <form onSubmit={addBlog} autoComplete='off'>
        <div className='form-group'>
          <label htmlFor='titleInput'>Otsikko</label>
          <input name='title' className='form-control' id='titleInput' />
        </div>
        <div className='form-group'>
          <label htmlFor='authorInput'>Tekijä</label>
          <input name='author' className='form-control' id='authorInput' />
        </div>
        <div className='form-group'>
          <label htmlFor='urlInput'>URL</label>
          <input name='url' className='form-control' id='urlInput' />
        </div>
        <button type='submit' className='btn btn-primary'>Luo</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { blogCreation }
)(BlogForm)
