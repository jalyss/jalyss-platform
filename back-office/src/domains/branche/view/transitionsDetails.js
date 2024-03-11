import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EditModal from "../../../components/Commun/Modal";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { fetchTransition, editTransition } from "../../../store/transition";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

function DetailTransition() {
  const transition = useSelector((state) => state.transition.transition);
  const [editTransitionData, setEditTransitionData] = useState(null);
  const [basicModalDelete, setBasicModalDelete] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [renderEditView, setRenderEditView] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTransition(id));
  }, [dispatch, id]);

  useEffect(() => {
    setEditTransitionData({ ...transition });
  }, [transition]);

  const toggleView = () => {
    setRenderEditView(!renderEditView);
  };

  const handleSubmit = async () => {
    const { reason, status } = { ...editTransitionData };
    const body = {
      reason,
      status,
    };
    try {
      const editedTransition = { ...body, id };
      dispatch(editTransition(editedTransition));
      showSuccessToast("Transition edited successfully");
      navigate(-1);
    } catch (error) {
      console.error("Error editing transition:", error);
      showErrorToast(error.message);
    }
  };

  const toggleShowDelete = () => {
    setBasicModalDelete(!basicModalDelete);
  };

  const onCancelToggleShowDelete = () => {
    setBasicModalDelete(!basicModalDelete);
    setRenderEditView(false);
  };

  return (
    <Box sx={{ maxWidth: "90%", height: "100%", margin: "auto" }}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Transition Details</Typography>
              <Typography>ID: {transition?.id}</Typography>
              <Typography>
                Branch Sender: {transition?.branchSender?.name}
              </Typography>
              <Typography>
                Branch Receiver: {transition?.branchReceiver?.name}
              </Typography>
              <Typography>
                Article:{" "}
                {transition?.mvtArticle
                  .map((e) => e.article.title)
                  .join(", ")}
              </Typography>
              <Typography>
                Quantity:{" "}
                {transition?.mvtArticle.map((e) => e.quantity).join(", ")}
              </Typography>
              <Typography>Status: {transition?.status}</Typography>
              <Typography>Reason: {transition?.reason}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Images</Typography>
              <Box
  sx={{
    display: "flex",
    flexDirection: "row",
    // flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  }}
>
                {editTransitionData?.mvtArticle?.map((e, i) => (
                  <Box
                  key={i}
                  sx={{
                    flexBasis: "50%",
                    boxSizing: "border-box",
                  }}
                  >
                  <img
                    key={i}
                    src={
                      e
                        ? e?.article?.cover?.path
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4sEG5g9GFcy4SUxbzWNzUTf1jMISTDZrTw&usqp=CAU"
                    }
                    alt={`Article ${i + 1}`}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "8px",
                      filter: "blur(0.5px)",
                      margin: "8px",
                    }}
                  />
                      </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">
                {renderEditView ? "Update Transition:" : ""}
              </Typography>
              {/* Input fields for updates */}
              {renderEditView && (
                <>
                  <select
                    className="form-select mt-2"
                    aria-label="Default select example"
                    value={editTransitionData.articleId}
                    onChange={(e) => {
                      setEditTransitionData({
                        ...editTransitionData,
                        status: e.target.value,
                      });
                    }}
                  >
                    <option value="">Select status</option>
                    <option key={"1"}>delivered</option>
                    <option key={"2"}>pending</option>
                    <option key={"3"}>refused</option>
                  </select>
                  <TextField
                    label="Reason"
                    value={editTransitionData?.reason || ""}
                    onChange={(e) => {
                      setEditTransitionData({
                        ...editTransitionData,
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
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#8a2be2",
                      },
                      "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#8a2be2",
                      },
                    }}
                  />
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                {renderEditView ? (
                  <Button
                    onClick={toggleShowDelete}
                    variant="contained"
                    color="primary"
                  >
                    Save Transition
                  </Button>
                ) : (
                  <Button
                    onClick={toggleView}
                    variant="contained"
                    color="primary"
                  >
                    Update Transition
                  </Button>
                )}
              </Box>
            </Grid>
            </Grid>
          </CardContent>
      </Card>
      <EditModal
        toggleShow={onCancelToggleShowDelete}
        basicModal={basicModalDelete}
        setBasicModal={setBasicModalDelete}
        normal={true}
        ofDelete={!true}
        title={
          <div style={{ width: "200%", marginLeft: "100%" }}>
            <Typography variant="h6">Are you sure?</Typography>
          </div>
        }
        body={
          <Typography>
            You want to edit this provider?
          </Typography>
        }
        fn={handleSubmit}
      />
    </Box>
  );
}

export default DetailTransition;
