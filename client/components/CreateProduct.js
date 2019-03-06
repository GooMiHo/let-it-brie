import React from 'react'
import Form from './Form'
import { connect } from 'react-redux'
import { addAProduct } from '../store/product'
// import DEFAULT_ENCODING from 'crypto';

class CreateProduct extends React.Component {
  constructor() {
    super()

    this.state  = {
        category: '',
        name: '',
        description: '',
        price: '',
        stock: '',
        imageURL: ''
      }

    this.state = {
      category: '',
      name: '',
      description: '',
      price: '',
      stock: '',
      imageURL: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addProduct(this.state)
    this.setState({
        category: '',
        name: '',
        description: '',
        price: '',
        stock: '',
        imageURL: ''
    })
    this.props.history.push('/products')
  }

  render() {
    return (
      <div>
        <h1>Add a New Product</h1>
        <Form state={this.state} handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addProduct: (product) => dispatch(addAProduct(product))
})

export default connect(null, mapDispatchToProps)(CreateProduct);
