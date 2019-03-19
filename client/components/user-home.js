import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SlideShow from 'react-image-show';
import { BrowserView, MobileView } from 'react-device-detect';

/**
 * COMPONENT
 */
export const UserHome = props => {
  const { email } = props

  return (
    <div className="home-page">
      <h1 className="home-page-title">Welcome {email}</h1>
      {/* <img className="home-image" src="https://image.ibb.co/ftLjLA/Charcuterie-Board.png" /> */}
      <div id="slideshow">
        <BrowserView>
          <SlideShow
            images={[
              'images/tray.jpg',
              'images/tray2.jpg',
              'images/tray3.jpg'
            ]}
            width="920px"
            imagesHeightMobile="56vw"
            infinite indicators
          />
        </BrowserView>
        <MobileView>
          <SlideShow
            images={['https://static.vinepair.com/wp-content/uploads/2017/02/board-garlicbread.jpg', 'https://static.vinepair.com/wp-content/uploads/2017/02/board-eggplant.jpg', 'https://static.vinepair.com/wp-content/uploads/2017/02/board-glutenfree.jpg', 'https://static.vinepair.com/wp-content/uploads/2017/02/board-sepearte.jpg', 'https://static.vinepair.com/wp-content/uploads/2017/02/board-bloodorange.jpg']}
            width="920px"
            imagesWidth="100%"
            imagesHeightMobile="56vw"
            infinite indicators
          />
        </MobileView>
      </div>

    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
