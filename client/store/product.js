import axios from 'axios'

// ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_ONE_PRODUCT = 'GET_ONE_PRODUCT';
const FILTER_PRODUCT = 'FILTER_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const GET_WHAT_TO_SEARCH = 'GET_WHAT_TO_SEARCH';

// INITIAL STATE
const productsState = {
    products: [],
    filteredBy: 'all',
    searchVal: '',
    selectedProduct: {name: '', price: '', description: '', imageURL: ''}
}

// ACTION CREATORS
const getProducts = (products) => ({
    type: GET_PRODUCTS,
    products
})

const getWhatToSearch = (searchVal) => ({
  type: GET_WHAT_TO_SEARCH,
  searchVal
})

const getOneProduct = (product) => ({
    type: GET_ONE_PRODUCT,
    product
})

export const changeFilter = (filteredBy) => ({
    type: FILTER_PRODUCT,
    filteredBy
})

const addProduct = (product) => ({
  type: ADD_PRODUCT,
  product
})
const updateProduct = (id, product) => ({
  type: UPDATE_PRODUCT,
  id,
  product
})

const removeProduct = (id) => ({
  type: REMOVE_PRODUCT,
  id
})

//THUNKAROOOS
export const fetchProducts = () => {
    return async (dispatch) => {
        const {data} = await axios.get('/api/products')
        dispatch(getProducts(data))
    }
}

// export const filterProduct = (category) => {
//     return async (dispatch) => {
//         const {data} = await axios.get(`/api/products/${category}`)
//         dispatch(filterProducts(data))
//     }
// }

export const fetchWhatToSearch = (whatToSearch) => {
  return (dispatch) => {
    dispatch(getWhatToSearch(whatToSearch))
  }
}

export const fetchAProduct = (id) => {
    return async (dispatch) => {
        const {data} = await axios.get(`/api/products/${id}`)
        dispatch(getOneProduct(data))
    }
}

export const addAProduct = (newProductData) => {
  return async (dispatch) => {
    const {data: newProduct} = await axios.post('/api/products/admin', newProductData)
    dispatch(addProduct(newProduct))
  }
}

export const updatedAProduct = (id, updates) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/products/admin/${id}`, updates);
    dispatch(updateProduct(id, response.data))
  }
}
export const updateQuantity = (id, updates) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/products/checkout/${id}`, updates);
    dispatch(updateProduct(id, response.data))
  }
}

export const removeAProduct = (id) => {
  return async (dispatch) =>{
    await axios.delete(`/api/products/admin/${id}`)
    dispatch(removeProduct(id))
  }
}

// REDUCERS
const productsReducer = (state = productsState, action) => {
  let updatedState = {};
    switch (action.type){

        case ADD_PRODUCT:
          updatedState = {...state};
          updatedState.products.push(action.product);
          return updatedState;

        case UPDATE_PRODUCT:
          updatedState = {...state};
          updatedState.products =  updatedState.products.filter(product => product.id !== action.id);
          updatedState.products.push(action.product);
          return updatedState;

        case REMOVE_PRODUCT:
          updatedState = {...state};
          updatedState.products = updatedState.products.filter(product => product.id !== action.id);
          return updatedState;

        case GET_PRODUCTS:
          return {...state, products: action.products}

        case GET_ONE_PRODUCT:
          return{...state, selectedProduct: action.product}

        case FILTER_PRODUCT:
          return {...state, filteredBy: action.filteredBy}

        case GET_WHAT_TO_SEARCH:
          return {...state, searchVal: action.searchVal}

        default:
          return state
    }
}

export default productsReducer
