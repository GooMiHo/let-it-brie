import React from 'react'


class ContactUs extends React.Component {
    constructor () {
        super()
        this.state = {
            email: '',
            fullName: '',
            question: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
  
      handleChange (e) {
          this.setState({
              [e.target.name]: e.target.value
          })
      }

      handleSubmit (e) {
        e.preventDefault();
        this.setState({
            email: '',
            fullName: '',
            question: '',
        })
    }

render(){
  return (
    <div>
        <form>
            <h1>Contact us with any questions!</h1>
           
            <label htmlFor='email'>Email: </label>
            <input
                type='text'
                name='email'
                onChange={this.handleChange}
                value={this.state.email}
                placeholder='E-mail'
            />
            
            <label htmlFor='firstName'>Full Name: </label>
            <input
                type='text'
                name='fullName'
                onChange={this.handleChange}
                value={this.state.fullName}
                placeholder='Full Name'
            />

            <label htmlFor='lastName'>Question:</label>
            <input
                type='text'
                name='questions'
                onChange={this.handleChange}
                value={this.state.question}
                placeholder='How May We Help You?'
            />
         <button type="submit" onClick={this.handleSubmit} disabled={!isEnabled}>Submit</button>
        </form>
    </div>
)
}
}
export default ContactUs;

