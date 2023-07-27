import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { purple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { editCours, fetchOnecouse } from "../../../../store/courses";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import StyledInput from "../../../../components/Commun/inputs/StyledInput";
import AutoCompleteFilter from "../../../../components/Commun/AutoCompleteFilter";

const Coursdetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lecture = useSelector((state) => state.courses.cours);
  const gainsStore = useSelector((state) => state.gain);
  const { gains } = gainsStore;
  const coacheStore = useSelector((state) => state.user);
  const { users } = coacheStore;
  const [selectedGains, setSelectedGains] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState([]);
  const [addcours, setAddcours] = useState({});
  const [editMode, setEditMode] = useState(false);

  const { lectureId } = useParams();

  useEffect(() => {
    dispatch(fetchOnecouse(lectureId));
  }, [lectureId]);

  useEffect(() => {
    setAddcours({ ...addcours, ...lecture });
    setSelectedGains(
      lecture?.LectureHasWhatYouWillLearn?.map((elem) => elem.WhatYouWillLearn)
    );
    setSelectedCoach(lecture?.coaching?.map((elem) => elem.user));
  }, [lecture, editMode]);

  const handleAddcoursChange = (e) => {
    const { name, value } = e.target;
    console.log(addcours);

    setAddcours((addcours) => ({
      ...addcours,
      [name]: value,
    }));
  };
  const handleSubmitUpdate = async (event) => {
    if (editMode) {
      event.preventDefault();
      addcours.lecturesHasGainsIds = selectedGains.map((e) => e.id);
      addcours.cochingIds = selectedCoach.map((e) => e.id);
      dispatch(editCours(addcours)).then((res) => {
        if (!res.error) {
          showSuccessToast(t("cours.updated"));
          setEditMode(false);
        } else {
          console.log(res);
          showErrorToast(res.error.message);
        }
      });
    } else {
      setEditMode(true);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center w-100 m-3 ">
      <TableContainer
        className="w-100"
        component={Paper}
        style={{ marginTop: 80 }}
      >
        <Table aria-label="simple table">
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell className="fw-bold">Title</TableCell>
              <TableCell>
                {editMode ? (
                  <StyledInput
                    value={addcours.title || ""}
                    onChange={handleAddcoursChange}
                    label="Title"
                    name="title"
                  />
                ) : (
                  <span>{lecture?.title} </span>
                )}
              </TableCell>

              <TableCell className="fw-bold">Content</TableCell>
              <TableCell>
                {editMode ? (
                  <StyledInput
                    value={addcours.content || ""}
                    onChange={handleAddcoursChange}
                    label="Content"
                    name="content"
                  />
                ) : (
                  <span>{lecture?.content}</span>
                )}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell className="fw-bold">Gains:</TableCell>
              <TableCell>
                {editMode ? (
                  <>
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
                  </>
                ) : (
                  <>
                    {selectedGains?.map((elem, i) => (
                      <div key={i}>{elem.content}</div>
                    ))}
                  </>
                )}
              </TableCell>

              <TableCell className="fw-bold">Coachs:</TableCell>
              <TableCell>
                {editMode ? (
                  <>
                    <div className="d-flex">
                      <AutoCompleteFilter
                        value={selectedCoach}
                        required
                        data={users?.items.filter(
                          (elem) => elem.isCoach === true
                        )}
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
                  </>
                ) : (
                  <>
                    {selectedCoach?.map((elem, i) => (
                      <div key={i}>{elem.fullNameEn}</div>
                    ))}
                  </>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <div className="w-100 d-flex justify-content-center">
        <button
          type="submit"
          className="confirm-button mt-3"
          onClick={handleSubmitUpdate}
        >
          <span className="label-btn">{editMode ? "حفظ" : "تعديل"}</span>
        </button>
      </div>
    </div>
  );
};

export default Coursdetail;
