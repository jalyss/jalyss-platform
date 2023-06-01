// import React, { useEffect, useState } from "react";
// import auth, { authUpdate, register } from "../store/auth";
// import "../assets/styles/signup.css";
// import { useDispatch, useSelector } from "react-redux";
// import { showErrorToast, showSuccessToast } from "../utils/toast";
// import { useTranslation } from "react-i18next";
// import axios from "axios";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";

// function Profile() {
//   const { t, i18n } = useTranslation();
//   const dispatch = useDispatch();
//   const authStore = useSelector((state) => state.auth);
//   const [user, setUser] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [preview, setPreview] = useState(null);
//   const [avatar, setAvatar] = useState(null);
//   useEffect(() => {
//     if (authStore.me) {
//       setUser(authStore.me);
//     }
//   }, [authStore.me]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser((User) => ({ ...User, [name]: value }));
//   };
//   const submitEditProfile = async (event) => {
//     if (!editMode) {
//       event.preventDefault();
//       setEditMode(true);
//     } else {
//       event.preventDefault();
//       let aux = Object.assign({}, user);
//       if (avatar !== null) {
//         console.log("in if");
//         const image = new FormData();
//         image.append("file", avatar);
//         const response = await axios.post(
//           `${process.env.REACT_APP_API_ENDPOINT}/upload`,
//           image
//         );
//         aux.avatarId = response.data.id;
//       }
//       delete aux.avatar;
//       delete aux.Media;
//       delete aux.exp;
//       delete aux.iat;
//       dispatch(authUpdate(aux)).then((res) => {
//         if (!res.error) {
//           showSuccessToast(t("user.updated"));
//           setEditMode(false);
//         } else {
//           console.log(res);
//           showErrorToast(res.error.message);
//         }
//       });
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setPreview(URL.createObjectURL(file));
//     setAvatar(file);
//   };

//   console.log(authStore);

//   const handleLogout = () => {
//     // Clear user session data, e.g. authentication token
//     localStorage.removeItem("token");

//     // Redirect to the login page
//     window.location.href = "/Login";
//   };

//   return (
//     <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
//       <h2>Profile</h2>
//       <form className="checkout-form" onSubmit={submitEditProfile}>
//         <div className="d-flex flex-wrap">
//           <div className="position-relative">
//             <label id="image">{t("image")}</label>
//             <div class="image-upload">
//               <img src={preview?preview:authStore?.me?.avatar?.path} alt="" />

