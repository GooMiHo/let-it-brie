/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import AddressForm from './AddressForm'
import {editUser, me} from '../../store'
import StripeForm from './StripeForm'

class EditUserForm extends React.Component {
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
            phoneNumber: '',
            showForm: false
        }
    }

    async componentDidMount () {
      await this.props.getUser(this.props.user.id)
      this.setState({
        email: this.props.user.email,
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        address: this.props.user.address,
        city: this.props.user.city,
        country: this.props.user.country,
        zipCode: this.props.user.zipCode,
        phoneNumber: this.props.user.phoneNumber,
        showForm: false
      })
    }

    handleChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
    }

    handleSubmit = (e) => {
      e.preventDefault();

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

      this.setState({
        showForm: false
      })
    }

    handleClick = () => {
        this.setState({
          showForm: true
        })
    }

    render () {
        const {user} = this.props
        const isEnabled = this.state.email && this.state.firstName && this.state.lastName && this.state.address && this.state.city && this.state.country && this.state.city && this.state.zipCode && this.state.phoneNumber

        return (
            <div>
                 <button id="no-button-color" type="submit" onClick={() => this.handleClick()}><img id="edit-button" src="https://image.ibb.co/gvwrYV/edit-button.png" /></button>
                    {
                      this.state.showForm
                      ? <div>
                          <AddressForm state={this.state} handleChange={this.handleChange}/>
                          <button type="submit" onClick={this.handleSubmit} disabled={!isEnabled}>Submit</button>
                        </div>
                      : <div>
                          <ul>
                              <h4>Email: {user.email}</h4>
                              <h4>Name: {user.firstName} {user.lastName}</h4>
                              <h4>Address: {user.address} {user.city} {user.country} {user.zipCode}</h4>
                              <h4>Phone Number: {user.phoneNumber}</h4>
                          </ul>
                        </div>
                    }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
  updateUser: (user, id) => dispatch(editUser(user, id)),
  getUser: (userId) => dispatch(me(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm)
