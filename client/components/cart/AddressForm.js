import React from 'react'

const AddressForm = (props) => {
  return (
    <div className="guest-checkout-form">
        <form>
            <h3>Contact Information</h3>
            <label htmlFor='email'>Email: </label>
            <input
                type='text'
                name='email'
                onChange={props.handleChange}
                value={props.state.email}
                placeholder='E-mail'
            />

            <h3>Shipping Information</h3>
            <label htmlFor='firstName'>First Name: </label>
            <input
                type='text'
                name='firstName'
                onChange={props.handleChange}
                value={props.state.firstName}
                placeholder='First Name'
            />

            <label htmlFor='lastName'>Last Name: </label>
            <input
                type='text'
                name='lastName'
                onChange={props.handleChange}
                value={props.state.lastName}
                placeholder='Last Name'
            />

            <label htmlFor='address'>Address: </label>
            <input
                type='text'
                name='address'
                onChange={props.handleChange}
                value={props.state.address}
                placeholder='Address'
            />

            <label htmlFor='firstName'>City: </label>
            <input
                type='text'
                name='city'
                onChange={props.handleChange}
                value={props.state.city}
                placeholder='City'
            />

            <label htmlFor='country'>Country: </label>
            <input
                type='text'
                name='country'
                onChange={props.handleChange}
                value={props.state.country}
                placeholder='Country'
            />

            <label htmlFor='zipCode'>Zip Code: </label>
            <input
                type='text'
                name='zipCode'
                onChange={props.handleChange}
                value={props.state.zipCode}
                placeholder='Zip Code'
            />

            <label htmlFor='phoneNumber'>Phone Number: </label>
            <input
                type='text'
                name='phoneNumber'
                onChange={props.handleChange}
                value={props.state.phoneNumber}
                placeholder='Phone Number'
            />

        </form>
    </div>
)
}
export default AddressForm;

// firstname, lastname, address, city, country, zip code, phone number
