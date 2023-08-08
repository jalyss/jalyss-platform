import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useTranslation } from "react-i18next";
import { fetchBranche, editBranch } from "../../../store/branche";
import { useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import EditModal from "../../../components/Commun/Modal";

function EditBranche() {
  const [renderEditView, setRenderEditView] = useState(false);
  const branche = useSelector((state) => state.branche.branche);
  const [editBrancheData, seteditBrancheData] = useState(null);
  const [basicModalDelete, setBasicModalDelete] = useState(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { typeId } = useParams();

  useEffect(() => {
    dispatch(fetchBranche(typeId));
  }, []);

  useEffect(() => {
    seteditBrancheData({ ...branche });
  }, [branche]);

  const toggleShow = () => {
    setRenderEditView(!renderEditView);
  };

  const handleSubmit = () => {
    const names = {
      ...editBrancheData,
    };
    let aux = Object.assign({}, names);
    dispatch(editBranch(aux)).then((res) => {
      if (!res.error) {
        showSuccessToast("Branche Edited successful");
        Navigate(-1);
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  const toggleShowDelete = (id) => {
    setBasicModalDelete(!basicModalDelete);
  };
  const onCanceltoggleShowDelete = (id) => {
    setBasicModalDelete(!basicModalDelete);
    setRenderEditView(false);
  };
  return (
    <div className="container">
      <div className="card">
        <div className="container">
          {!renderEditView ? (
            <>
              <div
                class="row"
                style={{ marginBottom: "10px", marginTop: "50px" }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <Typography
                    style={{
                      fontFamily: "Arial",
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#333",
                      display: "table-row",
                    }}
                  >
                    <span
                      style={{
                        display: "table-cell",
                        fontSize: "large",
                        paddingRight: "40px",
                      }}
                    >
                      Name :
                    </span>
                    <span style={{ display: "table-cell" }}>
                      {editBrancheData?.name}
                    </span>
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Arial",
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#333",
                      display: "table-row",
                    }}
                  >
                    <span
                      style={{
                        display: "table-cell",
                        fontSize: "large",
                        paddingRight: "40px",
                      }}
                    >
                      Main Branch:
                    </span>
                    <span style={{ display: "table-cell" }}>
                      {editBrancheData?.mainBranch &&
                        editBrancheData?.mainBranch.toString()}
                    </span>
                  </Typography>
                </div>
              </div>
              <div
                class="row"
                style={{ marginBottom: "10px", marginTop: "50px" }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <Typography
                    style={{
                      fontFamily: "Arial",
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#333",
                      display: "table-row",
                    }}
                  >
                    <span
                      style={{
                        display: "table-cell",
                        fontSize: "large",
                        paddingRight: "40px",
                      }}
                    >
                      Identifier :
                    </span>
                    <span style={{ display: "table-cell" }}>
                      {editBrancheData?.identifier}
                    </span>
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Arial",
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#333",
                      display: "table-row",
                    }}
                  >
                    <span
                      style={{
                        display: "table-cell",
                        fontSize: "large",
                        paddingRight: "40px",
                      }}
                    >
                      Address:
                    </span>
                    <span style={{ display: "table-cell" }}>
                      {editBrancheData?.address}
                    </span>
                  </Typography>
                </div>

                <div className="w-100 d-flex justify-content-center">
                  <button
                    type="submit"
                    onClick={() => toggleShow()}
                    className="confirm-button mt-5   mb-3"
                  >
                    <span className="label-btn"> Edit branche </span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div class="row">
                <div class="form-group col-6 mt-3">
                  <label>Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="name"
                    value={editBrancheData?.name || ""}
                    onChange={(e) => {
                      seteditBrancheData({
                        ...editBrancheData,
                        name: e.target.value,
                      });
                    }}
                  />
                </div>
                <div class="form-group col-6 mt-3">
                  <label>Main Branch</label>
                  <input
                    placeholder={editBrancheData?.mainBranch}
                    type="text"
                    class="form-control"
                    value={editBrancheData?.mainBranch}
                    onChange={(e) => {
                      const value = e.target.value.toLowerCase();
                      seteditBrancheData({
                        ...editBrancheData,
                        mainBranch: value === "true",
                      });
                    }}
                  />
                </div>
              </div>

              <div class="row">
                <div class="form-group col-6 mt-3">
                  <label>Identifier</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="name"
                    value={editBrancheData?.identifier || ""}
                    onChange={(e) => {
                      seteditBrancheData({
                        ...editBrancheData,
                        identifier: e.target.value,
                      });
                    }}
                  />
                </div>
                <div class="form-group col-6 mt-3">
                  <label>Address</label>
                  <input
                    placeholder={editBrancheData?.Address}
                    type="text"
                    class="form-control"
                    value={editBrancheData?.address || ""}
                    onChange={(e) => {
                      seteditBrancheData({
                        ...editBrancheData,
                        address: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="w-100 d-flex justify-content-center">
                <button
                  type="submit"
                  onClick={() => toggleShowDelete()}
                  className="confirm-button mt-5   mb-3"
                >
                  <span className="label-btn"> Save changes </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <EditModal
        toggleShow={onCanceltoggleShowDelete}
        basicModal={basicModalDelete}
        setBasicModal={setBasicModalDelete}
        normal={true}
        ofDelete={!true}
        title={
          <div
            style={{ width: "200%", marginLeft: "100%" }}
            className="d-flex justify-content-center align-items-center"
          >
            Are you sure !
          </div>
        }
        body={
          <div className="d-flex justify-content-center align-items-center">
            You want to edit this Branche ?
          </div>
        }
        fn={() => {
          handleSubmit();
        }}
      />
    </div>
  );
}

export default EditBranche;
