import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const useForm = (initialState, validate) => {
  const [formData, setFormData] = useState(initialState);
  // console.log("initialState", initialState);
  const [errors, setErrors] = useState({});
  // Set form data and errors
  const setDataAndErrors = useCallback(
    (data) => {
      setFormData(data);
      let errors = validate(data);
      setErrors(errors);
    },
    [validate]
  );

  // Change input handler
  const changeHandler = useCallback(
    (e) => {
      let updatedData;
      if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
        updatedData = {
          ...formData,
          [e.target.name]: {
            ...formData[e.target.name],
            value: e.target.checked,
            touched: true,
          },
        };
      } else if (e.target.tagName === "INPUT" && e.target.type === "file") {
        updatedData = {
          ...formData,
          [e.target.name]: {
            ...formData[e.target.name],
            value: e.target.files,
            touched: true,
          },
        };
      } else {
        updatedData = {
          ...formData,
          [e.target.name]: {
            ...formData[e.target.name],
            value: e.target.value,
            touched: true,
          },
        };
      }
      setDataAndErrors(updatedData, e.target.name);
    },
    [setDataAndErrors, formData]
  );
  return {
    formData,
    errors,
    changeHandler,
    setErrors,
  };
};
export default useForm;
