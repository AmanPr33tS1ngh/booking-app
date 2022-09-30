import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import UseFetch from '../hooks/UseFetch'

const FeaturedProperties = () => {
    // const { data1, loading, error, reFetch }=UseFetch("/api/hotels?featured=true&limit=5")
    // console.log(data1);
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                setLoading(true);
                const {data}=await axios.get('/api/hotels?featured=true&limit=5');
                // console.log(data);
                setData(data);
                setLoading(false);
                
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }
    ,[])
    console.log(data);
    return (
        <div className='fp'>
            {loading?"loading page...":<>
            {data.map(item=>(<div className="fpItem" key={item._id}>
                <img src={item.photos[0]} alt="" className="fpImg" />
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
                {item.rating && <div className="fpRating">
                    <button>{item.rating}</button>
                    <span>Excellent</span>
                </div>}
            </div>))}
            </>}
        </div>
    )
}

export default FeaturedProperties
