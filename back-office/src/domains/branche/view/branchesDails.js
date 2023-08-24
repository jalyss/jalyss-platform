import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useTranslation } from "react-i18next";
import { fetchBranche, editBranch } from "../../../store/branche";
import { useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import EditModal from "../../../components/Commun/Modal";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";

import {
  fetchTransitions,
  removeTransition,
  findTransitionsByBranchId,
} from "../../../store/transition";
function EditBranche() {
  const [renderEditView, setRenderEditView] = useState(false);
  const branche = useSelector((state) => state.branche.branche);
  const transitions = useSelector(
    (state) => state.transition.transitions.items
  );
  const [editBrancheData, seteditBrancheData] = useState(null);
  const [basicModalDelete, setBasicModalDelete] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("");
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { typeId } = useParams();
  const [params, setParams] = useState({ skip: 0, take: 10 });

  useEffect(() => {
    dispatch(fetchBranche(typeId));
  }, []);

  useEffect(() => {
    seteditBrancheData({ ...branche });
  }, [branche]);
  useEffect(() => {
    dispatch(findTransitionsByBranchId(typeId));
  }, [typeId, dispatch]);
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
  const columns = [
    {
      field: "branch Sender",
      headerName: "branch Sender",
      width: 150,
      editable: false,
      valueGetter: (params) => `${params.row.branchSender?.name}`,
    },
    {
      field: "branch reciever",
      headerName: "branch Reciever",
      width: 150,
      editable: false,
      valueGetter: (params) => `${params.row.branchReceiver?.name}`,
    },
    {
      field: "article",
      headerName: "Article",
      width: 150,
      editable: false,
      valueGetter: (params) =>
        `${params.row.mvtArticle.map((e) => e.article.title).join(", ")}`,
    },

    {
      field: "Quantity",
      headerName: "Quantity",
      width: 150,
      valueGetter: (params) =>
        `${params.row.mvtArticle.map((e) => e.quantity).join(", ")}`,
    },
    {
      field: "status",
      headerName: "status",
      width: 150,
      editable: false,
    },
    {
      field: "reason",
      headerName: "reason",
      width: 150,
      editable: false,
    },
  ];

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
           <div className="container">
  <div className="row">
    <div className="col-md-6 mt-3">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        className="form-control"
        id="name"
        placeholder="Name"
        value={editBrancheData?.name || ""}
        onChange={(e) => {
          seteditBrancheData({
            ...editBrancheData,
            name: e.target.value,
          });
        }}
      />
    </div>
    <div className="col-md-6 mt-3">
      <label htmlFor="mainBranch">Main Branch</label>
      <input
        type="text"
        className="form-control"
        id="mainBranch"
        placeholder="Main Branch"
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

  <div className="row">
    <div className="col-md-6 mt-3">
      <label htmlFor="identifier">Identifier</label>
      <input
        type="text"
        className="form-control"
        id="identifier"
        placeholder="Identifier"
        value={editBrancheData?.identifier || ""}
        onChange={(e) => {
          seteditBrancheData({
            ...editBrancheData,
            identifier: e.target.value,
          });
        }}
      />
    </div>
    <div className="col-md-6 mt-3">
      <label htmlFor="address">Address</label>
      <input
        type="text"
        className="form-control"
        id="address"
        placeholder="Address"
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

  <div className="w-100 d-flex justify-content-center mt-5">
    <button
      type="submit"
      onClick={() => toggleShowDelete()}
      className="btn btn-primary"
    >
      Save Changes
    </button>
  </div>
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

      <Box sx={{ height: "auto", width: "90%" }}>
        <DataGrid
          rows={transitions}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: params.take,
              },
            },
          }}
          onPaginationModelChange={(e) => {
            setParams({ ...params, take: +e.pageSize * (+e.page + 1) });
          }}
          pageSizeOptions={[5, 20, 50]}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}

export default EditBranche;
