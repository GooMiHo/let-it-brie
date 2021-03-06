import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import css from '../../../public/css/cart-page.css'
// import {ToastContainer, ToastStore} from 'react-toasts';

class CartPage extends Component {
  constructor() {
    super()
    this.state = {
      cart: [],
      quantity: 1,
      cartItems: {},
      productNames: []
    }
  }

  componentDidMount() {
    this.getLocalStorage()

    localStorage.getItem('cart') &&
      this.setState({
        cart: JSON.parse(localStorage.getItem('cart'))
      })

    let cartItems = JSON.parse(localStorage.getItem('cart'))
      ? JSON.parse(localStorage.getItem('cart'))
      : []
    cartItems = this.itemWithAmount(cartItems)
    let cartItemNames = Object.keys(cartItems)
    cartItemNames.map(async (productName) => {
      let stock = await this.checkStock(cartItems[productName].id);
      cartItems[productName].stock = stock + 1;
    });

    this.setState({ productNames: cartItemNames, cartItems })
  }

  getLocalStorage = () => {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key)
        try {
          value = JSON.parse(value)
          this.setState([{ [key]: value }])
        } catch (e) {
          this.setState([{ [key]: value }])
        }
      }
    }
  }

  increaseQuantity = (product, quantity) => {
    let cart = [...this.state.cart]

    for (let i = 0; i < cart.length; i++) {
      if (quantity === 0) break;
      if(cart[i].id === product.id) {
        quantity--;
        cart.splice(i, 0, product);
      }
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    var cartValue = localStorage.getItem('cart')
    var cartObj = JSON.parse(cartValue)
    this.setState({ cart: [...cart], cartObj })
  }

  decreaseQuantity = (product, quantity) => {
    let cart = [...this.state.cart]
    for (let i = 0; i < cart.length; i++) {
      if (quantity === 0) break;
      if(cart[i].id === product.id) {
        quantity--;
        cart.splice(i, 1);
      }
    }
    // for (let i = quantity; i > 0; i--) {
    //   cart.pop()
    // }

    localStorage.setItem('cart', JSON.stringify(cart))
    var cartValue = localStorage.getItem('cart')
    var cartObj = JSON.parse(cartValue)
    this.setState({ cart: [...cart], cartObj })
  }

  removeFromCart = (product) => {
    let cartArr = JSON.parse(localStorage.getItem('cart'))
    let newCartArr = cartArr.filter(item => (
      item.id !== product.id
    ))
    this.setState({ cart: [...newCartArr] })
    localStorage.setItem('cart', JSON.stringify(newCartArr))
  }

  async checkStock(id) {
    const { data } = await axios.get(`/api/products/${id}`)
    return data.stock;
  }

  itemWithAmount(items) {
    const uniqueWithCount = {}
    items.forEach(item => {
      if (!uniqueWithCount[item.name]) {
        uniqueWithCount[item.name] = item
        uniqueWithCount[item.name].count = 1
      } else {
        uniqueWithCount[item.name].count++
      }
    })
    return uniqueWithCount
  }

  render() {

    let cartItems = JSON.parse(localStorage.getItem('cart'))
      ? JSON.parse(localStorage.getItem('cart'))
      : []
    cartItems = this.itemWithAmount(cartItems)
    let cartItemNames = Object.keys(cartItems)

    return (

      <div className="shopping-cart-div">
        {/* <ToastContainer lightBackground position={ToastContainer.POSITION.TOP_RIGHT} store={ToastStore}/> */}
        <h2 className="shopping-cart-title">Shopping Cart</h2>
        <hr className="cart-title-underline" />
        {cartItemNames.length ?
          <div>
            <ul>
              {cartItemNames.map(productName => (
                <div key={cartItems[productName].id}>
                  <li>
                    <div className="cart-item-divider">
                      <p>Item</p>
                      <div className="cart-item-pricing">
                        <p>Price</p>
                        <p>Qty</p>
                        <p>Total</p>
                      </div>
                    </div>
                    <div className="cart-item-div">
                      <div className="pic-name-div">
                        <img className="cart-item-img" src={cartItems[productName].imageURL} />
                        <div className="name-rmv-div">
                          <Link to={`/products/${cartItems[productName].id}`}>
                            <h3 className="cart-item-name">{`${cartItems[productName].name}`}</h3>
                          </Link>
                          <button
                            className="rmv-button"
                            type="button"
                            onClick={() => this.removeFromCart(cartItems[productName])}
                          >Remove</button>
                        </div>
                      </div>
                      <div className="cart-product-info">
                        <p className="cart-prod-name">{`$${cartItems[productName].price}`}</p>
                        <div className="qty-change">
                          <button
                            className="minus-btn"
                            value={productName}
                            type="button"
                            onClick={(e) => this.decreaseQuantity(cartItems[e.target.value], this.state.quantity)}
                            disabled={cartItems.stock <= 0}
                          >-</button>
                          {cartItems[productName].count}
                          <button
                            className="plus-btn"
                            type="button"
                            onClick={async () => {
                              let stock = await this.checkStock(cartItems[productName].id)
                              if (stock >= cartItems[productName].count + 1) {
                                this.increaseQuantity(cartItems[productName], this.state.quantity)
                              } else {
                                alert(`Sorry, there ${stock === 1 ? 'is' : 'are'} only ${stock} left in stock.`)
                                // return () => ToastStore.error(`Sorry, there are ${stock === 1 ? 'is' : 'are'} only ${stock} left in stock.`)
                              }
                            }}
                            disabled={cartItems.stock <= 0}
                          >+</button>
                        </div>
                        <p className="product-total">{`$${cartItems[productName].price * cartItems[productName].count}`}</p>
                      </div>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
            <div className="order-total-div">
              <h2 className="order-sum-title">Order<br/>Summery</h2>
              <div className="order-total-info">
                <div className="order-sections-div">
                  <p>Merchandise Subtotal:</p>
                  <p>{`$${getSubTotal(cartItems)}`}</p>
                </div>
                <hr className="order-line"/>
                <div className="order-sections-div">
                  <p>Taxes:</p>
                  <p>{`$${getTax(cartItems)}`}</p>
                </div>
                <div className="order-sections-div">
                  <p>Shipping & Handling:</p>
                  <p>{getShipping(cartItems)}</p>
                </div>
                <hr className="order-line"/>
                <div className="order-sections-div">
                  <p><b>Order Total:</b></p>
                  <p><b>{`$${getTotal(cartItems)}`}</b></p>
                </div>
              </div>
            </div>
            <div className="checkout-btm">
              <Link to="/products">
                <p className="contin-shop" type="button">{'< Continue Shopping'}</p>
              </Link>
              <Link to="/checkout">
                <button className="checkout-btn" type="button">Checkout</button>
              </Link>
            </div>
          </div>
          :
          <div>
            <p>Your cart is currently empty</p>
            <Link to="/products">Cheese Please!!</Link>
          </div>}
      </div>
    )
  }
}

export default CartPage;

function getSubTotal(cartItems) {
  let cartItemNames = Object.keys(cartItems);
  let total = 0;
  cartItemNames.forEach(product => {
    total += cartItems[product].price * cartItems[product].count
  });
  return total.toFixed(2);
}

function getTax(cartItems) {
  let cartItemNames = Object.keys(cartItems);
  let total = 0;
  cartItemNames.forEach(product => {
    total += cartItems[product].price * cartItems[product].count
  });
  total = Number(total * 0.06);
  return total.toFixed(2);
}

function getShipping(cartItems) {
  const shippingCost = Number( getSubTotal(cartItems) ) >= 50 ? 'FREE' : '$20.00';
  return shippingCost;
}

function getTotal(cartItems) {
  const subtotal = Number(getSubTotal(cartItems));
  let total = subtotal + Number(getTax(cartItems));
  if (subtotal >= 50) total += 50;
  return total.toFixed(2);
}
