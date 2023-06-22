import React, { Fragment } from "react";
import TrainingHome from "../components/trainingComponent/TrainingHome";
import TrainingCourses from "../components/trainingComponent/TrainingCourses";
import TrainingTestimonial from "../components/trainingComponent/TrainingTestimonial";
import Faq from "../components/Faq";

function TrainingPage() {
  return (
    <Fragment>
      <TrainingHome />
      <TrainingCourses />
      <TrainingTestimonial />
      <Faq />
    </Fragment>
  );
}

export default TrainingPage;
