import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import '../components/components.css'
import UseFetch from '../hooks/UseFetch'


const Featured = () => {

  // const { data, loading, error, reFetch }=UseFetch("/hotels/countByCity?cities=berlin,madrid,london")
  const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                setLoading(true);
                const {data}=await axios.get('/api/hotels/countByCity?cities=berlin,madrid,london');
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
    // console.log(data);
  return (
    <div>
      <div className="featured">
        {loading? ("Loading please wait ") : (<>
        <div className="featuredItem">
            <img src="https://img.etimg.com/thumb/msid-68028270,width-1070,height-580,imgsize-357846,overlay-economictimes/photo.jpg" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Berlin</h1>
                <h2>{data[0]} properties</h2>
            </div>
        </div>
        <div className="featuredItem">
            <img src="https://img.etimg.com/thumb/msid-68028270,width-1070,height-580,imgsize-357846,overlay-economictimes/photo.jpg" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Madrid</h1>
                <h2>{data[1]} properties</h2>
            </div>
        </div>
        <div className="featuredItem">
            <img src="https://img.etimg.com/thumb/msid-68028270,width-1070,height-580,imgsize-357846,overlay-economictimes/photo.jpg" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>London</h1>
                <h2>{data[2]} properties</h2>
            </div>
        </div>
        <div className="featuredItem">
            <img src="https://img.etimg.com/thumb/msid-68028270,width-1070,height-580,imgsize-357846,overlay-economictimes/photo.jpg" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Delhi</h1>
                <h2>134 properties</h2>
            </div>
        </div>
        </>)}
      </div>
    </div>
  )
}

export default Featured
