import React from 'react';
import { ToastContainer, ToastStore } from 'react-toasts';
import { me } from '../../store';
import { connect } from 'react-redux';

import { starRating, byUserName, toggleStars } from '../helperFuncs';
import css from '../../../public/css/ratings.css'

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
      <div >
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <ToastContainer lightBackground position={ToastContainer.POSITION.TOP_RIGHT} store={ToastStore} />
        <hr className="review-line-abv" />
        <a id="review-sec"><h3 className="review-title"> Reviews </h3></a>
        {
          this.props.state.showForm ? null :
            <button type="button" className="write-review-btn" onClick={this.props.showForm}>
              Write A Review
          </button>
        }
        {this.props.state.showForm ?
          <div className="rating-box">
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

              <button className="review-btn" type="submit" disabled={!isEnabled} onClick={() => ToastStore.success("Your review has been successfully added!")}>Submit</button>
            </form>
          </div> : null}
        {this.props.reviews.map(review => {
          let reviewDate = review.id ? review.createdAt.slice(0, 10).split('-') : null;
          let formattedDate = review ? `${reviewDate[1]}/${reviewDate[2]}/${reviewDate[0]}` : null
          return (
            <div className="each-review-div" key={review.id}>
              <hr className="review-divider" />
              <div className="review-top">
                {byUserName(review.user, this.props.user)}
                <p className="review-date">{formattedDate}</p>
              </div>
              {starRating(review.rating)}
              <h2 className="each-review-title">{review.title}</h2>
              <p className="review-txt">{review.text}</p>
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

