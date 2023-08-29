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

  return (
    <div>
      {bookingstore.map((el,index)=>{
      <div className="card" style={{ width: '18rem' }}>
        <img className="card-img-top" src="https://images.pexels.com/photos/3184669/pexels-photo-3184669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
        alt="https://images.pexels.com/photos/3184669/pexels-photo-3184669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
        <div className="card-body">
          <h5 className="card-title"> companyName:{el.companyName}</h5>
          <p className="card-text">freeSpace:{el.freeSpace} </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{el.paid}</li>
          <li className="list-group-item">StartTime:{el.startTime}</li>
          <li className="list-group-item">EndTime:{el.endTime}</li>
        </ul>
      
      </div>
       })} 
    </div>
  );
  
  }
export default SpaceBooked
