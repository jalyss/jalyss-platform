import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate, useParams } from 'react-router-dom';
import Card from '../Commun/Card';
import {fetchBooking} from '../../store/booking';



const SpaceBooked = () => {
  const bookingstore = useSelector((state) => state.booking.booking)

  const dispatch = useDispatch();
  const[data,setdata]=useState([])
  const {userId} = useParams();

  useEffect(() => {
    dispatch( fetchBooking(userId))
  }, [dispatch]);

  console.log(userId)
  useEffect(() => {
    setdata([bookingstore])
  },[userId]); 
  

 console.log('eeeee',data)

  console.log('bookingstore',bookingstore)

  return (
    <div className="card" style={{ maxheight: "250px", maxWidth: "300px"}}  >
      { data?.map((el) => (
     
         <div className="card-body"  >
          <img
         
            className="card-img-top"
            src="https://images.pexels.com/photos/3184669/pexels-photo-3184669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Card image"
          /> 
  <div className="card-body ">

  
      <h5 className="card-title" style={{ color: 'purple', marginBottom: 0 }}>Company:</h5>
      <h6 className="card-title">{el?.companyName}</h6>
    

      <h5 className="card-title" style={{ color: 'purple', marginBottom: 0 }}>Tarif Description:</h5>
      <h6 className="card-title">{el?.tarif?.description}</h6>
  
  
  
      <h5 className="card-title" style={{ color: 'purple', marginBottom: 0 }}>Free Space:</h5>
      <h6 className="card-title">{el?.freeSpace}</h6>
  
      </div>

  <ul className="list-group list-group-flush">
    <li className="list-group-item">
    <div className="d-flex justify-content-between align-items-center">
    <span>Start Time: {el?.startTime}</span>
    
    <span>End Time: {el?.endTime}</span> 
    </div>
    </li>
    <li className="list-group-item">
      <div className="d-flex justify-content-between align-items-center">
        <span>Price: {el?.tarif?.price}DT</span>
        
        <span>
          {el.paid ? (
            <i className="fas fa-check-circle text-success"></i>
          ) : (
            <i className="fas fa-times-circle text-danger"></i>
          )}
          {el.paid ? "Paid" : "Not Paid"}
        </span>
      </div>
    </li>
  </ul>
</div>


          

         ))}
    </div>
  );
              }
export default SpaceBooked
