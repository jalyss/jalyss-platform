import React, { useState } from "react";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StyledInput from "../components/Commun/inputs/StyledInput";
import { useEffect } from "react";

const steps = ["Create Tarif", "Add Features availbility"];

function TrainingStepper({ sessions }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [active, setActive] = useState(1);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(null);
  const [isChecked, setIsChecked] = useState(false);


  useEffect(() => {
    if (sessions && sessions.SessionHasFeatures) {
      setCheckedStates(sessions.SessionHasFeatures.map(() => false));
    }
  }, [sessions]);
  //   const navigate = useNavigate();
  const handleNextPrevClick = (a) => setActive(a);

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
    <div>
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
    </div>
  );
}

export default TrainingStepper;
