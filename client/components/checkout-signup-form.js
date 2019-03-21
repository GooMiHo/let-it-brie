import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'

/**
 * COMPONENT
 */
const AuthForm2 = props => {
  const { name, displayName, handleSubmit, error } = props

  return (
    <div className="form-page" id="form-page">
      <div className="form-square" id="form-square">
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <div className="create-acc-info">
              <input className="create-acc-email" name="email" type="email" placeholder="Email" required/>
              <input className="create-acc-password"name="password" type="password" placeholder="Password" required/>
            </div>
            <div className="google-button">
              <a className="google" href="/auth/google">{displayName} with Google</a>
              <button className="black-button" type="submit">{displayName}</button>
            </div>
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

// export const Login = connect(mapLogin, mapDispatch)(AuthForm2)
export const CheckoutSignup = connect(mapSignup, mapDispatch)(AuthForm2)

/**
 * PROP TYPES
 */
AuthForm2.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
