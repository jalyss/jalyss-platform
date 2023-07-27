import React, { useEffect, useState } from "react";
// import '../../../assets/styles/signup.css'
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { editCoach, fetchoneCoach } from "../../../../store/coach";
import { useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import { fetchUser } from "../../../../store/user";

function CoachDetails() {
  const userStore = useSelector((state) => state.user);
  const {user}=userStore
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();
  const [auxCoach, setAuxCoach] = useState({});
  
  const [fullname,setFullname]=useState('')
  const [email,setEmail]=useState('')
  const[address,setAddress]=useState('')
  const [tel,setTel]=useState('')
  const {id} = useParams();

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [id]);

 console.log("user",user);


 

 

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <h2>Profile coches</h2>
      <form className="checkout-form">
        <div className="">
         

          <div class="d-flex justify-content-center align-items-center image-upload">

            <img src={user?.avatar?.path} alt="image" style={{ width: '100%', marginBottom: '10px' }} /> 
          </div>

       

          <div className="d-flex justify-content-center w-100 m-3">
            <TableContainer className="w-100" component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" >
                      {t("nameAr")}
                    </TableCell>
                    <TableCell >
                    
                        <span>{user?.fullNameEn}</span>
                      
                    </TableCell>
                    <TableCell className="fw-bold" >
                      Email
                    </TableCell>
                    <TableCell >
                      
                        <span>{user?.email}</span>
                      
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                  
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" >
                      adress
                    </TableCell>
                    <TableCell >
                     
                        <span>{user?.client.address}</span>
                      
                    </TableCell>
                    <TableCell className="fw-bold" >
                      {t("phone")}
                    </TableCell>
                    <TableCell >
                     
                        <span>{user?.client.tel}</span>
                      
                    </TableCell>
                  </TableRow>
                 
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

       
      </form>
    </div>
    
  );
}

export default CoachDetails;
