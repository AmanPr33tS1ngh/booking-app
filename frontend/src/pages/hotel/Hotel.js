import React from 'react'
import '../../components/components.css'
import Navbar from '../../components/Navbar'
import Header from '../../components/Header'
import MailList from '../MailList'
import Footer from '../Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import UseFetch from '../../hooks/UseFetch'
import { Link, BrowserRouter as Router, useLocation, useNavigate, Routes, Route, useParams } from 'react-router-dom'
import { useContext } from 'react'
import { SearchContext } from '../SearchContext'
import { AuthContext } from '../AuthContext'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'


const Hotel = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const hotelId=useParams().id;
  const [openModal, setOpenModal] = useState(false);
  const id = location.pathname.split("/")[2];
  const { user } = useContext(AuthContext)
  const user1 = localStorage.getItem('user')
  // console.log(user1);
  const [selectRoom, setSelectRoom] = useState(1);

  const [data, setData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/hotels/find/${id}`);
        const result = await axios.get(`/api/rooms`);
        // console.log(data);
        setData(data);
        setRoomData(result.data);
        setLoading(false);

      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }
    , [])
  // console.log(data.rooms);
  console.log(roomData);

  const handleClick = () => {
    if (user1) {
      setOpenModal(true);
    }
    else {
      navigate('/login')
    }
  }

  const handleBook=(id)=>{
    navigate(`/room/${id}/${hotelId}`)
  }


  return (
    <div>
      <Navbar />
      <Header type='list' />
      {loading ? ("loading") : (<div className="hotelContainer">
        <div className="hotelWrapper">

          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location - {data.distance} m from center
          </span>
          <span className="hotelPriceHighLight">
            Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {data.photos?.map(photo => (
              <div className="hotelImgWrapper">
                <img src={photo} alt="" className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsPrice">
              <h1>Perfect for a night stay! </h1>
              <span>located in the real heart of Krakow</span>
              <h2>
                <b>${data.cheapestPrice}</b>(1 night)
              </h2>
              <button onClick={handleClick}>Reserve Or Book Now</button>
            </div>

          </div>
        </div>
      </div>)}
      {openModal && (
        <div className='reserve'>
          <div className="rContainer">
            <FontAwesomeIcon icon={faCircleXmark} className='rClose' onClick={() => { setOpenModal(false) }} />

            <span>Select Your Rooms:</span>
            {data.rooms.map(room => (
              <div>
              <div className="rItem">
                <div className="rItemInfo">
                  <div className="rTitle">{room.title}</div>
                  <div className="rDesc">{room.description}</div>
                  <div className="rMax"><b>{room.maxPeople}</b></div>
                  <div className='rPrice'>{room.price}</div>
                  {room.availableRooms===0?(

                    <div className="rAvailableRooms">Rooms Aren't Available</div>
                  ):(
                    <div className="rAvailableRooms">Available rooms:{room.availableRooms}</div>

                  )}
                  <button type="button" disabled={room.availableRooms===0} onClick={()=>handleBook(room._id)} class="btn btn-dark">Book now</button>
                </div>
              </div>
              <hr />
              </div>
            ))}
          </div>
        </div>
      )}
      <MailList />
      <Footer />
    </div>

  )
}



export default Hotel

