import React from 'react'

const OurStory = () => {
  return (
    <div className="ourStory">
      <div className="team">
        <h1 className="how-title" >How The Board Came To Be</h1>
        <p>
          Here is a little story about how we came to be!
      </p>
        <h1 className="meet-the-title">Meat the Team</h1>
        <div className="teamContainer">
          <figure>
            <a href="https://www.linkedin.com/in/ayemachowdhury/">
              <img src="https://i.ibb.co/M1TdNgx/Ayema.png" />
            </a>
            <div>
            <h5>Ayema Chowdhury</h5>
            <span>Chief Pun Officer</span>
            <p>Ayema spends most of her day thinking of cheese puns.</p>
          </div>
          </figure>
          <figure>
            <a href="https://www.linkedin.com/in/summerdeehan/">
              <img src="https://i.ibb.co/5vkZDLW/Summer.png" />
            </a>
            <div>
              <h5>Summer Deehan</h5>
              <span>Chief Expat Officer</span>
              <p>Summer is British and hails from under Prince Charles.</p>
            </div>
          </figure>
          <figure>
            <a href="https://www.linkedin.com/in/conniejiayeelim/">
              <img src="https://i.ibb.co/bK30fdb/Connie.png" />
            </a>
            <div>
              <h5>Connie Lim</h5>
              <span>Chief Rind Officer</span>
              <p>Connie spends painstaking hours to make sure the cheeses in our inventory are of the highest-quality. She also has the least knowledge of cheeses.
          </p>
            </div>
          </figure>
          <figure>
            <a href="https://www.linkedin.com/in/bethany-m-walker/">
              <img src="https://image.ibb.co/hK7DCq/profile-pic.jpg" />
            </a>
            <div>
              <h5>Bethany Walker</h5>
              <span>Chief Food Officer</span>
              <p>Bethany is prim and proper. She makes sure that your boards are perfect!</p>
            </div>
          </figure>
        </div>
      </div>
    </div>
  )
}
export default OurStory
