import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookings} from '../../store/booking';
import { fetchServices } from '../../store/space';

const SpaceBooked = () => {
const bookingstore = useSelector((state)=>state.booking.bookings.items
)
const serviesbook = useSelector((state)=>state.service.services.items)
// const [bookings,setbooking]=useState({})
const dispatch = useDispatch();

console.log('hayaa',bookingstore)
console.log('jajaj',serviesbook)

useEffect(() => {
dispatch(fetchBookings())
dispatch(fetchServices())
},[]);

  return (
    <div className='d-flex' style={{ borderRadius:10}}>
        { serviesbook.map((el,index)=>( 
    <div className="card" style={{width: " 18rem"}}>
      <img
      style={{
        width:'auto',
        height:200,
      }}
       className="blogItemCover"
       src={el.cover.path}
       alt="cover"
              />
    <div className="card-body">
      <h5 className="card-title">{el.name}</h5>
      <p className="card-text">{el.identifier}</p>
       <p className="card-text">{el.perHour}</p>
      <a href="#" className="btn btn-primary">Go somewhere</a>
    </div>
  </div>
     ))} 
  </div>
  )
}

export default SpaceBooked