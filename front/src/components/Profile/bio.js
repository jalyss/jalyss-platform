import React, { useEffect, useState } from "react";
import "../../assets/styles/profile.css";
import { useTranslation } from "react-i18next";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

const Bio = () => {
  const { t } = useTranslation();
  const authStore = useSelector((state) => state.auth);

  const [user, setUser] = useState({});

  useEffect(() => {
    if (authStore.me) {
      setUser(authStore.me);
    }
  }, [authStore.me]);

  return (
    <div className="d-flex justify-content-center w-100 m-3">
      <TableContainer className="w-100" component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell className="fw-bold" align="left">
                {t("nameAr")}
              </TableCell>
              <TableCell align="left">
                <span>{user?.fullNameAr}</span>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell className="fw-bold" align="left">
                {t("nameEn")}
              </TableCell>
              <TableCell align="left">
                <span>{user?.fullNameEn}</span>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell className="fw-bold" align="left">
                {t("email")}
              </TableCell>
              <TableCell align="left">
                <span>{user?.email}</span>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell className="fw-bold" align="left">
                {t("phone")}
              </TableCell>
              <TableCell align="left">
                <span>{user?.tel}</span>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell className="fw-bold" align="left">
                {t("address")}
              </TableCell>
              <TableCell align="left">
                <span>{user?.address}</span>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell className="fw-bold" align="left">
                {t("country")}
              </TableCell>
              <TableCell align="left">
                <span>{user?.country?.nameAr}</span>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell className="fw-bold" align="left">
                {t("city")}
              </TableCell>
              <TableCell align="left">
                <span>{user?.city?.nameAr}</span>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell className="fw-bold" align="left">
                {t("functionalArea")}
              </TableCell>
              <TableCell align="left">
                <span>{user?.functionalArea?.nameAr}</span>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell className="fw-bold" align="left">
                {t("educationLevel")}
              </TableCell>
              <TableCell align="left">
                <span>{user?.educationLevel?.nameAr}</span>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell className="fw-bold" align="left">
                {t("jobTitle")}
              </TableCell>
              <TableCell align="left">
                <span>{user?.jobTitle?.nameAr}</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Bio;
