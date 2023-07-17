import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useTranslation } from "react-i18next";
import {
  fetchOneRoom,
  updatechatroomname,
  deleteUser,
  addUser,
} from "../../../store/chatStore";
import { fetchUsers } from "../../../store/user";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import DeleteModal from "../../../components/Commun/Modal";
import { use } from "i18next";

function EditChat() {
  const [name, setName] = useState();
  const [nameEn, setNameEn] = useState();
  const [titles, setTitles] = useState();
  const [titles1, setTitles1] = useState();
  const [basicModalDelete, setBasicModalDelete] = useState(false);
  const [basicModalDeleteid, setBasicModalDeleteid] = useState(false);
  const [basicModalDelete1, setBasicModalDelete1] = useState(false);
  const [basicModalDeleteid1, setBasicModalDeleteid1] = useState(false);
  const [useridd, setUserId] = useState(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { id } = useParams();

  const selecthandle = (value) => {
    setTitles(...(titles + value));
  };

  const oneRoom = useSelector((state) => state.chat.chat);
  const users = useSelector((state) => state.user.users.items);
  console.log(users);
  useEffect(() => {
    dispatch(fetchOneRoom(id));
    dispatch(fetchUsers());
    const updatedTitles = oneRoom?.participants?.map((post) => ({
      value: post.user.fullNameEn,
      label: post.user.fullNameEn,
    }));
    setTitles(updatedTitles);
    const usersData = users?.map((post) => ({
      value: post.id,
      label: post.fullNameEn,
    }));
    setTitles1(usersData);
  }, []);
  const handleSubmit = () => {
    const names = {
      id: id,
      name: name,
    };
    let aux = Object.assign({}, names);
    dispatch(updatechatroomname(aux)).then((res) => {
      if (!res.error) {
        showSuccessToast("chat Edited successful");
        Navigate(-1);
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  async function getParticipantIdsByName(participants, nameToSearch) {
    const foundParticipant = participants.participants.find(
      (participant) => participant.user.fullNameEn === nameToSearch
    );
    let ID = foundParticipant ? foundParticipant.userId : null;

    setBasicModalDeleteid(id);
    setUserId(ID);
    console.log(id, ID, "toggle");
    toggleShowDelete();
  }

  const selecthandlee = async (selectedOptions) => {
    const deletedOption = titles.find(
      (title) => !selectedOptions.find((option) => option.value === title.value)
    );

    // If deletedOption is not undefined, it means an option was removed
    if (deletedOption) {
      getParticipantIdsByName(oneRoom, deletedOption.value);

      // Perform your desired actions with the deletedOption value here
    }
  };

  const selecthandlee1 = async (selectedOptions) => {
    console.log(titles1,'ded')
    const deletedOption = titles1.find(
      (title) => !selectedOptions.find((option) => option.value === title.value)
    );

    // If deletedOption is not undefined, it means an option was removed
    if (deletedOption) {
      console.log(selectedOptions, "rf");
      // getParticipantIdsByName1(oneRoom, selectedOptions.userId);

      // Perform your desired actions with the deletedOption value here
    }
  };
  const toggleShowDelete = () => {
    setBasicModalDelete(!basicModalDelete);
  };
  const toggleShowDelete1 = () => {
    setBasicModalDelete1(!basicModalDelete1);
  };
  const handleDeleteClick = () => {
    const names = {
      userId: useridd,
      chatRoomId: id,
    };
    let aux = Object.assign({}, names);
    console.log(aux, "ee");
    dispatch(
      deleteUser({
        userId: useridd,
        chatRoomId: id,
      })
    ).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("user has been deleted");
        dispatch(fetchOneRoom(id));
        setBasicModalDelete(false);
      }
    });
  };
  const handleDeleteClick1 = () => {
    const names = {
      userId: useridd,
      chatRoomId: id,
    };
    let aux = Object.assign({}, names);
    console.log(aux, "ee");
    dispatch(
      deleteUser({
        userId: useridd,
        chatRoomId: id,
      })
    ).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("user has been deleted");
        dispatch(fetchOneRoom(id));
        setBasicModalDelete(false);
      }
    });
  };
  return (
    <div className="container">
      <DeleteModal
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
      />
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
      <div className="card">
        <div className="container">
          <div class="row">
            <div class="form-group col-6 mt-3">
              <label>Sender</label>
              <input
                type="text"
                class="form-control"
                placeholder={oneRoom?.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="form-group col-6 mt-3">
              <label>Participants</label>
              <Select
                onChange={selecthandlee}
                placeholder="Search by users"
                options={titles}
                isMulti
              />
            </div>
          </div>
          <div class="row">
            <div class="form-group col-6 mt-3">
              <label>Participants</label>
              <Select
                onChange={selecthandlee1}
                placeholder="Search by users"
                options={titles1}
                isMulti
              />
            </div>
          </div>
          <div className="w-100 d-flex justify-content-center">
            <button
              type="submit"
              onClick={() => handleSubmit()}
              className="confirm-button mt-5   mb-3"
            >
              <span className="label-btn"> Edit chat </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditChat;
