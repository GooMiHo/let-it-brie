import React from 'react'
import Order from './Order'
import {connect} from 'react-redux'
import {fetchOrders, updateStatus } from '../store'

class AdminOrderHistory extends React.Component {

  componentDidMount() {
    this.props.getOrders();
  }
  handleChange = (val, id) => {
    this.props.sendStatus(val, id);
  }
  render() {
    return (
      this.props.user.userType === 'admin'
      ? <div className="history-div">
         <div className="history-div-inner">
          <h2 className="status-title margin-left">ORDERS</h2>
         {
          this.props.orders.map(order => {
            return (
              <div className="each-order" key={order.id}>
                <p className="status margin-left">Order Status:</p>
                <select className="status margin-left" onChange={(e) => this.handleChange(e.target.value, order.id)}>
                  <option disabled selected value={null}>{order.status}</option>
                  <option value="processing">processing</option>
                  <option value="created">created</option>
                  <option value="completed">completed</option>
                  <option value="cancelled">cancelled</option>
                </select>
                <Order order={order}/>
              </div>
            )
          })
        }
        </div>
      </div> : 'Admin access only. Users not permitted.'
    )
  }
}

const mapStateToProps = state => ({
  orders: state.ordersReducer.orders,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getOrders: () => dispatch(fetchOrders()),
  sendStatus: (val,id) => dispatch(updateStatus(val, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrderHistory);
