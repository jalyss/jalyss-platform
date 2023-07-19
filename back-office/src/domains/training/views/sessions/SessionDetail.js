import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { fetchOnesession } from "../../../../store/sessions";
import CreateButton from "../../../../components/Commun/buttons/CreateButton";

import TrainingStepper from "../../../../components/TrainingStepper";

function SessionDetail() {
  const sessions = useSelector((state) => state.sessions.session);

  const dispatch = useDispatch();
  const { sessionsId } = useParams();

  useEffect(() => {
    dispatch(fetchOnesession(sessionsId));
  }, [sessionsId]);

  return (
    <>
      <div className="d-flex">
        <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
          <h2>Session Detail</h2>
          <form className="checkout-form">
            <div className="d-flex flex-wrap justify-content-center">
              <div class="image-upload">
                <img
                  src={sessions?.cover?.path}
                  alt="cover"
                  className="rounded"
                />
              </div>

              <div className="d-flex justify-content-center w-100 m-3">
                <TableContainer className="w-100" component={Paper}>
                  <Table aria-label="simple table">
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell className="fw-bold">title</TableCell>
                        <TableCell>
                          <span> {sessions?.title}</span>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell className="fw-bold">description</TableCell>
                        <TableCell>
                          <span>{sessions?.description}</span>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell className="fw-bold">start-Date</TableCell>
                        <TableCell>
                          <span>{sessions?.startDate?.slice(0, 10)}</span>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell className="fw-bold">End sessions</TableCell>
                        <TableCell>
                          <span>{sessions?.endDate?.slice(0, 10)}</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="fw-bold">
                          Category session:
                        </TableCell>
                        <TableCell>
                          <span className="mt-5">
                            {sessions?.category?.nameEn}
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </form>
        </div>
        <div className="w-100 d-flex justify-content-center align-items-center flex-column m-3 ">
          <div className="d-flex justify-content-end mb-4">
            <CreateButton title="add Tarif " />
          </div>
          <TableContainer className="w-100" component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="fw-bold">Features</TableCell>
                  <TableCell>
                    <span>
                      {" "}
                      {sessions?.SessionHasFeatures?.map((elem) => (
                        <div>{elem?.feature?.label}</div>
                      ))}
                    </span>
                  </TableCell>
                </TableRow>
                {/* <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" >
                      description
                    </TableCell>
                    <TableCell >
                      <span>{sessions?.description}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" >
                      start-Date
                    </TableCell>
                    <TableCell >
                      <span>{sessions?.startDate?.slice(0, 10)}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" >
                      End sessions
                    </TableCell>
                    <TableCell >
                      <span>{sessions?.endDate?.slice(0, 10)}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="fw-bold" >
                      Category session:
                    </TableCell>
                    <TableCell >
                      <span className="mt-5">{sessions?.category?.nameEn}</span>
                    </TableCell>
                  </TableRow> */}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <TrainingStepper sessions={sessions} sessionsId={sessionsId} />
    </>
  );
}

export default SessionDetail;
