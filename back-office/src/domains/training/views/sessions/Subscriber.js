import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CloseButton from "../../../../components/Commun/buttons/CloseButton";
import paid from "../../../../assets/images/paid.jpg";
import unpaid from "../../../../assets/images/unpaid.png";
import { editTrainingBooking, fetchTrainingBooking } from "../../../../store/trainingBooking";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";

function Subscriber() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const SubscriberStore = useSelector((state) => state.trainingBooking);
  const { trainingBooking } = SubscriberStore;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(fetchTrainingBooking(id));
  }, [id]);

  console.log(trainingBooking);

 
  const confirmfunc = async () => {
    
    const args = { id, paid: { paid: true } };
    dispatch(editTrainingBooking(args)).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("Booking has been paid");
        navigate(-1);
      }
    });
  };

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <h2 className="mt-5">Subscriber</h2>
      <form className="checkout-form">
        <div className="d-flex flex-wrap justify-content-center">
          <div className="image-upload mt">
            <img src={trainingBooking?.user?.avatar?.path} alt="avatar" />
          </div>

          <div className="d-flex justify-content-center align-items-center m-3">
            <TableContainer className="w-100" component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold">Name:</TableCell>
                    <TableCell>
                      <span>{trainingBooking?.user?.fullNameEn}</span>
                    </TableCell>
                    <TableCell className="fw-bold">Email:</TableCell>
                    <TableCell>
                      <span>{trainingBooking?.user?.email}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold">Phone:</TableCell>
                    <TableCell>
                      <span>{trainingBooking?.user?.client.tel}</span>
                    </TableCell>
                    <TableCell className="fw-bold">Address:</TableCell>
                    <TableCell>
                      <span>{trainingBooking?.user?.client.address}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold">Status:</TableCell>
                    <TableCell>
                      {trainingBooking?.paid === true ? (
                        <>
                          <img
                            src={paid}
                            alt="paid"
                            style={{ width: 44, height: 34 }}
                          />
                        </>
                      ) : (
                        <>
                          <img
                            src={unpaid}
                            alt="unpaid"
                            style={{
                              width: 44,
                              height: 25,
                              backgroundColor: "grey",
                            }}
                          />
                        </>
                      )}
                    </TableCell>
                   {trainingBooking?.paid === false &&
                   <>
                    <TableCell className="fw-bold">Change status:</TableCell>

                    <TableCell >
                    <button
                      type="button"
                      class="btn btn-success"
                      onClick={confirmfunc}
                    >
                     Payer
                    </button>
                  </TableCell>
                  </> }
                  </TableRow>
                  {/* {request?.status === "pending" ? (
                    <TableRow>
                      <TableCell >
                        <button
                          type="button"
                          class="btn btn-success"
                          onClick={confirmfunc}
                        >
                          Accept
                        </button>
                      </TableCell>

                      <TableCell >
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
                    <TableRow>
                  <TableCell >
                    
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
                    
                      
                      </TableCell>
                    </TableRow>
                  )} */}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Subscriber;
