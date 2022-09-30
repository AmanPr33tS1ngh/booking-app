import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import UseFetch from '../hooks/UseFetch'

const PropertyList = () => {
  
  const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                setLoading(true);
                const {data}=await axios.get('/api/hotels/countByType');
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
  const images=[
    "https://img.etimg.com/thumb/msid-68028270,width-1070,height-580,imgsize-357846,overlay-economictimes/photo.jpg",
    "https://img.etimg.com/thumb/msid-68028270,width-1070,height-580,imgsize-357846,overlay-economictimes/photo.jpg",
    "https://img.etimg.com/thumb/msid-68028270,width-1070,height-580,imgsize-357846,overlay-economictimes/photo.jpg",
    "https://img.etimg.com/thumb/msid-68028270,width-1070,height-580,imgsize-357846,overlay-economictimes/photo.jpg",
  ]
  
  return (
    <div className='pList'>
    {loading?("loading page..."):
    (<>
    {data && images.map((img,i)=><div className="pListItem" key={i}>
      <img src={img} alt="" className="pListImg" />
      <div className="pListTitles">
          <h1>{data[i]?.type}</h1>
          <h2>{data[i]?.count} {data[i]?.type}</h2>
      </div>
    </div>)}
    </>) 
    }
    </div>
  )
}

export default PropertyList
