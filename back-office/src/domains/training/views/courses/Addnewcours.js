import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { CreateNeswcours, fetchcours } from "../../../../store/courses";

import { useNavigate } from "react-router-dom";
import SaveButton from "../../../../components/Commun/buttons/SaveButton";
import AutoCompleteFilter from "../../../../components/Commun/AutoCompleteFilter";
import StyledInput from "../../../../components/Commun/inputs/StyledInput";

import {
  Paper,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
} from "@mui/material";
import { fetchGains } from "../../../../store/gain";
import { fetchUsers } from "../../../../store/user";

const Addnewcours = () => {
  const gainsStore = useSelector((state) => state.gain);
  const { gains } = gainsStore;
  const [selectedGains, setSelectedGains] = useState([]);
  const coacheStore = useSelector((state) => state.user);
  const { users } = coacheStore;
  const [selectedCoach, setSelectedCoach] = useState([]);
  const [addcours, setAddcours] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchGains());

    dispatch(fetchUsers());
  }, [dispatch]);
  const Addcours = async (event) => {
    event.preventDefault();
    addcours.lecturesHasGainsIds = selectedGains.map((e) => e.id);
    addcours.cochingIds = selectedCoach.map((e) => e.id);

    dispatch(CreateNeswcours(addcours)).then((res) => {
      if (!res.error) {
        showSuccessToast("cours.created");
        setAddcours({});
        setSelectedGains([]);
        setSelectedCoach([]);
        navigate(-1);
       
      } else {
        console.log(res);
        showErrorToast(res.error.message);
      }
    });
  };
  const handleAddcoursChange = (e) => {
    const { name, value } = e.target;
    console.log(addcours);

    setAddcours((addcours) => ({
      ...addcours,
      [name]: value,
    }));
  };

  return (
    <div className="d-flex flex-column justify-content-center w-100 m-3 ">
      <TableContainer
        className=""
        style={{ marginTop: "70px" }}
        component={Paper}
      >
        <Table aria-label="simple table">
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell className="fw-bold">Title:</TableCell>
              <TableCell>
                <StyledInput
                  value={addcours.title || ""}
                  onChange={handleAddcoursChange}
                  label="Title"
                  name="title"
                />
              </TableCell>
              <TableCell className="fw-bold">Content:</TableCell>
              <TableCell>
                <StyledInput
                  value={addcours.content || ""}
                  onChange={handleAddcoursChange}
                  label="Content"
                  name="content"
                />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell className="fw-bold">Gains:</TableCell>
              <TableCell>
                <div className="d-flex">
                  <AutoCompleteFilter
                    value={selectedGains}
                    required
                    data={gains?.items}
                    labelOptionName="content"
                    label="Add gains"
                    onChange={setSelectedGains}
                    placeholder="Add Your session's gain"
                    width={280}
                  />
                  <span style={{ color: "red" }}>*</span>
                </div>
                <div>
                  {!selectedGains.length && (
                    <p style={{ color: "red", textAlign: "start" }}>
                      You must select gains for the session !{" "}
                    </p>
                  )}
                </div>
              </TableCell>
              <TableCell className="fw-bold">Coachs:</TableCell>
              <TableCell>
                <div className="d-flex">
                  <AutoCompleteFilter
                    value={selectedCoach}
                    required
                    data={users?.items.filter((elem) => elem.isCoach === true)}
                    labelOptionName="fullNameEn"
                    label="Add coachs"
                    onChange={setSelectedCoach}
                    placeholder="Add Your lecture coachs"
                    width={280}
                  />
                  <span style={{ color: "red" }}>*</span>
                </div>
                <div>
                  {!selectedCoach.length && (
                    <p style={{ color: "red", textAlign: "start" }}>
                      You must select coachs for the lecture !{" "}
                    </p>
                  )}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className="d-flex justify-content-center align-items-center mt-3">
        <SaveButton onClick={Addcours} />
      </div>
    </div>
   
  );
};

export default Addnewcours;
