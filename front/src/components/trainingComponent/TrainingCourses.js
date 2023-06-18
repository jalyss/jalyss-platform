import React from "react";
import { courses } from "../../dummydata";
import TrainingHeading from "../TrainingHeading";
import AutoCompleteFilter from "../AutoCompleteFilter";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Card from "../Card";
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
  
 let take=5;

  useEffect (() => {
    dispatch(fetchSessions({categoryId,take,skip}));
   
  }, [categoryId,skip]);



const handleChange = (event, value) => {
  setSkip((value - 1) * take);
};


console.log("count",sessions.count);

  return (
    <>
      <section className="courses" id="courses">
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

        <div className="blogListWrapper">
          {sessions.items.map((course) => (
            <div key={course.id}>
              <Card
                cover={course.cover}
                category={course.category.nameEn}
                title={course.title}
                startTime={course.startDate.slice(0,10)}
                endTime={course.endDate.slice(0,10)}
                onClick={() => navigate(`/sessions/${course.id}`)} 
              />
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-center align-items-center mt-5">
        <Pagination
            count={
              sessions.count % take === 0
                ? Math.floor(sessions.count / take)
                : Math.floor(sessions.count / take) + 1
            }
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
