import React from 'react'

class ContactUs extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      fullName: '',
      question: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      email: '',
      fullName: '',
      question: '',
    })
  }

  render() {
    const isEnabled = this.state.email && this.state.fullName && this.state.question

    return (
      <div className="contact">
        <form>
          <h1>Contact us with any questions!</h1>
          <div className="checkout-page">
            <div className="user-input-wrp">
              <input
                type="email"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
                required />
              <span className="floating-label">Email</span>
            </div>
            <div className="user-input-wrp">
              <input
                type="text"
                name="fullName"
                onChange={this.handleChange}
                value={this.state.fullName}
                required />
              <span className="floating-label">Name</span>
            </div>
            <div className="user-input-wrp question-form">
              <input
                type="text"
                name="question"
                onChange={this.handleChange}
                value={this.state.question}
                required />
              <span className="floating-label">How May We Help You?</span>
            </div>
          </div>
          <button className="submit-qst-btn" type="submit" onClick={this.handleSubmit} disabled={!isEnabled}>Submit</button>
        </form>
      </div>
    )
  }
}

export default ContactUs;

