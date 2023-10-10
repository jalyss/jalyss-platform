import React, { useRef } from "react";
import { courses } from "../../dummydata";
import TrainingHeading from "../Commun/TrainingHeading";
import AutoCompleteFilter from "../Commun/AutoCompleteFilter";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Card from "../Commun/Card";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSessions } from "../../store/session";
import { useEffect } from "react";
import { useState } from "react";

const TrainingCourses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch ();
  const [categoryId,setCategoryId]=useState([])
  const sessionStore = useSelector((state) => state.session);
  const { sessions } = sessionStore;
  const categoriesStore = useSelector((state) => state.category);
  const { categories } = categoriesStore;
  const [skip, setSkip] = useState(0);
  const elRef = useRef(null);
 let take=6;

  useEffect (() => {
    dispatch(fetchSessions({categoryId,take,skip})).then(res => elRef.current.scrollIntoView() )
   
  }, [categoryId,skip]);



const handleChange = (event, value) => {
  setSkip((value - 1) * take);
};


console.log("count",sessions.items.titleAr);

  return (
    <>
      <section className="courses " id="joinSession">
        <TrainingHeading subtitle="SESSIONS" title="Explore our sessions" />
        <div className="mt-4 d-flex justify-content-center align-items-center">
          <AutoCompleteFilter
            data={categories.items}
            valueOptionName="id"
            labelOptionName="nameEn"
            label="Filter by Category"
            onChange={setCategoryId}
          />
        </div>

        <div className="blogListWrapper" ref={elRef} >
          {sessions?.items.map((course) => (
            <div key={course.id}>
              <Card
                cover={course?.cover?.path}
                category={course?.category.nameEn}
                title={course?.titleAr}
                startTime={course?.startDate.slice(0,10)}
                endTime={course?.endDate.slice(0,10)}
                onClick={() => navigate(`/sessions/${course.id}`)} 
                dropdown={true}
              />
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-center align-items-center mt-5">
        <Pagination
        count={
          Math.ceil(sessions.count / take) 
        }
            // count={
            //   sessions.count % take === 0
            //     ? Math.floor(sessions.count / take)
            //     : Math.floor(sessions.count / take) + 1
            // }
            color="secondary"
            variant="outlined"
            onChange={handleChange}
          />
        </div>
      </section>
    </>
  );
};

export default TrainingCourses;
