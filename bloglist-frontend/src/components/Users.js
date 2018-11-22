import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import userService from '../services/users'
import { userCreation, usersDeleted } from '../reducers/userReducer'

class Users extends React.Component {
  componentDidMount() {
    this.props.usersDeleted()
    userService.getAll().then(users => {
      users.forEach(user => {
        this.props.userCreation(user)
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <div>
        <h2>Käyttäjät</h2>
        <div className='users-row'>
          <div>Nimi</div>
          <div>Lisätyt blogit</div>
        </div>
        {this.props.users.map(user => (
          <div className='users-row' key={user._id}>
            <div>
              <Link to={`/users/${user._id}`}>{user.name}</Link>
            </div>
            <div>{user.blogs.length}</div>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}

export default connect(
  mapStateToProps,
  { usersDeleted, userCreation }
)(Users)