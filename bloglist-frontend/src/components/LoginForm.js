import React from 'react'
import { connect } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { newLogin } from '../reducers/loginReducer'

const LoginForm = (props) => {
  const login = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: event.target.username.value,
        password: event.target.password.value
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      props.notify('Tervetuloa takaisin!')
      props.newLogin(user)
    } catch (exception) {
      props.notify('Käyttäjätunnus tai salasana virheellinen', 'error')
    }
  }

  return (
    <div className='container h-100'>
      <div className='row h-100 justify-content-center align-items-center'>
        <form onSubmit={login} autoComplete='off'>
          <h4>Kirjautuminen</h4>
          <div className='form-group'>
            <label htmlFor='usernameInput'>Käyttäjätunnus</label>
            <input type='text' className='form-control' id='usernameInput' name='username'/>
          </div>
          <div className='form-group'>
            <label htmlFor='passwordInput'>Salasana</label>
            <input type='password' className='form-control' id='passwordInput' name='password' />
          </div>
          <button type='submit' className='btn btn-primary'>Kirjaudu</button>
        </form>
      </div>
    </div>
  )
}

export default connect(
  null,
  { newLogin }
)(LoginForm)