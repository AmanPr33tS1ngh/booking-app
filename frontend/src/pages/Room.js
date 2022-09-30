import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const Room = () => {
  const { id } = useParams();
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [roomQuantity, setRoomQuantity] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/rooms/${id}`);
      setData(data);
    }
    fetchData();
  }, [])
  console.log(data);

  const increaseRoom = () => {
    setRoomQuantity(roomQuantity + 1)
  }
  const decreaseRoom = () => {
    setRoomQuantity(roomQuantity - 1)
  }
  const handleClick = () => {
    try {
      const decreaseRoom = axios.put(`/api/rooms/dec/${id}/${hotelId}`, {
        availableRooms: Number(roomQuantity)
      });
      console.log(decreaseRoom);
    } catch (err) {
      console.log(err);
    }
    navigate('/');
  }
  return (
    <div>

      <Navbar />
      <Header type='list' />
      <div className="roomWrapper"><div className="room">
        <div className='mx'><h3>{data.title}</h3></div>
        <div className='mx' >{data.price}</div>
        <div className='mx'>Description:  {data.description}</div>
        <div className='mx'>for {data.maxPeople} People</div>
        <button onClick={() => setModal(true)} className='btn btn-dark'>Pay Now</button>
        {modal && (
          <div className='reserve'>
            <div className="rContainer">
              <FontAwesomeIcon icon={faCircleXmark} className='rClose' onClick={() => { setModal(false) }} />

              <span>How many Rooms do you want?</span>
              <div>
                <button onClick={decreaseRoom} disabled={roomQuantity === 1} className="btn btn-dark">-</button>
                <span><strong>{roomQuantity}</strong></span>
                <button onClick={increaseRoom} disabled={roomQuantity === data.availableRooms} className="btn btn-dark">+</button>

              </div>
              <span>Price:<strong>{data.price * roomQuantity}</strong> </span>
                <div className="btnRoom">
                  <button onClick={handleClick} className='btn btn-dark'>Pay Now</button>
                </div>
            </div>
          </div>
        )}</div>
      </div></div>
  )
}

export default Room
