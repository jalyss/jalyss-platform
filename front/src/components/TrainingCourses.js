import React from "react";
import { courses } from "../dummydata";
import TrainingHeading from "./TrainingHeading";
import AutoCompleteFilter from "./AutoCompleteFilter";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

const TrainingCourses = () => {
  const navigate = useNavigate();

  const categories = {
    items: [
      { id: 1, nameEn: "Category 1" },
      { id: 2, nameEn: "Category 2" },
      { id: 3, nameEn: "Category 3" },
      { id: 4, nameEn: "Category 4" },
      { id: 5, nameEn: "Category 5" },
    ],
  };

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
          />
        </div>

        <div className="blogListWrapper">
          {courses.map((course) => (
            <div key={course.id}>
              <Card
                cover={course.cover}
                category={course.category}
                title={course.title}
                duration={course.time}
                startTime={course.startTime}
                endTime={course.endTime}
                onClick={() => navigate(`/sessions/${course.id}`)} 
              />
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-center align-items-center mt-5">
          <Pagination count={10} variant="outlined" color="secondary" />
        </div>
      </section>
    </>
  );
};

export default TrainingCourses;
