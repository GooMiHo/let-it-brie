import React from 'react'

const AddressForm = (props) => {
  console.log(props)
  return (
    <div className="guest-checkout-form">
      <form onSubmit={props.handleSubmit}>
        <h3>Contact Information</h3>
        <div className="checkout-page">
          <div className="user-input-wrp">
            <input
              type="email"
              name="email"
              onChange={props.handleChange}
              value={props.state.email}
              required />
            <span className="floating-label">Email</span>
          </div>
        </div>
        <br />
        <h3>Shipping Information</h3>
        <div className="checkout-page">
          <div className="user-input-wrp">
            <input
              type="text"
              name="firstName"
              onChange={props.handleChange}
              value={props.state.firstName}
              required />
            <span className="floating-label">First Name</span>
          </div>
          <br />
          <div className="user-input-wrp">
            <input
              type="text"
              name="lastName"
              onChange={props.handleChange}
              value={props.state.lastName}
              required />
            <span className="floating-label">Last Name</span>
          </div>
          <br />
          <div className="user-input-wrp">
            <input
              type="text"
              name="address"
              onChange={props.handleChange}
              value={props.state.address}
              required />
            <span className="floating-label">Address</span>
          </div>
          <br />
          <div className="user-input-wrp">
            <input
              type="text"
              name="city"
              onChange={props.handleChange}
              value={props.state.city}
              required />
            <span className="floating-label">City</span>
          </div>
          <br />
          <div className="user-input-wrp">
            <input
              type="text"
              name="country"
              onChange={props.handleChange}
              value={props.state.country}
              required />
            <span className="floating-label">Country</span>
          </div>
          <br />
          <div className="user-input-wrp">
            <input
              type="text"
              name="zipCode"
              onChange={props.handleChange}
              value={props.state.zipCode}
              required />
            <span className="floating-label">Zip Code</span>
          </div>
          <br />
          <div className="user-input-wrp">
            <input
              type="tel"
              name="phoneNumber"
              onChange={props.handleChange}
              value={props.state.phoneNumber}
              required />
            <span className="floating-label">Phone Number</span>
          </div>
        </div>
        <button type="submit">Checkout as Guest</button>
      </form>
    </div>
  )
}
export default AddressForm;

// firstname, lastname, address, city, country, zip code, phone number
