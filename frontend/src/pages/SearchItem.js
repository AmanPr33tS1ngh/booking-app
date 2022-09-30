import React from 'react'
import { Link } from 'react-router-dom'

const SearchItem = ({item}) => {
  
  return (
    <div className='searchItem'>
      <img src={item.photos} />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from center </span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubTitle">Studio Apartment with Air Conditioning</span>
        <span className="siFeatures">{item.description}</span>
        <span className="siCancelOp">Free Cancellation</span>
        <span className="siCancelOpSubtitle">
          You can cancel later,so lock in this great price today
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailsTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siPTaxiOp">Includes Taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
          <button className='siCheckButton'>See availability</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SearchItem
