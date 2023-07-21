import React, { useEffect, useState } from "react";

import CreateButton from "../../../../components/Commun/buttons/CreateButton";

import Featuress from "../../../../components/Featuress";
import StyledInput from './../../../../components/Commun/inputs/StyledInput';
import { useDispatch } from "react-redux";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import { CreateFeature } from "../../../../store/tarifss";

function Features() {
  const [label, setLabel] = useState("");
  const [showInput, setShowInput] = useState(false);
  const dispatch=useDispatch()
  const addFea =()=>{
    dispatch(CreateFeature({label})).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("Features has been deleted");
      }
    })
    .catch((error) => {
      showErrorToast(error.message);
    });
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addFea();
      setLabel("")
      setShowInput(false)
    }
  };
  return (
    <div className="mx-5">
      <div className="d-flex">
        <CreateButton title={"add new feature"} mt={20} mb={20}  onClick={()=>{setShowInput(!showInput)}}/>
       <div style={{marginTop:20}}>  {showInput && <StyledInput label="Label" onKeyDown={handleKeyDown} onChange={(e)=>{setLabel(e.target.value)}}/> }</div>
    

      </div>
      <Featuress />
    </div>
  );
}
export default Features;
