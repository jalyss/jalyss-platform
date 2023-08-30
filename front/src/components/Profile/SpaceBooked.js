import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../../store/space';
import { useNavigate } from 'react-router-dom';
import Card from '../Commun/Card';
import { fetchBookings } from '../../store/booking';
import { fetchtarifspace, fetchtarifspaces } from '../../store/tarifspace';


const SpaceBooked = () => {
  const bookingstore = useSelector((state) => state.booking.bookings.items);
  const servicesBook = useSelector((state) => state.service.services.items);
  const tarifstore =useSelector((state)=>state.tarifs)
  const [id ,setid]=useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBookings());
    dispatch(fetchServices());

  }, []);

  useEffect(()=>{
    dispatch(fetchtarifspace())
  
  },[ dispatch])

console.log('heyyy tariff',tarifstore)

  return (
    <div className="d-flex flex-wrap justify-content-center align-items-center" style={{ maxWidth: "700px", maxHeight: "600px" }}>
      {bookingstore.map((booking, i) => (
        <div className="card" key={i} style={{ height: "600px", maxWidth: "500px", margin: "10px" }}>
          <img
            className="card-img-top"
            src="https://images.pexels.com/photos/3184669/pexels-photo-3184669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Card image"
          />
          <div className="card-body">
            <h5 className="card-title" style={{ color: 'purple' }}>Tarif Description:</h5>
            <h6 className="card-title" >{booking.tarif.description}</h6>
            <h5 className="card-title" style={{ color: 'purple' }}>Company:</h5>
            <h6 className="card-title">{booking.companyName}</h6>
            <h5 className="card-title" style={{ color: 'purple' }}>Free Space:</h5>
            <h6 className="card-title">{booking.freeSpace}</h6>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Start Time: {booking.startTime}</li>
              <li className="list-group-item">End Time: {booking.endTime}</li>
              <li className="list-group-item">Price: {booking.tarif.price}</li>
              <li className="list-group-item">
                {booking.paid ? (
                  <i className="fas fa-check-circle text-success"></i>
                ) : (
                  <i className="fas fa-times-circle text-danger"></i>
                )}
                {booking.paid ? " Paid" : " Not Paid"}
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
                }
export default SpaceBooked
