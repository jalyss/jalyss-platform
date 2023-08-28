import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EditModal from "../../../components/Commun/Modal";

import { Box, Button, CardContent, TextField, Typography } from "@mui/material";
import { fetchTransition, editTransition } from "../../../store/transition";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

function Detailtransition() {
  const transition = useSelector((state) => state.transition.transition);
  const [edittransitionData, setEdittransitionData] = useState(null);
  const [basicModalDelete, setBasicModalDelete] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [renderEditView, setRenderEditView] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchTransition(id));
  }, [dispatch, id]);

  useEffect(() => {
    setEdittransitionData({ ...transition });
  }, [transition]);

  const toggleView = () => {
    setRenderEditView(!renderEditView);
  };

  const handleSubmit = async () => {
    const { reason, status } = { ...edittransitionData };
    const body = {
      reason,
      status,
    };
    try {
      const editedtransition = { ...body, id };
      dispatch(editTransition(editedtransition));
      showSuccessToast("transition edited successfully");
      navigate(-1);
    } catch (error) {
      console.error("Error editing transition:", error);
      showErrorToast(error.message);
    }
  };
  const toggleShowDelete = () => {
    setBasicModalDelete(!basicModalDelete);
  };
  const onCanceltoggleShowDelete = (id) => {
    setBasicModalDelete(!basicModalDelete);
    setRenderEditView(false);
  };

  return (
    <Box sx={{ maxWidth: "90%", height: "100%", margin: "auto" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
            height: "100%",
          }}
        >
          <Box sx={{ flexBasis: "45%", my: 3, ml: 5 }}>
            {!renderEditView ? (
              <>
                <div className="table-container">
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
                      ID:
                    </span>
                    <span style={{ display: "table-cell" }}>
                      {transition?.id}
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
                      branch Sender:
                    </span>
                    <span style={{ display: "table-cell" }}>
                      {transition?.branchSender?.name}
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
                      branch receiver:
                    </span>
                    <span style={{ display: "table-cell" }}>
                      {transition?.branchReceiver?.name}
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
                      article:
                    </span>
                    <span style={{ display: "table-cell" }}>
                      {transition?.mvtArticle
                        .map((e) => e.article.title)
                        .join(", ")}
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
                      Quantity:
                    </span>
                    <span style={{ display: "table-cell" }}>
                      {transition?.mvtArticle.map((e) => e.quantity).join(", ")}
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
                      Status:
                    </span>
                    <span style={{ display: "table-cell" }}>
                      {transition?.status}
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
                      Reason:
                    </span>
                    <span style={{ display: "table-cell" }}>
                      {transition?.reason}
                    </span>
                  </Typography>
                </div>
              </>
            ) : (
              <>
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
                    ID:
                  </span>
                  <span style={{ display: "table-cell" }}>
                    {transition?.id}
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
                    branch Sender:
                  </span>
                  <span style={{ display: "table-cell" }}>
                    {transition?.branchSender?.name}
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
                    branch receiver:
                  </span>
                  <span style={{ display: "table-cell" }}>
                    {transition?.branchReceiver?.name}
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
                      article:
                    </span>
                    <span style={{ display: "table-cell" }}>
                      {transition?.mvtArticle
                        .map((e) => e.article.title)
                        .join(", ")}
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
                    Quantity:
                  </span>
                  <span style={{ display: "table-cell" }}>
                    {transition?.mvtArticle.map((e) => e.quantity).join(", ")}
                  </span>
                </Typography>
                <select
                  className="form-select mt-2"
                  aria-label="Default select example"
                  value={transition.articleId}
                  onChange={(e) => {
                    setEdittransitionData({
                      ...edittransitionData,
                      status: e.target.value,
                    });
                  }}
                >
                  <option value="">Select status</option>
                  <option key={"1"}>delivered </option>
                  <option key={"1"}>pending</option>
                  <option key={"1"}>refused</option>
                </select>
                <TextField
                  label="Reason"
                  value={edittransitionData?.reason || ""}
                  onChange={(e) => {
                    setEdittransitionData({
                      ...edittransitionData,
                      reason: e.target.value,
                    });
                  }}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    style: {
                      color: "#4b0082",
                    },
                  }}
                  sx={{
                    color: "#8a2be2",
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#8a2be2",
                      },
                    "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#8a2be2",
                      },
                  }}
                />
              </>
            )}
          </Box>

          <Box
            sx={{
              flexBasis: "45%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              position: "relative",
              mr: 5,
            }}
          >
            <div
              className="position-relative"
              style={{ height: "55%", width: "80%" }}
            >
              {edittransitionData?.mvtArticle?.map((e, i) => {
                return (
                  <img
                    className="img-fluid mt-1"
                    src={
                      e
                        ? e?.article?.cover?.path
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4sEG5g9GFcy4SUxbzWNzUTf1jMISTDZrTw&usqp=CAU"
                    }
                    alt="Card image cap"
                    style={{
                      height: "50%",
                      width: "50%",
                      borderRadius: "8px",
                      filter: "blur(0.5px)",
                    }}
                  />
                );
              })}
            </div>
          </Box>
        </Box>
      </CardContent>
      <Box display="flex" justifyContent="center" mt={9}>
        {renderEditView ? (
          <Button
            onClick={() => {
              toggleShowDelete();
            }}
            variant="contained"
            color="primary"
          >
            Save transition
          </Button>
        ) : (
          <Button
            onClick={() => {
              toggleView();
            }}
            variant="contained"
            color="primary"
          >
            Update transition
          </Button>
        )}
      </Box>
      <EditModal
        toggleShow={onCanceltoggleShowDelete}
        basicModal={basicModalDelete}
        setBasicModal={setBasicModalDelete}
        normal={true}
        ofDelete={!true}
        title={
          <div
            style={{ width: "200%", marginLeft: "100%" }}
            className="d-flex justify-content-center text-align-center"
          >
            Are you sure !
          </div>
        }
        body={
          <div className="d-flex justify-content-center align-items-center">
            You want to edit this proider ?
          </div>
        }
        fn={() => {
          handleSubmit();
        }}
      />
    </Box>
  );
}

export default Detailtransition;
