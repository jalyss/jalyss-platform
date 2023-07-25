import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchsessions } from "../../../store/sessions";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

function AddLecture() {

    const sessionStore = useSelector((state) => state.sessions);
    const { sessions } = sessionStore;
    const dispatch=useDispatch()
    const [sessionId,setSessionId]=useState(null)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const take = sessions?.items?.count || 10;
    const skip = 0;
    useEffect(() => {
      dispatch(fetchsessions({ take, skip }));
    }, [take]);

    function onChange(val) {
        const [start, end] = val;
        setStartDate(start);
        setEndDate(end);
      }
    console.log("sessId",sessionId);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-3">
      <select
        value={sessionId}
        class="form-select "
        aria-label="Default select example"
        onChange={(e)=>{setSessionId(e.target.value)}}
        required
        style={{
          border: "1px solid #bfbab7",
          width: 290,
          height: 42,
        }}
      >
        <option value="" disabled selected>
          Choose your Lecture Session
        </option>
        {sessions?.items?.items?.map((session, index) => (
          <option key={index} value={session.id}>
            {session.title}
          </option>
        ))}
      </select>

      <RangePicker
                      onChange={onChange}
                      style={{ height: "40px" }}
                      className=""
                    />
    </div>
  );
}

export default AddLecture;
