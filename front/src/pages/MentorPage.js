import React, { Fragment, useState } from "react";
import one from "../img/mentor6.png";
import two from "../img/mentor4.png";
import success from "../img/success.png";
import { useDispatch, useSelector } from "react-redux";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { DropzoneArea } from "material-ui-dropzone";
import AutoCompleteFilter from "./../components/Commun/AutoCompleteFilter";
import { createRequest } from "../store/mentorRequest";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import axios from "axios";
import ReactDOM from "react-dom";
import CloseButton from "./../components/Commun/buttons/CloseButton";

function MentorPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const categoriesStore = useSelector((state) => state.category);
  const { categories } = categoriesStore;
  const [categoryId, setCategoryId] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);

  const [shown, setShown] = useState(false);
  const [formValidated, setFormValidated] = useState(false);
  const [submitCheck,setSubmitCheck] = useState(false);

  const me = useSelector((state) => state.auth.me);

  const dispatch = useDispatch();
  const useStyles = makeStyles((theme) =>
    createStyles({
      previewChip: {
        minWidth: 160,
        maxWidth: 210,
      },
    })
  );

  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitCheck(true)
    const form = e.target;
    console.log("form",form);
    const isFormValid =
      form.checkValidity() && categoryId.length > 0 && pdfFile !== undefined;
console.log("isformvalid",isFormValid);
console.log("pdfFile",pdfFile);
    if (isFormValid) {
      let body = {
        content: categoryId.join(),
      };

      try {
    setFormValidated(true);

        const formData = new FormData();
        formData.append("file", pdfFile);

        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/upload`,
          formData
        );

        body.resumeId = response.data.id;

        dispatch(createRequest(body)).then((res) => {
          if (!res.error) {
            showSuccessToast("Request has been posted");
            setFormSubmitted(true);
          } else {
            showErrorToast(res.error.message);
          }
        });
      } catch (error) {
        console.error("Error uploading resume file:", error);
      }
    }
  };

  const handleDropzoneChange = (files) => {
    setPdfFile(files[0]);
    // setFormValidated(true);
  };

  const modalBody = () => (
    <div
      style={{
        backgroundColor: "#fff",
        left: 0,
        position: "fixed",
        top: 0,
        height: "100%",
        width: "100%",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {pdfFile && (
        <embed
          src={URL.createObjectURL(pdfFile)}
          type="application/pdf"
          frameBorder="0"
          scrolling="auto"
          height="100%"
          width="100%"
        ></embed>
      )}

      <CloseButton onClick={() => setShown(false)} fs="20px" />
    </div>
  );

  return (
    <Fragment>
      <div
        className="d-flex justify-content-between align-items-end "
        style={{ backgroundColor: "#fafafa", minHeight: "" }}
      >
        <img
          src={one}
          className="img-fluid mentor6"
          style={{ width: "20%", height: "400px" }}
          alt="Mentor 6"
        />
        <div className="container m-3">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-9 col-md-12"  >
              <div id="regForm">
                <h1 id="register">{!formSubmitted ? "Request Mentor" : ""}</h1>
                {formSubmitted ? (
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <img src={success} alt="success" className="mb-4" />
                    <h3>Thank you for submitting your request!</h3>
                    <span>
                      Your information has been saved! We will contact you
                      shortly!
                    </span>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="d-flex flex-column justify-content-center"
                  >
                    <div className="d-flex flex-wrap  mt-5">
                      <AutoCompleteFilter
                        data={categories.items}
                        valueOptionName="id"
                        labelOptionName="nameEn"
                        label="Filter by Category"
                        onChange={setCategoryId}
                        required
                      />
                    
                    </div>
                    {!formValidated && categoryId.length === 0 && submitCheck &&(
                        <div className="text-danger">
                          Please select a category.
                        </div>
                      )}
                    <div className="mt-4">
                      <label htmlFor="formFileLg" className="form-label">
                        Upload your Resume
                      </label>
                      <DropzoneArea
                        showPreviews={true}
                        showPreviewsInDropzone={false}
                        useChipsForPreview
                        previewGridProps={{
                          container: { spacing: 1, direction: "row" },
                        }}
                        previewChipProps={{
                          classes: { root: classes.previewChip },
                        }}
                        previewText="Selected files"
                        onChange={handleDropzoneChange}
                        required
                      />
                      {!formValidated && pdfFile === undefined && submitCheck && (
                        <div className="text-danger">
                          Please upload your resume.
                        </div>
                      )}
                      <div className="d-flex align-items-center gap-3 mt-3">
                        <p className="card-text m-0">
                          <span className="text-muted">Resume:</span>{" "}
                        </p>
                        {pdfFile ? (
                          <CloseButton
                            title="View Your Resume "
                            onClick={(event) => {
                              event.preventDefault();
                              setShown(true);
                            }}
                          />
                        ) : (
                          "no Resume"
                        )}
                      </div>
                    </div>

                    {shown &&
                      ReactDOM.createPortal(modalBody(), document.body)}

                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <button
                        type="submit"
                        className="full"
                        style={{
                          backgroundColor: "#48184c",
                          marginTop: "36px",
                          color: "#fff",
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
        <img
          src={two}
          className="mentor4"
          style={{ width: "30%", height: "350px" }}
          alt="Mentor 4"
        />
      </div>
    </Fragment>
  );
}

export default MentorPage