//               {editMode && (
//                 <input
//                   id="image"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                 />
//               )}
//             </div>
//             {preview && editMode && (
//               <button
//                 type="button"
//                 class="delete-button"
//                 onClick={() => {
//                   setPreview(null);
//                   setAvatar(null);
//                 }}
//               >
//                 X
//               </button>
//             )}
//           </div>
//           <div className="d-flex justify-content-center w-100 m-3">
//             <TableContainer className="w-100" component={Paper}>
//               <Table aria-label="simple table">
//                 <TableBody>
//                   <TableRow
//                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   >
//                     <TableCell className="fw-bold" align="right">
//                       {t("nameAr")}
//                     </TableCell>
//                     <TableCell align="right">
//                       {editMode ? (
//                         <input
//                           class="form-control mt-2"
//                           required
//                           name="fullNameAr"
//                           id="fullNameAr"
//                           value={user?.fullNameAr}
//                           onChange={handleChange}
//                         />
//                       ) : (
//                         <span>{user?.fullNameAr}</span>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                   <TableRow
//                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   >
//                     <TableCell className="fw-bold" align="right">
//                       {t("nameEn")}
//                     </TableCell>
//                     <TableCell align="right">
//                       {editMode ? (
//                         <input
//                           class="form-control mt-2"
//                           required
//                           name="fullNameAr"
//                           id="fullNameAr"
//                           value={user?.fullNameEn}
//                           onChange={handleChange}
//                         />
//                       ) : (
//                         <span>{user?.fullNameEn}</span>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                   <TableRow
//                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   >
//                     <TableCell className="fw-bold" align="right">
//                       {t("email")}
//                     </TableCell>
//                     <TableCell align="right">
//                       {editMode ? (
//                         <input
//                           required
//                           class="form-control mt-2"
//                           type="email"
//                           id="email"
//                           name="email"
//                           value={user?.email}
//                           onChange={handleChange}
//                         />
//                       ) : (
//                         <span>{user?.email}</span>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                   <TableRow
//                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   >
//                     <TableCell className="fw-bold" align="right">
//                       {t("phone")}
//                     </TableCell>
//                     <TableCell align="right">
//                       {editMode ? (
//                         <input
//                           required
//                           type="tel"
//                           class="form-control mt-2"
//                           id="tel"
//                           name="tel"
//                           value={user?.tel}
//                           onChange={handleChange}
//                         />
//                       ) : (
//                         <span>{user?.tel}</span>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                   <TableRow
//                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   >
//                     <TableCell className="fw-bold" align="right">
//                       {t("address")}
//                     </TableCell>
//                     <TableCell align="right">
//                       {editMode ? (
//                         <input
//                           required
//                           class="form-control mt-2"
//                           id="address"
//                           name="address"
//                           value={user?.address}
//                           onChange={handleChange}
//                         />
//                       ) : (
//                         <span>{user?.address}</span>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                   <TableRow
//                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   >
//                     <TableCell className="fw-bold" align="right">
//                       {t("country")}
//                     </TableCell>
//                     <TableCell align="right">
//                       {editMode ? (
//                         <input
//                           type="tel"
//                           class="form-control mt-2"
//                           id="country"
//                           name="countryId"
//                           value={user?.country?.nameAr}
//                           onChange={handleChange}
//                         />
//                       ) : (
//                         <span>{user?.country?.nameAr}</span>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                   <TableRow
//                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   >
//                     <TableCell className="fw-bold" align="right">
//                       {t("city")}
//                     </TableCell>
//                     <TableCell align="right">
//                       {editMode ? (
//                         <input
//                           class="form-control mt-2"
//                           id="city"
//                           name="cityId"
//                           value={user?.city?.nameAr}
//                           onChange={handleChange}
//                         />
//                       ) : (
//                         <span>{user?.city?.nameAr}</span>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                   <TableRow
//                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   >
//                     <TableCell className="fw-bold" align="right">
//                       {t("functionalArea")}
//                     </TableCell>
//                     <TableCell align="right">
//                       {editMode ? (
//                         <input
//                           class="form-control mt-2"
//                           id="functionalArea"
//                           name="functionalAreaId"
//                           value={user?.functionalArea?.nameAr}
//                           onChange={handleChange}
//                         />
//                       ) : (
//                         <span>{user?.functionalArea?.nameAr}</span>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                   <TableRow
//                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   >
//                     <TableCell className="fw-bold" align="right">
//                       {t("educationLevel")}
//                     </TableCell>
//                     <TableCell align="right">
//                       {editMode ? (
//                         <input
//                           class="form-control"
//                           id="educationLevel"
//                           name="educationLevelId"
//                           value={user?.educationLevel?.nameAr}
//                           onChange={handleChange}
//                         />
//                       ) : (
//                         <span>{user?.educationLevel?.nameAr}</span>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                   <TableRow
//                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   >
//                     <TableCell className="fw-bold" align="right">
//                       {t("jobTitle")}
//                     </TableCell>
//                     <TableCell align="right">
//                       {editMode ? (
//                         <input
//                           class="form-control mt-2"
//                           id="jobTitle"
//                           name="jobTitleId"
//                           value={user?.jobTitle?.nameAr}
//                           onChange={handleChange}
//                         />
//                       ) : (
//                         <span>{user?.jobTitle?.nameAr}</span>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </div>
//         </div>

//         <div className="w-100 d-flex justify-content-center">
//           <button
//             type="submit"
//             className="confirm-button mt-3"
//             onSubmit={submitEditProfile}
//           >
//             <span className="label-btn">{editMode ? "حفظ" : "تعديل"}</span>
//           </button>
//         </div>
//       </form>
//       <button className="confirm-button mt-3" onClickCapture={handleLogout}>
//         Logout{" "}
//       </button>
//     </div>
//   );
// }

// export default Profile;




import React from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';

export default function ProfilePage() {
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href='#'>Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="#">User</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1">Full Stack Developer</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">Message</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fas icon="globe fa-lg text-warning" />
                    <MDBCardText>https://mdbootstrap.com</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                    <MDBCardText>@mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Johnatan Smith</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">example@example.com</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}