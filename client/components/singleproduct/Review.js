import React from 'react';
import { ToastContainer, ToastStore } from 'react-toasts';
import { me } from '../../store';
import { connect } from 'react-redux';

import {starRating, byUserName, toggleStars} from '../helperFuncs';

class Review extends React.Component {

  componentDidMount() {
    this.props.me();
  }

  handleClick(value, id) {
    toggleStars(id);
    this.props.handleStarSelect(Number(value));
  }

  render() {

    const isEnabled = this.props.state.rating && this.props.state.title && this.props.state.text
    return (
      <div className="review-pad">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <ToastContainer lightBackground position={ToastContainer.POSITION.TOP_RIGHT} store={ToastStore} />
        <h3 className="review-pad"> Reviews: </h3>
        <hr />
        {this.props.state.showForm ? null : <button type="button" onClick={this.props.showForm}> Add Review </button>}
        {this.props.state.showForm ? <div>
          <form onSubmit={this.props.handleSubmit}>
            <label htmlFor='rating'> Rating:  </label>
            <div>
              <span className="fa fa-star"
                id='star-1'
                onClick={() => this.handleClick(1, 'star-1')}
              />
              <span className="fa fa-star"
                id='star-2'
                onClick={() => this.handleClick(2, 'star-2')}
              />
              <span className="fa fa-star"
                id='star-3'
                onClick={() => this.handleClick(3, 'star-3')}
              />
              <span className="fa fa-star"
                id='star-4'
                onClick={() => this.handleClick(4, 'star-4')}
              />
              <span className="fa fa-star"
                id='star-5'
                onClick={() => this.handleClick(5, 'star-5')}
              />
            </div>
            <label htmlFor='title'> Review Title:  </label>
            <input type='text' name='title' onChange={this.props.handleChange} value={this.props.state.title} />
            <label htmlFor='text'> Review:  </label>
            <input type='text' name='text' onChange={this.props.handleChange} value={this.props.state.text} />

            <button type="submit" disabled={!isEnabled} onClick={() => ToastStore.success("Your review has been successfully added!")}> Submit Review</button>
          </form>
        </div> : null}
        {this.props.reviews.map(review => {
          const ratingSrc = starRating(review.rating);
          let reviewDate = review.id ? review.createdAt.slice(0, 10).split('-') : null;
          let formattedDate = review ? `${reviewDate[1]}/${reviewDate[2]}/${reviewDate[0]}` : null
          return (
            <div key={review.id}>
              <h3>{review.title}</h3>
              <h1>  {ratingSrc} </h1>
              {byUserName(review.user, this.props.user)}
              <p> on {formattedDate} </p>
              <p> {review.text}</p>
            </div>
          )
        })}
      </div>
    )
  }
}
const mapState = (state) => {
  return ({ user: state.user })
}
const mapDispatch = (dispatch) => ({
  me: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(Review);

