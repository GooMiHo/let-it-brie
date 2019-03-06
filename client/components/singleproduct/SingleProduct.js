import React from 'react';
import { connect } from 'react-redux';
import { addProductToCart, removeProductToCart } from '../../store/order';
import { fetchAProduct, fetchReviews, postReview } from '../../store';

import Review from './Review';
import AddToCart from '../cart/AddToCart';
import CartPage from '../cart/CartPage';
import { reviewInfo } from '../helperFuncs';

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      text: '',
      title: '',
      rating: '',
      productId: '',
      userId: '',
      quantity: 1,
      cart: [],
      showForm: false
    }
  }

  async componentDidMount() {
    this.setState({ showForm: false })
    const productId = this.props.match.params.productId
    await this.props.getAProduct(productId)
    await this.props.getReviews(productId)
    this.setState({ userId: this.props.userId, productId: productId })
    this.getLocalStorage()
    localStorage.getItem('cart') &&
      this.setState({
        cart: JSON.parse(localStorage.getItem('cart'))
      })
  }

  handleSubmit = (e) => {
    e.preventDefault(e)
    const currentState = this.state.showForm;
    this.setState({ showForm: !currentState })
    const review = {
      text: this.state.text,
      title: this.state.title,
      rating: Number(this.state.rating),
      userId: this.state.userId,
      productId: this.state.productId
    }

    this.props.addReview(review)
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSelect = (event) => {
    this.setState({ quantity: event.target.value })
  }

  handleStarSelect = (rating) => {
    this.setState({ rating })
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

  addToCart = (product, quantity) => {
    let cart = [...this.state.cart]
    for (let i = 1; i <= quantity; i++) {
      cart.push(product)
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    var cartValue = localStorage.getItem('cart')
    var cartObj = JSON.parse(cartValue)
    this.setState({ cart: [...cart], cartObj })
  }

  showForm = () => {
    const currentState = this.state.showForm;
    this.setState({ showForm: !currentState });
  }

  render() {
    const { selectedProduct } = this.props
    if (!selectedProduct.id) {
      return 'Loading the product...'
    }
    return (
      selectedProduct.id && (
        <div>
          <div className="single-product">
            <div className="name-desc">
              <img src={selectedProduct.imageURL} />
              <div className="text-indiv-prod">
                <h1>{selectedProduct.name}</h1>
                {reviewInfo(this.props.reviews)}
                <hr />
                <br />
                <br />
                <h2>Description</h2>
                <p>{selectedProduct.description}</p>
                <div>
                  <h2>${selectedProduct.price}</h2>
                  <label>Qty:</label>
                  <select value={this.state.quantity} onChange={this.handleSelect}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
                <AddToCart
                  selectedProduct={selectedProduct}
                  cart={this.state.cart}
                  addToCart={this.addToCart}
                  quantity={this.state.quantity}
                />
              </div>
            </div>


            <div>
              <Review
                state={this.state}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleStarSelect={this.handleStarSelect}
                reviews={this.props.reviews}
                productId={selectedProduct.id}
                showForm={this.showForm}
              />
            </div>
          </div>

        </div>
      )
    )
  }
}

const mapStateToProps = state => ({
  selectedProduct: state.productsReducer.selectedProduct,
  reviews: state.review.reviews,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  getAProduct: id => dispatch(fetchAProduct(id)),
  getReviews: productId => dispatch(fetchReviews(productId)),
  addReview: review => dispatch(postReview(review))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
