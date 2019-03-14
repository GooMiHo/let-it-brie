import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Login, Signup, UserHome, NavBar } from './components'
import { me } from './store'
import ProductsList from './components/products-list/products-list'
import SingleProduct from './components/singleproduct/SingleProduct'
import CreateProduct from './components/CreateProduct'
import EditProduct from './components/EditProduct'
import ProductsListAdmin from './components/products-list/ProductListAdmin'
import CartPage from './components/cart/CartPage';
import CheckoutForm from './components/cart/CheckoutForm'
import OurStory from './components/OurStory'
import Account from './components/Account'
import PaymentCheckout from './components/cart/PaymentCheckout'
import Confirmation from './components/Confirmation';
import ContactUs from './components/Help';
// import Help from './components/Help'
import OrderHistory from '../client/components/OrderHistory'
import AdminOrderHistory from '../client/components/AdminOrderHistory'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <div>
        <Route path="/" component={NavBar} />
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route exact path="/admin/orders" component={AdminOrderHistory} />
          <Route exact path='/admin/products/add' component={CreateProduct} />
          <Route path='/admin/products/:productId' component={EditProduct} />
          <Route exact path='/products/:productId' component={SingleProduct} />
          <Route path="/products" render={routeProps => <ProductsList {...routeProps} admin={false} />} />
          <Route path="/admin/products" render={routeProps => <ProductsListAdmin {...routeProps} user={this.props.user} />} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path='/cart/checkout/payment' component={PaymentCheckout} />
          <Route exact path="/confirmation" component={Confirmation} />
          <Route exact path="/cart/checkout" render={routeProps => <CheckoutForm {...routeProps} user={this.props.user} />} />
          <Route path="/our-story" component={OurStory} />
          <Route path="/help" component={ContactUs} />
          <Route exact path="/cart" component={CartPage} />
          <Route path="/home" component={UserHome} />

          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/account/order-history" component={OrderHistory} />
              <Route path="/account" component={Account} />
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
          <Route path="/" component={UserHome} />
          {/* <Route component={Login} /> */}
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
