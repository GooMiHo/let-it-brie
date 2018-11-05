import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import CartButton from './CartButton'

const Navbar = ({ handleClick, isLoggedIn, user }) =>
{console.log(user)
  return (

  <div id="banner">
    <div id="navbar">
      <div className="nav-links">
        {user.userType === 'admin' ? <Link to="/admin/products/">Products</Link> : <Link to="/products/">Shop</Link>}
        <br />
        <Link to="/our-story">Our Story</Link>
        <br />
        <Link to="/help">Contact Us!</Link>
      </div>
      <div className="cart-link">
        <CartButton />
      </div>
    </div>
    <nav className='login-nav'>
      {isLoggedIn ? (
        <div>
          <Link to="/home">Home</Link>
          <Link to="/account">Account</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
          <div>
            {/* The navbar will show these links before you log in */}

            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}

    </nav>
  </div>
)
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}


