import React from 'react'
import AddressForm from './AddressForm'
import {me, createUser, editUser} from '../../store/user';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import StripeForm from './StripeForm'

class CheckoutForm extends React.Component {
    constructor () {
        super()
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            country: '',
            zipCode: '',
            phoneNumber: ''
        }
    }

    async componentDidMount () {
      await this.props.getUser(this.props.user.id)
      // if (!this.state.zipCode) this.state.zipCode = ""
      this.setState({
        email: this.props.user.email,
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        address: this.props.user.address,
        city: this.props.user.city,
        country: this.props.user.country,
        zipCode: this.props.user.zipCode,
        phoneNumber: this.props.user.phoneNumber
      })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.props.user.id) {
          this.props.addUser({
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            city: this.state.city,
            country: this.state.country,
            zipCode: Number(this.state.zipCode),
            phoneNumber: this.state.phoneNumber,
            userType: 'guest'
          })
        }

        else {
          this.props.updateUser({
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            city: this.state.city,
            country: this.state.country,
            zipCode: Number(this.state.zipCode),
            phoneNumber: this.state.phoneNumber
          }, this.props.user.id)
        }

        this.setState({
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            country: '',
            zipCode: '',
            phoneNumber: ''
        })

        this.props.history.push('/cart/checkout/payment')
    }

    render () {
      const isEnabled = this.state.email && this.state.firstName && this.state.lastName && this.state.address && this.state.city && this.state.country && this.state.city && this.state.zipCode && this.state.phoneNumber

      return (

        <div>
          <Link to='/signup'>Create An Account</Link>
          <h3>Already have an account?</h3>
          <Link to='/login'>Login</Link>
          <AddressForm state={this.state} handleChange={this.handleChange} />

          <button type="submit" onClick={this.handleSubmit} disabled={!isEnabled}>Submit</button>
        </div>
      )
    }
  }

const mapDispatchToProps = dispatch => ({
  getUser: (userId) => dispatch(me(userId)),
  addUser: (user) => dispatch(createUser(user)),
  updateUser: (user, id) => dispatch(editUser(user, id))
})

export default connect(null, mapDispatchToProps)(CheckoutForm)
