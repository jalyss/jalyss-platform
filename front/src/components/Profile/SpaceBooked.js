import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../../store/space';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../Commun/Card';
import { fetchBookings, fetchspaceBookingByUserId } from '../../store/booking';
import { fetchtarifspace, fetchtarifspaces } from '../../store/tarifspace';


const SpaceBooked = () => {
  const bookingstore = useSelector((state) => state.booking.bookings.items )
  const dispatch = useDispatch();
  const[data,setdata]=useState([])

  const { userId } = useParams();

  useEffect(() => {
    dispatch(fetchspaceBookingByUserId(userId));
   
  }, [userId]);

  useEffect(() => {
    setdata([bookingstore])
  },[bookingstore]); 

 console.log('eeeee',data)

  console.log('heee',bookingstore)

  return (
    <div className="d-flex flex-wrap justify-content-center align-items-center" style={{ maxWidth: "700px", maxHeight: "600px" }}>
      { data?.map((el) => (
     
         <div className="card"   style={{ maxheight: "250px", maxWidth: "300px"}}  >
          <img
         
            className="card-img-top"
            src="https://images.pexels.com/photos/3184669/pexels-photo-3184669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Card image"
          /> 
  <div className="card-body ">

  
      <h5 className="card-title" style={{ color: 'purple', marginBottom: 0 }}>Company:</h5>
      <h6 className="card-title">{el.companyName}</h6>
    

      <h5 className="card-title" style={{ color: 'purple', marginBottom: 0 }}>Tarif Description:</h5>
      <h6 className="card-title">{el?.tarif?.description}</h6>
  
  
  
      <h5 className="card-title" style={{ color: 'purple', marginBottom: 0 }}>Free Space:</h5>
      <h6 className="card-title">{el.freeSpace}</h6>
  
      </div>

  <ul className="list-group list-group-flush">
    <li className="list-group-item">
    <div className="d-flex justify-content-between align-items-center">
    <span>Start Time: {el.startTime}</span>
    
    <span>End Time: {el.endTime}</span> 
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
