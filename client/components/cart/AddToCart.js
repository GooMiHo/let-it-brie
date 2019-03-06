import React, {Component} from 'react'
import {ToastContainer, ToastStore} from 'react-toasts';

class AddToCart extends Component {
    handleClick = () => {
      this.props.addToCart(this.props.selectedProduct, this.props.quantity);
      ToastStore.success("The product was successfully added!")
    }
    render(){
        return (
          <div>
            <button className="add-to-cart-btn" type='button' onClick={this.handleClick}>
            Add To Cart
            </button>
            <ToastContainer lightBackground position={ToastContainer.POSITION.TOP_RIGHT} store={ToastStore}/>
          </div>
        )
    }
}

export default AddToCart;
