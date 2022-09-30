import React from 'react'
import './components.css'
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DateRange } from 'react-date-range'
import { useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { SearchContext } from '../pages/SearchContext'
import { AuthContext } from '../pages/AuthContext'

const Header = ({type}) => {
    const navigate=useNavigate()
    const user=localStorage.getItem('user');
    const [destination, setDestination] = useState("")
    const [showDate, setShowDate] = useState(false)
    const [dates, setDates] = useState(
        [{
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }]
    )
    const [showOptions, setShowOptions] = useState(false);
    const [options, setOption] = useState({
        adult: 1,
        children: 0,
        room: 1
    })

    const handleOption=(name,operation)=>{
        setOption(prev=>{
            return{
                ...prev,[name]: operation==="i"?options[name]+1:options[name]-1,
            }
        })
    }
    const handleSearch=()=>{
        dispatch({type:"NEW_SEARCH",payload:{destination,dates,options}})
        navigate("/hotels",{state:{destination,dates,options}})
    }

    const {dispatch}=useContext(SearchContext)
    return (
        <div className='header'>
            <div className={type==="list"?"headerContainer listMode":"headerContainer"}>
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car Rentals</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport Taxis</span>
                    </div>
                </div>
            { type!=="list" &&
                <>
            <h1 className='headerTitle'>A lifetime of discounts?It's Genius</h1>
            <p className='headerDescription'>Get rewarded for your travels -- unlock instant savings of 10% or more with a free Booking Account</p>
            {!user && <button className="headerBtn">
                Sign in / Register
            </button>}
            <div className="center">
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faBed} className="headerIcon" />
                        <input type="text" placeholder='where are you going' className='headerSearchInput' onChange={e=>setDestination(e.target.value)} />
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                        <span className='headerSearchText' onClick={() => setShowDate(!showDate)}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                        {showDate && <DateRange
                            editableDateInputs={true}
                            onChange={(item) => setDates([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={dates}
                            className="date" 
                            minDate={new Date()}/>}
                    </div>

                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                        <span className='headerSearchText' onClick={() => setShowOptions(!showOptions)}>{`${options.adult} adult - ${options.children} children - ${options.room} room `}</span>
                        {showOptions && <div className="options">
                            <div className="optionItem">
                                <span className="optiontext">Adult</span>
                                <div className="optionCounter">
                                <button 
                                disabled={options.adult<=1}
                                className="optionCounterButton" onClick={()=>handleOption("adult","d")}>-</button>
                                <button 
                                className="optionCouterNumber">{options.adult}</button>
                                <button className="optionCounterButton" onClick={()=>handleOption("adult","i")}>+</button>
                            </div>
                            </div>
                            <div className="optionItem">
                                <span className="optiontext">Children</span>
                                <div className="optionCounter">
                                <button 
                                disabled={options.children<=0}
                                className="optionCounterButton" onClick={()=>handleOption("children","d")}>-</button>
                                <button 
                                className="optionCouterNumber">{options.children}</button>
                                <button className="optionCounterButton" onClick={()=>handleOption("children","i")}>+</button>
                            </div>
                            </div>
                            <div className="optionItem">
                                <span className="optiontext">Rooms</span>
                                <div className="optionCounter">
                                <button 
                                disabled={options.room<=1}
                                className="optionCounterButton" onClick={()=>handleOption("room","d")}>-</button>
                                <button 
                                className="optionCouterNumber">{options.room}</button>
                                <button className="optionCounterButton" onClick={()=>handleOption("room","i")}>+</button>
                            </div>
                            </div>
                        </div>}
                    </div>
                    <div className="headerSearchItem">
                        <button className="headerBtn" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </div>
            </div></>}
            </div>
        </div>
    )
}

export default Header
