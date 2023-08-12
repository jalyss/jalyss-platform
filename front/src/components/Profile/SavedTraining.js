import React, { useEffect, useState } from 'react'
import KeyValueStyled from '../Commun/KeyValueStyled';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrainingBookingByUserId } from '../../store/trainingBooking';

import Card from "../Commun/Card";
import Pagination from "@mui/material/Pagination";
import { useParams } from 'react-router-dom';



const SavedTraining = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const trainingStore = useSelector((state) => state.trainingBooking.trainingBookings);
    
    const { items, count } = trainingStore;
    const [skip, setSkip] = useState(0);
    let take = 6;
   

    useEffect(() => {
        dispatch(fetchTrainingBookingByUserId(userId));
    }, [ userId]);

    const handleChange = (event, value) => {
        setSkip((value - 1) * take);
    };


    return (

        <div>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
                <h1>Training List</h1>
            </div>



            <div className="blogListWrapper">
                {trainingStore?.items?.map((trainingBooking) => (
                    <div key={trainingBooking.id}>
                        <Card
                            cover={trainingBooking?.sessiontarif?.session?.cover?.path}
                            category={trainingBooking?.sessiontarif?.session?.category?.nameEn}
                            title={trainingBooking?.sessiontarif?.session?.title}
                            startTime={trainingBooking?.sessiontarif?.session?.startDate?.slice(0, 10)}
                            endTime={trainingBooking?.sessiontarif?.session?.endDate?.slice(0, 10)}
                        />
                        <div className="d-flex flex-wrap justify-content-center align-items-center">

                            <div class="card " style={{ width: 300, marginTop: 25 }}>
                                <div class="card-body" style={{ textAlign: "center" }}>
                                    <h4>{trainingBooking?.sessiontarif?.title} </h4>
                                    <hr></hr>

                                    <h5>Price : </h5>
                                    <p>{trainingBooking?.sessiontarif?.price}$</p>
                                </div>
                            </div>

                        </div>

                    </div>

                ))}


            </div>


            {/* <div className="d-flex justify-content-center my-5">
            <Pagination
                    count={
                        count % take === 0
                            ? Math.floor(count / take)
                            : Math.floor(count / take) + 1
                    }
                    color="secondary"
                    variant="outlined"
                    onChange={handleChange}
                />
            </div> */}

        </div>

    )
}

export default SavedTraining
