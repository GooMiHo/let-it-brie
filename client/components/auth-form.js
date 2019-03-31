import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'

import css from '../../public/css/auth-form.css'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props

  return (
    <div className="form-page">
      <div className="form-square">
        <form className="auth-form" onSubmit={handleSubmit} name={name}>
          <div className="email-password-div">
            <div className="auth-input-wrp">
              <input className="auth-acc-input"
                type="email"
                name="email"
                required />
              <span className="floating-label">Email</span>
            </div>
            <div className="auth-input-wrp">
              <input className="auth-acc-input"
                type="password"
                name="password"
                required />
              <span className="floating-label">Password</span>
            </div>
            {/* <div>
                <label htmlFor="email">
                </label>
                <input name="email" type="text" required placeholder="Email" />
              </div>
              <div>
                <label htmlFor="password">
                </label>
                <input name="password" type="password" placeholder="Password" />
              </div> */}
          </div>
          <div className="google-button">
            <a className="google" href="/auth/google">{displayName} with Google</a>
            <button className="black-button" type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>

      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
