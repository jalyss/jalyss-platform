import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { fetchOnesession } from "../../../../store/sessions";
import CreateButton from "../../../../components/Commun/buttons/CreateButton";
import { CDBStepper, CDBStep, CDBInput, CDBBtn, CDBContainer } from "cdbreact";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StyledInput from "./../../../../components/Commun/inputs/StyledInput";

const steps = ["Create Tarif", "Add Features availbility"];
function SessionDetail() {
  const sessions = useSelector((state) => state.sessions.session);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sessionsId } = useParams();
  const [active, setActive] = useState(1);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [checkedStates, setCheckedStates] = useState(
    sessions?.SessionHasFeatures?.map(() => false)
  );
  const handleNextPrevClick = (a) => setActive(a);
  console.log("sss", sessions);
  useEffect(() => {
    dispatch(fetchOnesession(sessionsId));
  }, [sessionsId]);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleCheckboxChange = (index) => {
    setCheckedStates((prevStates) =>
      prevStates.map((prevState, i) => (i === index ? !prevState : prevState))
    );
  };
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="d-flex">
            <StyledInput
              label="title"
              className="w-50 m-3"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <StyledInput
              type="number"
              label="Price"
              className="w-50 m-3"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
        );
      case 1:
        return (
          <div className="d-flex flex-wrap gap-5 justify-content-between align-items-start">
          {sessions?.SessionHasFeatures?.map((elem, index) => (
            <div key={index}>
              <div>{elem?.feature?.label}</div>
              <label className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  checked={checkedStates[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
                <span>Available</span>
              </label>
              <label className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  checked={!checkedStates[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
                <span>Not available</span>
              </label>
            </div>
          ))}
        </div>
        );
      default:
        return "Unknown step";
    }
  };
  return (
    <>
      <div className="d-flex">
        <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
          <h2>Session Detail</h2>
          <form className="checkout-form">
            <div className="d-flex flex-wrap justify-content-center">
              <div class="image-upload">
                <img
                  src={sessions?.cover?.path}
                  alt="cover"
                  className="rounded"
                />
              </div>

              <div className="d-flex justify-content-center w-100 m-3">
                <TableContainer className="w-100" component={Paper}>
                  <Table aria-label="simple table">
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell className="fw-bold">title</TableCell>
                        <TableCell>
                          <span> {sessions?.title}</span>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell className="fw-bold">description</TableCell>
                        <TableCell>
                          <span>{sessions?.description}</span>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell className="fw-bold">start-Date</TableCell>
                        <TableCell>
                          <span>{sessions?.startDate?.slice(0, 10)}</span>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell className="fw-bold">End sessions</TableCell>
                        <TableCell>
                          <span>{sessions?.endDate?.slice(0, 10)}</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="fw-bold">
                          Category session:
                        </TableCell>
                        <TableCell>
                          <span className="mt-5">
                            {sessions?.category?.nameEn}
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </form>
        </div>
        <div className="w-100 d-flex justify-content-center align-items-center flex-column m-3 ">
          <div className="d-flex justify-content-end mb-4">
            <CreateButton title="add Tarif " />
          </div>
          <TableContainer className="w-100" component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="fw-bold">Features</TableCell>
                  <TableCell>
                    <span>
                      {" "}
                      {sessions?.SessionHasFeatures?.map((elem) => (
                        <div>{elem?.feature?.label}</div>
                      ))}
                    </span>
                  </TableCell>
                </TableRow>
                {/* <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" >
                      description
                    </TableCell>
                    <TableCell >
                      <span>{sessions?.description}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" >
                      start-Date
                    </TableCell>
                    <TableCell >
                      <span>{sessions?.startDate?.slice(0, 10)}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" >
                      End sessions
                    </TableCell>
                    <TableCell >
                      <span>{sessions?.endDate?.slice(0, 10)}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="fw-bold" >
                      Category session:
                    </TableCell>
                    <TableCell >
                      <span className="mt-5">{sessions?.category?.nameEn}</span>
                    </TableCell>
                  </TableRow> */}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Box
        sx={{
          width: "90%",
          margin: "auto",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}></Typography>
            {getStepContent(activeStep)}

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </>
  );
}

export default SessionDetail;
