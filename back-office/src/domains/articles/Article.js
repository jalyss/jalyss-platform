import React, { useState } from 'react'
import axios from 'axios';
import { Outlet } from 'react-router-dom';
function Article() {
 const [files,setFiles]=useState([])

  const  handleSend=async()=>{
    console.log("im files",files);
    const formData = new FormData();

    for(const key in files){
      console.log(key);
       formData.append("files",files[key])
    }
   
    const response=await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/uploads`, formData)
    console.log(response.data);
  }
  return (
    <div className='page'>
      <input type="file" multiple onChange={(e)=>{setFiles(e.target.files)}}/>
      <button onClick={handleSend}> send</button>
        <Outlet/>
    </div>
  )
}

export default Article