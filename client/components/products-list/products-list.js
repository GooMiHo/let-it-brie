import React, { Component } from 'react';
import Product from './product';
import FilterBar from './filter-bar';
import SearchBar from './search-bar';
import { connect } from 'react-redux';
import { fetchProducts, removeAProduct, changeFilter, fetchWhatToSearch } from '../../store/product';
import { addProduct } from '../../store/order';
import { me } from '../../store/user';

class ProductsListComp extends Component {
  constructor() {
    super()
    this.state = {
      products: [],
      searchVal: '',
      filteredBy: 'all'
    }
  }

  async componentDidMount() {
    await this.props.fetchProducts();
    await this.props.me();
    this.setState({
      products: this.props.products,
      filteredBy: this.props.filteredBy,
      searchVal: this.props.searchVal
    })
  }

  componentDidUpdate(prevProp) {
    if (prevProp.filteredBy !== this.props.filteredBy ||
        prevProp.searchVal !== this.props.searchVal) {
      this.setState({
        filteredBy: this.props.filteredBy,
        searchVal: this.props.searchVal
      });
    }
  }

  productSearchMatch(searchVal, product) {
    const searchLowerCase = searchVal.toLowerCase();
    const productArr = product.description.toLowerCase().split(' ').concat(product.name.toLowerCase().split(" ")).concat(product.category.split(" "));
    if (productArr.includes(searchLowerCase)) return true;
    for (let i = 0; i < productArr.length; i++) {
      if (productArr[i].toLowerCase().indexOf(searchLowerCase) > -1) {
        return true;
      }
    }
    return false;
  }

  searchOnChange = (searchVal) => {
    this.setState({ searchVal })
    // this.searchTitle(searchVal);
  }

  render() {
    return (
      <div >
        <div className="filter-search-outer">
          <div className="filter-search">
            {/* <FilterBar handleChange={this.handleChange} products={this.state.products} /> */}
            {/* <SearchBar searchOnChange={this.searchOnChange} /> */}
          </div>
        </div>
        <div id="outer-products-div">
          <h2 className="filter-title">{this.state.filteredBy === 'all' ?
            'All Products' : `All ${this.state.filteredBy}s`}</h2>
          <div className="products">
            {this.state.searchVal.length ? this.props.products
              .filter(product => this.productSearchMatch(this.state.searchVal, product))
              .map(product => {
                return (
                  <Product
                    user={this.props.user}
                    key={product.id}
                    history={this.props.history}
                    product={product} admin={this.props.admin}
                    removeProduct={this.props.removeProduct}
                    addProductToCart={this.props.addProduct}
                    userId={this.props.currentUser}
                  />
                )
              })
              : (this.state.filteredBy === 'all' ? this.props.products
                : this.props.products
                  .filter(product => product.category === this.state.filteredBy))
                .map(product => {
                  return (
                    <Product
                      user={this.props.user}
                      key={product.id}
                      history={this.props.history} product={product}
                      admin={this.props.admin}
                      removeProduct={this.props.removeProduct}
                      addProductToCart={this.props.addProduct}
                      userId={this.props.currentUser}
                    />
                  )
                }
                )}
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    products: state.productsReducer.products,
    filteredBy: state.productsReducer.filteredBy,
    searchVal: state.productsReducer.searchVal,
    currentUser: state.user.id,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => ({
  me: () => dispatch(me()),
  fetchProducts: () => dispatch(fetchProducts()),
  removeProduct: (id) => dispatch(removeAProduct(id)),
  addProduct: (product, userId) => dispatch(addProduct(product, userId)),
  // changeFilter: (whatToFilter) => dispatch(changeFilter(whatToFilter)),
});

const ProductsList = connect(mapStateToProps, mapDispatchToProps)(ProductsListComp)

export default ProductsList
