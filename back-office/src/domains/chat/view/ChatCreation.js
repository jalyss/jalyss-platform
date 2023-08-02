import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useTranslation } from "react-i18next";
import {
  fetchOneRoom,
  updateChatRoom,
  deleteUser,
  addUser,
  createChatRoomGroup,
} from "../../../store/chatStore";
import { fetchUsers } from "../../../store/user";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import DeleteModal from "../../../components/Commun/Modal";

function CreateChatRoom() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const oneRoom = useSelector((state) => state.chat.chat);
  const users = useSelector((state) => state.user.users.items);
  const [userList, setUserList] = useState([]);
  const [value, setValue] = useState([]);
  const [name, setName] = useState("");

 

  useEffect(() => {
    // dispatch(fetchOneRoom(id));
    dispatch(fetchUsers());
  }, []);
  // useEffect(() => {
  //    if (oneRoom) {
  //     setName(oneRoom.name);
  //     setValue(
  //       oneRoom.participants.map((participant) => ({
  //         value: participant.userId,
  //         label: participant.user.fullNameEn,
  //       }))
  //     );
  //   }
  // }, [oneRoom]);
  useEffect(() => {
    if (users.length) {
      let auxUser = [];
      for (let i = 0; i < users.length; i++) {
        let response = false;
        for (let j = 0; j < value.length; j++) {
          if (value[j].value === users[i].id) {
            response = true;
          }
        }
        if (!response) {
          auxUser = [...auxUser, users[i]];
        }
        console.log(response);
      }
      console.log(auxUser);
      setUserList(
        auxUser.map((user) => ({ value: user.id, label: user.fullNameEn }))
      );
    }
  }, [users, value]);

  const handleSubmit = () => {
    const aux = {
      name: name,
      participants:value
    };
    
    dispatch(createChatRoomGroup(aux)).then((res) => {
      if (!res.error) {
        showSuccessToast("chat Edited successful");
        navigate(-1);
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

 

  return (
    <div className="container">
      <div className="card">
        <div className="container">
          <div class="row">
            <div class="form-group col-6 mt-3">
              <label>Chat Group Name</label>
              <input
                type="text"
                class="form-control"
                value={name}
                placeholder='chat group name'
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="form-group col-6 mt-3">
              <label>Participants</label>
              <Select
                onChange={(e) => {
                  console.log(e);
                  setValue(e);
                }}
                placeholder="Search by users"
                options={userList}
                value={value}
                isMulti
              />
            </div>
          </div>
          <div class="row">
            {}
            <div></div>
            {/* 
            <div class="form-group col-6 mt-3">
              <label>Participants</label>
              <Select
                onChange={(e)=>console.log(e)}
                placeholder="Search by users"
                options={users}
                isMulti
              />
            </div>*/}
          </div>

          <div className="w-100 d-flex justify-content-center">
            <button
              type="submit"
              onClick={() => handleSubmit()}
              className="confirm-button mt-5   mb-3"
            >
              <span className="label-btn"> Create chat group </span>
            </button>
          </div>
        </div>
      </div>
      {/* <addModal
        toggleShow={toggleShowDelete1}
        basicModal={basicModalDelete1}
        setBasicModal={setBasicModalDelete1}
        normal={!true}
        ofDelete={true}
        bodOfDelete={
          <div className="d-flex justify-content-center align-items-center">
            You want to add this user ?
          </div>
        }
        confirm={() => {
          handleDeleteClick();
        }}
      /> */}
      {/* <DeleteModal
        toggleShow={toggleShowDelete}
        basicModal={basicModalDelete}
        setBasicModal={setBasicModalDelete}
        normal={!true}
        ofDelete={true}
        bodOfDelete={
          <div className="d-flex justify-content-center align-items-center">
            You want to Delete this Publishing house ?
          </div>
        }
        confirm={() => {
          handleDeleteClick();
        }}
      /> */}
    </div>
  );
}

export default CreateChatRoom;