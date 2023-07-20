import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editReq, fetchOnesessionReq } from "../../../../store/sessions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CloseButton from "../../../../components/Commun/buttons/CloseButton";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import { editUser } from "../../../../store/user";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  height: "85%", // You can adjust the height as needed
  bgcolor: "background.paper",
  boxShadow: 24,
};

const iframeStyle = {
  width: "100%",
  height: "100%",
  border: "none",
};
function DetailRequest() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const oneRequestStore = useSelector((state) => state.sessions);
  const { request } = oneRequestStore;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    dispatch(fetchOnesessionReq(id));
  }, [id]);

  console.log("rr", request);

  const refusefunc = () => {
    const args = { id, status: { status: "refused" } };
    dispatch(editReq(args)).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("Request has been Refused");
        navigate(-1);
      }
    });
  };
  const confirmfunc = async () => {
    await dispatch(editUser({ id: request?.user.id, isCoach: true }));
    const args = { id, status: { status: "confirmed" } };
    dispatch(editReq(args)).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("Request has been Accepted");
        navigate(-1);
      }
    });
  };

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <h2>Request</h2>
      <form className="checkout-form">
        <div className="d-flex flex-wrap justify-content-center">
          <div className="image-upload">
            <img src={request?.user?.avatar?.path} alt="avatar" />
          </div>

          <div className="d-flex justify-content-center w-100 m-3">
            <TableContainer className="w-100" component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold">Name:</TableCell>
                    <TableCell>
                      <span>{request?.user?.fullNameEn}</span>
                    </TableCell>
                    <TableCell className="fw-bold">Email:</TableCell>
                    <TableCell>
                      <span>{request?.user?.email}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold">Phone:</TableCell>
                    <TableCell>
                      <span>{request?.user?.tel}</span>
                    </TableCell>
                    <TableCell className="fw-bold">Address:</TableCell>
                    <TableCell>
                      <span>{request?.user?.address}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="center">
                      Resume:
                    </TableCell>
                    <TableCell align="center">
                      <CloseButton
                        modifTitle="View Resume"
                        onClick={handleOpen}
                        type="button"
                      />
                    </TableCell>
                  </TableRow>
                  {request?.status === "pending" ? (
                    <TableRow>
                      <TableCell>
                        <button
                          type="button"
                          class="btn btn-success"
                          onClick={confirmfunc}
                        >
                          Accept
                        </button>
                      </TableCell>

                      <TableCell>
                        <button
                          type="button"
                          class="btn btn-danger"
                          onClick={refusefunc}
                        >
                          Refuse
                        </button>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <div
                      className="form-group"
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                      }}
                    >
                      <button
                        type="button"
                        className={`btn ${
                          request?.status === "confirmed"
                            ? "btn-success"
                            : "btn-danger"
                        } mb-2`}
                        style={{ marginLeft: "20px" }}
                        disabled
                      >
                        {request?.status}
                      </button>
                    </div>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </form>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <iframe
            src={request?.resume?.path}
            title="Resume"
            frameborder="0"
            scrolling="auto"
            style={iframeStyle}
          ></iframe>

          <div className="d-flex justify-content-end align-items-center">
            <CloseButton onClick={handleClose} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default DetailRequest;
