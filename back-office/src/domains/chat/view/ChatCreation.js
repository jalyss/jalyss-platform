import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useTranslation } from "react-i18next";
import { createChatRoom,findAllRooms } from "../../../store/chatStore";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { fetchUsers } from "../../../store/user";

function CreateChat() {
  const [nameAr, setNameAr] = useState();
  const [text, setText] = useState();
  const [nameEn, setNameEn] = useState();
  const [titles1, setTitles1] = useState();
  const [usersId, setUserId] = useState([]);

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { t, i18n } = useTranslation()
  const users = useSelector((state) => state.user.users.items);
useEffect(()=>{
  dispatch(fetchUsers());

  const usersData = users?.map((post) => ({
    value: post.id,
    label: post.fullNameEn,
    id: post.id,
  }));
  setTitles1(usersData);
},[])

const handleSubmit = () => {
  const names = {
    nameAr: nameAr,
    nameEn: nameEn
  };

  let aux = Object.assign({}, names);
  dispatch(createChatRoom(aux)).then((res) => {
    if (!res.error) {
      showSuccessToast("category created");
      dispatch(findAllRooms());
      Navigate(-1);
    } else {
      showErrorToast(res.error.message);
    }
  });
};

const handleCreateClick = () => {
  console.log("first")
  const names = {
    name: nameAr,
    receiverId: usersId, 
    text: text,
    
  };
  let aux = Object.assign({}, names);
  dispatch(createChatRoom(aux)).then((res) => {
    if (!res.error) {
      showSuccessToast("category created");
      dispatch(findAllRooms());
      // Navigate(-1);
    } else {
      showErrorToast(res.error.message);
    }
  });
};

  const selecthandlee1 = async (selectedOptions) => {
    const deletedOption = titles1.find(
      (title) => !selectedOptions.find((option) => option.value === title.value)
    );

    // If deletedOption is not undefined, it means an option was removed
    if (deletedOption) {
      const selectedIds = selectedOptions.map((option) => option.id);
      setUserId(selectedIds);
      console.log(usersId)
      // getParticipantIdsByName1(oneRoom, selectedOptions.userId);

      // Perform your desired actions with the deletedOption value here
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="container">
          <div class="row">
            <div class="form-group col-6 mt-3">
              <label>Name</label>
              <input
                type="text"
                class="form-control"
                onChange={(e)=>setNameAr(e.target.value)}
                placeholder="NameAr"
              />
            </div>
            <div class="form-group col-6 mt-3">
              <label>Add Participants</label>
              <Select
                placeholder="Search by users"
                onChange={selecthandlee1}

                options={titles1}
                isMulti
              />
            </div>
          </div>
          <div class="row">
            <div class="form-group col-6 mt-3">
              <label>Text</label>
              <input
                type="text"
                class="form-control"
                onChange={(e)=>setText(e.target.value)}
                placeholder="NameAr"
              />
            </div>
  
          </div>
          <div className="w-100 d-flex justify-content-center">
            <button
              type="submit"
              onClick={() => handleCreateClick()}
              className="confirm-button mt-5   mb-3"
            >
              <span className="label-btn"> Add chat Room </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateChat;
