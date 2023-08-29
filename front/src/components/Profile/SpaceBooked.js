import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../../store/space';
import { useNavigate } from 'react-router-dom';
import Card from '../Commun/Card';
import { fetchBookings } from '../../store/booking';

const SpaceBooked = () => {
  const bookingstore = useSelector((state) => state.booking.bookings.items);
  const servicesBook = useSelector((state) => state.service.services.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBookings());
    dispatch(fetchServices());
  }, []);

console.log('heyyy', bookingstore)

  return(
    <div className="d-flex flex-wrap justify-content-center align-items-center">
      {bookingstore.map((booking, i) => (
        <div className="card" style={{ maxxwidth: '100px'  }} key={i}>
          <img
            className="card-img-top"
            src="https://images.pexels.com/photos/3184669/pexels-photo-3184669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Card image"
          />
          <div className="card-body">
            <h5 className="card-title">companyName: {booking.companyName}</h5>
            <p className="card-text">freeSpace: {booking.freeSpace}</p>
          </div>
          <ul className="list-group list-group-flush">
            
            <li className="list-group-item">StartTime: {booking.startTime}</li>
            <li className="list-group-item">EndTime: {booking.endTime}</li>
            <li className="list-group-item">
            Paid
            {booking.paid ? (
              <i className="fas fa-check-circle" style={{ color: 'green' }}></i>
            ) : (
              <i className="fas fa-times-circle" style={{ color: 'red' }}></i>
            )}
          </li>
          </ul>
        </div>
      ))}
    </div>
  );
  
  }
export default SpaceBooked
