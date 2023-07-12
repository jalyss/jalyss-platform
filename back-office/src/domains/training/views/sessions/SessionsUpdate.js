import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { purple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { editsession, fetchOnesession } from "../../../../store/sessions";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import { fetchCategories } from "../../../../store/category";
import { useNavigate } from "react-router-dom";

const SessionsUpdate = () => {
  const sessions = useSelector((state) => state.sessions.session);
  const categoriesStore = useSelector((state) => state.category);
  const { categories } = categoriesStore;
  const [categoryId, setCategoryId] = useState("");
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [session, setSession] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [enddate, setEnddate] = useState("");
  const [startdate, setStartdate] = useState("");
  const [editMode, setEditMode] = useState(false);
  const { sessionsId } = useParams();

  useEffect(() => {
       dispatch(fetchOnesession(sessionsId));
  }, [ sessionsId]);
  useEffect(() => {
   setTitle(sessions?.title)
   setDescription(sessions?.description)
   setEnddate(sessions?.endDate)
   setStartdate(sessions?.startDate)
   setCategoryId(sessions?.category?.nameEn)
  //  console.log("session",session);
  }, []);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);


  const submitEditsession = async (event) => {
    event.preventDefault();
    if (!editMode) {
      setEditMode(true);
    } else {
      // let body = Object.assign({},session)
      let body = {
        title,
        description,
        startDate: new Date(startdate),
        endDate: new Date(enddate),
        categoryId 
      };
      console.log("sess", body);
      dispatch(editsession({ id: sessionsId, body })).then((res)=>{
        if (res.error) {
          showErrorToast(res.error.message)
        } else {
          showSuccessToast('session has been updted')
          navigate(-1)
        }
      })
      setEditMode(false);
    }
  };

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <h2>Profile coches</h2>
      <form className="checkout-form">
        <div className="d-flex flex-wrap">
          <div className="d-flex justify-content-center w-100 m-3">
            <TableContainer className="w-100" component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("titel")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          id="title"
                          value={title}
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        />
                      ) : (
                        <span> {sessions?.title}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t(" description")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          id="description"
                          type="text"
                          value={description}
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                          className="form-control"
                        />
                      ) : (
                        <span>{sessions?.description}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("start-Date")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          type="date"
                          id="startDate"
                          onChange={(e) => {
                            setStartdate(e.target.value);
                          }}
                          value={startdate}
                          className="form-control"
                        />
                      ) : (
                        <span>{sessions?.startDate}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
  <TableCell className="fw-bold" align="right">
    {t("End sessions")}
  </TableCell>
  <TableCell align="right">
    <div style={{ display: "flex", alignItems: "center" }}>
      {editMode ? (
        <input
          type="date"
          id="endDate"
          value={enddate}
          onChange={(e) => {
            setEnddate(e.target.value);
          }}
          className="form-control"
        />
      ) : (
        <span>{sessions?.endDate}</span>
      )}
      <TableCell className="fw-bold" align="right">
        {t("Category session:")}
      </TableCell>
      {editMode ? (
        <select
          value={categoryId}
          className="form-select mt-3"
          aria-label="Default select example"
          onChange={(e)=>{setCategoryId(e.target.value)}}
          required
          style={{ marginLeft: "10px" }}
        >
          <option value="" disabled selected>
            Choose your Blog category
          </option>
          {categories.items.map((category, index) => (
            <option key={index} value={category.id}>
              {category.nameEn}
            </option>
          ))}
        </select>
      ) : (
        <span>{sessions?.category?.nameEn}</span>
      )}
    </div>
  </TableCell>
</TableRow>

                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        <div className="w-100 d-flex justify-content-center">
          <button
            type="submit"
            className="confirm-button mt-3"
            onClick={submitEditsession}
          >
            <span className="label-btn">{editMode ? "حفظ" : "تعديل"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SessionsUpdate;
