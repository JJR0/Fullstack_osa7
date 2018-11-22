import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Blog from './components/Blog'
import Bloglist from './components/Bloglist'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import userService from './services/users'
import { blogRemove, blogsInitialization, blogLiked } from './reducers/blogReducer'
import { notificationShow } from './reducers/notificationReducer'
import { newLogin } from './reducers/loginReducer'
import { userCreation } from './reducers/userReducer'

class App extends React.Component {
  componentDidMount() {
    blogService.getAll().then(blogs => {
      this.props.blogsInitialization(blogs)
    }).catch((error) => {
      console.log(error)
    })

    userService.getAll().then(users => {
      users.forEach(user => {
        this.props.userCreation(user)
      })
    }).catch((error) => {
      console.log(error)
    })

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.props.newLogin(user)
      blogService.setToken(user.token)
    }
  }

  notify = (message, type = 'info') => {
    const data = { message, type }
    this.props.notificationShow(data)
    setTimeout(() => {
      this.props.notificationShow(null)
    }, 10000)
  }

  like = id => async () => {
    const liked = this.props.blogs.find(blog => blog._id === id)
    const updated = { ...liked, likes: liked.likes + 1 }
    this.props.blogLiked(id)
    await blogService.update(id, updated)
    this.notify(`Tykkäsit '${updated.title}' tekijältä ${updated.author}`)
  }

  remove = id => async () => {
    const deleted = this.props.blogs.find(blog => blog._id === id)
    const ok = window.confirm(`Haluatko poistaa '${deleted.title}' tekijältä ${deleted.author}?`)
    if (ok === false) return

    this.props.blogRemove(id)
    await blogService.remove(id)
    this.notify(`Blogi '${deleted.title}' tekijältä ${deleted.author} poistettu`)
  }

  logout = () => {
    window.localStorage.removeItem('loggedUser')
    this.notify('Olet kirjautunut ulos')
    this.props.newLogin(null)
  }

  render() {
    const blogsInOrder = this.props.blogs.sort((b1, b2) => b2.likes - b1.likes)
    const usersById = id => this.props.users.find(user => user._id === id)
    const blogsById  = id => this.props.blogs.find(blog => blog._id === id)

    return (
      <div className='container'>
        <h2>Blog app</h2>

        {this.props.user === null ?
          <div>
            <Notification notification={this.props.notification} />
            <LoginForm notify={this.notify} />
          </div>
          :
          <div>
            <Notification notification={this.props.notification} />

            <Router>
              <div>
                <div className='container menu'>
                  <div className='row justify-content-start'>
                    <div className='col-2'><Link to='/'>Blogit</Link></div>
                    <div className='col-2'><Link to='/users'>Käyttäjät</Link></div>
                    <div className='col-2'>{this.props.user.name} kirjautunut</div>
                    <div className='col-2'><button className='btn btn-light' onClick={this.logout}>Kirjaudu ulos</button></div>
                  </div>
                </div>
                <div>
                  <Route
                    exact path='/'
                    render={() => (
                      <div>
                        <h4>Blogit</h4>
                        <Bloglist
                          blogsInOrder={blogsInOrder}
                          like={this.like}
                          remove={this.remove}
                          user={this.props.user}
                        />
                        <p/>
                        <Togglable buttonLabel='Uusi blogi'>
                          <BlogForm notify={this.notify} />
                        </Togglable>  
                      </div>
                    )}
                  />
                  <Route exact path='/users' render={() => <Users />} />
                  <Route exact path='/users/:id' render={({ match, history }) => (
                    <div>
                      { usersById(match.params.id) === undefined
                        ? history.push('/')
                        : <User user={usersById(match.params.id)} />
                      }
                    </div>
                  )}
                  />
                  <Route exact path='/blogs/:id' render={({ match, history }) => (
                    <div>
                      {blogsById(match.params.id) === undefined
                        ? history.push('/')
                        :
                        <Blog
                          history={history}
                          blog={blogsById(match.params.id)}
                          like={this.like}
                          remove={this.remove}
                          notify={this.notify}
                        />
                      }
                    </div>
                  )}
                  />
                </div>
              </div>
            </Router>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
    users: state.users,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  blogRemove,
  blogsInitialization,
  blogLiked,
  notificationShow,
  newLogin,
  userCreation
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
