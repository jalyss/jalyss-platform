import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRole, updateRole } from '../../../store/role';
import { Card, Typography } from '@mui/material';
import EditModal from "../../../components/Commun/Modal";


function EditRole() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { id } = useParams();
  const [renderEditView, setRenderEditView] = useState(false);
  const role = useSelector((state) => state.role.role)
  const [editRoleData, seteditRoleData] = useState(null);
  const [basicModalDelete, setBasicModalDelete] = useState(false);

  useEffect(() => {
    dispatch(fetchRole(id));
  }, []);

  console.log(role, 'rrooooole')

  useEffect(() => {
    seteditRoleData({ ...role });
  }, [role]);


  const toggleShow = () => {
    setRenderEditView(!renderEditView);
  };



  // const handleSubmit = () => {
  //   const names = {
  //     ...editRoleData,
  //   };
  //   let aux = Object.assign({}, names);
  //   dispatch(updateRole(aux)).then((res) => {
  //     if (!res.error) {
  //       showSuccessToast("Role Edited successful");
  //       Navigate(-1);
  //     } else {
  //       showErrorToast(res.error.message);
  //     }
  //   });
  //   console.log('test', editRoleData)
  // };

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


        {!renderEditView ? (

          <div
            class="row"
            style={{ marginBottom: "10px", marginTop: "30px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>

              <Typography
                style={{
                  fontFamily: "Arial",
                  color: "#333",
                  display: "table-row",
                }}
              >
                <span
                  style={{
                    display: "table-cell",
                    fontSize: "20px",
                    fontWeight: "bold",
                    paddingRight: "20px",
                  }}
                >
                  Name (Ar) :
                </span>
                <span style={{ display: "table-cell" }}>
                  {role?.nameAr}
                </span>
              </Typography>
              <Typography
                style={{
                  fontFamily: "Arial",

                  color: "#333",
                  display: "table-row",
                }}
              >
                <span
                  style={{
                    display: "table-cell",
                    fontSize: "20px",
                    fontWeight: "bold",
                    paddingRight: "20px",
                  }}
                >
                  Name (En):
                </span>
                <span style={{ display: "table-cell" }}>
                  {role?.nameEn}
                </span>
              </Typography>
            </div>
            <Typography
              style={{
                fontFamily: "Arial",
                color: "#333",
                marginTop: '20px',
              }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr", // Two columns: one for domain, one for action
                  columnGap: "20px",
                }}>
                <span style={{ fontSize: "20px", fontWeight: "bold" }}>Permission :</span>

                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", rowGap: "10px" }}>
                  {role?.permissions.map((elem, index) => (
                    <React.Fragment key={index}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <h5 style={{ margin: 0, marginRight: "10px" }}>{elem?.domain}</h5>
                      </div>
                      <span>{elem?.action}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </Typography>

            <div className="w-100 d-flex justify-content-center">
              <button
                type="submit"
                onClick={() => toggleShow()}
                className="confirm-button mt-5   mb-3"
              >
                <span className="label-btn"> Edit Category </span>
              </button>
            </div>
          </div>

        ) : (
          <>
            <div class="row">
              <div class="form-group col-6 mt-3">
                <label>NameAr</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="name"
                  value={editRoleData?.nameAr || ""}
                  onChange={(e) => {
                    seteditRoleData({
                      ...editRoleData,
                      nameAr: e.target.value,
                    });
                  }}
                />
              </div>
              <div class="form-group col-6 mt-3">
                <label>NameEn</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="name"
                  value={editRoleData?.nameEn || ""}
                  onChange={(e) => {
                    seteditRoleData({
                      ...editRoleData,
                      nameEn: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="card mb-4">
                    <div className="card-body">
                      <h5 className="card-title">Permissions</h5>
                      {role?.permissions.map((elem, index) => (
                        <div key={index}>
                            <div className="d-flex align-items-center">
                              {elem?.domain}
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={elem?.action}
                                />
                              </div>
                              <label className="form-check-label h6">
                                {elem?.action}
                              </label>
                            </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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

      <EditModal
        toggleShow={onCanceltoggleShowDelete}
        basicModal={basicModalDelete}
        setBasicModal={setBasicModalDelete}
        normal={true}
        ofDelete={!true}
        title={
          <div style={{ width: "200%", marginLeft: "100%" }} className="d-flex justify-content-center align-items-center">
            Are you sure !
          </div>
        }
        body={
          <div className="d-flex justify-content-center align-items-center">
            You want to edit this Role ?
          </div>
        }
        fn={() => {
          handleSubmit();
        }}
      />
    </div>
  );
}

export default EditRole;
