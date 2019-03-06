import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import CartButton from './CartButton';
import { changeFilter, fetchProducts } from '../store/product';
import FilterBar from './products-list/filter-bar';
import css from '../../public/css/dropdown.css'

class Navbar extends Component {


  async componentDidMount() {
    await this.props.fetchProducts();
  }

  handleChange = (whatToFilter) => {
    this.props.changeFilter(whatToFilter);
  }

  render() {
    return (

      <div id="banner">
        <div className="banner-div">
          <div className="logo-and-title-div">
            <Link to="/home"><img className="group-logo" src="https://preview.ibb.co/bUndOL/abcs-logo.png/" alt="ABCS logo" /></ Link>
            <h1 className="main-title">Let it Brie</h1>
          </div>
          <div className="cart-link">
            <CartButton />
          </div>
        </div>

        <div id="nav-text">
          <div id="navbar">
            <div className="nav-links">
              {this.props.user.userType === 'admin' ? (
                <div className="nav-text">
                  <Link to="/admin/products" className="nav-text">Products  | </Link>
                  <Link to="/admin/orders" className="nav-text">  Manage Orders</Link>
                </div>
              ) :
              <div className="dropdown-div">
                {/* <Link to="/products" className="nav-text dropdown-btn" >Shop</Link> */}
                <button type="button" className="nav-text dropdown-btn" onClick={toggleDropdown}>Shop</button>

                <FilterBar handleChange={this.handleChange} products={this.props.products} />
              </div>
              }
              <br />
              <Link to="/our-story" className="nav-text">Our Story</Link>
              <br />
              <Link to="/help" className="nav-text">Contact Us!</Link>
            </div>
          </div>
          <nav className='login-nav'>
            {this.props.isLoggedIn ? (
              <div>
                <Link to="/home" className="nav-text">Home</Link>
                <Link to="/account" className="nav-text">Account</Link>
                <a href="#" onClick={this.props.handleClick} className="nav-text">
                  Logout
                </a>
              </div>
            ) : (
                <div className="login-signup-div">
                  {/* The navbar will show these links before you log in */}

                  <Link to="/login" className="nav-text">Login</Link>
                  <p id="nav-text-line">|</p>
                  <Link to="/signup" className="nav-text">Sign Up</Link>
                </div>
              )}

          </nav>
        </div>
      </div>
    )
  }

}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    products: state.productsReducer.products
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick: () => { dispatch(logout())},
    changeFilter: (whatToFilter) => dispatch(changeFilter(whatToFilter)),
    fetchProducts: () => dispatch(fetchProducts())
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

function toggleDropdown() {
  document.getElementById("dropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropdown-btn')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      if (dropdowns[i].classList.contains('show')) {
        dropdowns[i].classList.remove('show');
      }
    }
  }
}
