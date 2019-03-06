import React from 'react';
import css from '../../../public/css/reviews.css';

export function starRating(rating) {

  switch (rating) {
    case 1:
      return (
        <div>
          <span className="fa fa-star star-clicked" />
          <span className="fa fa-star" />
          <span className="fa fa-star" />
          <span className="fa fa-star" />
          <span className="fa fa-star" />
        </div>
      )
    case 2:
      return (
        <div>
          <span className="fa fa-star star-clicked" />
          <span className="fa fa-star star-clicked" />
          <span className="fa fa-star" />
          <span className="fa fa-star" />
          <span className="fa fa-star" />
        </div>
      )
    case 3:
      return (
        <div>
          <span className="fa fa-star star-clicked" />
          <span className="fa fa-star star-clicked" />
          <span className="fa fa-star star-clicked" />
          <span className="fa fa-star" />
          <span className="fa fa-star" />
        </div>
      )
    case 4:
      return (
        <div>
          <span className="fa fa-star star-clicked" />
          <span className="fa fa-star star-clicked" />
          <span className="fa fa-star star-clicked" />
          <span className="fa fa-star star-clicked" />
          <span className="fa fa-star" />
        </div>
      )
    case 5:
      return (
        <div>
          <span className="fa fa-star star-clicked" />
          <span className="fa fa-star star-clicked" />
          <span className="fa fa-star star-clicked" />
          <span className="fa fa-star star-clicked" />
          <span className="fa fa-star star-clicked" />
        </div>
      )
    default:
      return (
        null
      )
  }
}

export function toggleStars(id) {
  const starIdNum = Number(id.slice(-1));
  for (let num = 5; num >= 1; num--) {
    const star = document.getElementById(`star-${num}`);
    if (num <= starIdNum) {
      addClass(star);
    }
    else {
      removeClass(star);
    }
  }
}

function addClass(star) {
  if (!star.classList.contains('star-clicked'))
    star.classList.add('star-clicked');
}

function removeClass(star) {
  star.classList.remove('star-clicked');
}

export function byUserName(user, currentUser) {
  if (user && user.firstName) {
    return <p> By User {user.firstName} {user.lastName}</p>;
  }
  else if (!user && currentUser.firstName) {
    return <p> By User {currentUser.firstName} {currentUser.lastName}</p>;
  }
  return <p><i> By Anonymous</i></p>
}

export function reviewInfo(reviews) {
    const numOfReviews = reviews.length ? reviews.length : 0;
    const oneReview = reviews.length === 1;
    const total = reviews.length ? reviews.reduce((acc, current) => acc + current.rating, 0) : 0;
    const ratingAv = Math.round(total/numOfReviews);
    return (
      <div className="reviewAv">
        {starRating(ratingAv)}
        <p className="reviewCount">{numOfReviews} customer review{oneReview ? null : 's'}</p>
      </div>
    )
}
