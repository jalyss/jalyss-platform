import React from "react";
import { lectures } from "../dummydata";

function DescriptionLecture() {
  return <div>{
    lectures.map(()=>(<div>{lectures.title}</div>))
    }</div>;
}

export default DescriptionLecture;
