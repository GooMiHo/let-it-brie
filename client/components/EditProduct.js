import React from 'react'
import Form from './Form'
import {connect} from 'react-redux'
import {fetchAProduct, updatedAProduct, removeAProduct} from '../store'
import SingleProduct from './singleproduct/SingleProduct';

class EditProduct extends React.Component {
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
  }
  async componentDidMount() {
    await this.props.getAProduct(this.props.match.params.productId);
    this.setState(this.props.selectedProduct)
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    this.props.updateProduct(this.state.id, this.state);
    e.preventDefault();
  }
  handleDelete = () => {
    this.props.removeAProduct(this.state.id);
    this.props.history.push('/admin/products');
   // redirect to all producs
  }

  render () {
        // const id = this.state.id;
        return (
            <div className="status margin-left" >
                <img src={this.state.imageURL}/>
                <h3>{this.state.name}</h3> <button onClick={this.handleDelete}>Delete</button>
                <h4>Current stock: {this.state.stock} units</h4>
                <h1>Update Product: </h1>
                <Form state={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
            </div>

        )
  }
}

const mapStateToProps = state => {
  return ({
  selectedProduct: state.productsReducer.selectedProduct
})
}

const mapDispatchToProps = dispatch => ({
  getAProduct: (id) => dispatch(fetchAProduct(id)),
  updateProduct: (id, updates) => dispatch(updatedAProduct(id, updates)),
  removeAProduct: (id) => dispatch(removeAProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
