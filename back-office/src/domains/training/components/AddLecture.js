import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchsessions } from "../../../store/sessions";
import { DatePicker, Form } from "antd";
import DisplayLottie from "../../../components/DisplayLottie";
import course from "../../../constants/course.json";
import { fetchcours } from "../../../store/courses";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

function AddLecture({ setLecture, lecture, session, startDate, endDate }) {
  const coursStore = useSelector((state) => state.courses.courses.items);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchcours());
  }, [dispatch]);

  function onChange(val) {
    const [start, end] = val;
    setLecture((Lecture) => ({ ...Lecture, startAt: start, endAt: end }));
  }
  const disabledDate = (current) => {
    const { startDate, endDate } = session;
    const { startAt, endAt } = lecture;
    if (!startDate && !endDate) {
      return false;
    }
    const tooLate = startAt && current.diff(startAt, "days") >= endDate;
    const tooEarly = endAt && endAt.diff(current, "days") >= startDate;
    return !!tooEarly || !!tooLate;
  };

  console.log(session);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-3">
      <DisplayLottie
        animationData={course}
        style={{ width: "120px", height: "120px" }}
      />
      <select
        value={lecture?.lectureId}
        class="form-select "
        aria-label="Default select example"
        onChange={(e) => {
          console.log(e.target.name);
          setLecture((Lecture) => ({
            ...Lecture,
            lectureId: e.target.value,
            title: coursStore.filter((elem) => elem.id === e.target.value)[0]
              .title,
          }));
        }}
        required
        style={{
          border: "1px solid #bfbab7",
          width: 290,
          height: 42,
        }}
      >
        <option value="" disabled selected>
          Choose your lecture Session
        </option>
        {coursStore.map((course, index) => (
          <option key={index} value={course.id} name={course.title}>
            {course.title}
          </option>
        ))}
      </select>
      <Form.Item
        name="range_picker"
        rules={[{ required: true, message: "Please select date" }]}
      >
        <RangePicker
          disabledDate={(current) => {
            return (
              current &&
              current <= dayjs(startDate) &&
              current >= dayjs(endDate)
            );
          }}
          onChange={onChange}
          style={{ height: "40px" }}
        />
      </Form.Item>
    </div>
  );
}

export default AddLecture;
