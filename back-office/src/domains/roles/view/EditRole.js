import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRole, updateRole } from '../../../store/role';
import { Card, Typography } from '@mui/material';
import EditModal from "../../../components/Commun/Modal";
import { showErrorToast, showSuccessToast } from '../../../utils/toast';


function EditRole() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { id } = useParams();
  const [renderEditView, setRenderEditView] = useState(false);
  const role = useSelector((state) => state.role.role)
  const [editRoleData, seteditRoleData] = useState(null);
  const [basicModalDelete, setBasicModalDelete] = useState(false);
  const [basicModaelete, setbasicModaelete] = useState(0);



  ////



  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');

  const initialPermissions = {
    create: false,
    update: false,
    delete: false,
    view: false,
  };

  const [seva, setsaved] = useState([]);

  const handlePermissionChange = (permissions, roleName, permission) => {
    let x = []
    x.push(permissions[0]) 
    seva.map((e,i)=>(

      e.action === x[0].action ? console.log(false) :
      // setsaved( [...seva,...x,{ action: permission,domain: roleName }])
console.log(true)
    ))
    console.log(seva,"merge")
    setNewRole(prevRoles => ({
      ...prevRoles,
      [roleName]: {
        ...prevRoles[roleName],
        [permission]: !prevRoles[roleName][permission],
      },
    }));

  };





  //////


  useEffect(() => {
    seteditRoleData({ ...role });
  }, [role]);



  useEffect(() => {
    dispatch(fetchRole(id));
  }, [id]);

  const toggleShow = () => {
    setRenderEditView(!renderEditView);
  };

  const domains = [...new Set(role?.permissions?.map(permission => permission.domain))];
  const initialRoleState = domains.reduce((acc, domain) => {
    const domainPermissions = role.permissions
      .filter(permission => permission.domain === domain)
      .map(permission => permission.action);

    acc[domain] = {};

    // Iterate through each of the initialPermissions and set to true if it's in domainPermissions, otherwise set to false
    Object.keys(initialPermissions).forEach(permission => {
      acc[domain][permission] = domainPermissions.includes(permission);
    });

    return acc;
  }, {});
  const [newRole, setNewRole] = useState(initialRoleState);


  const handleSubmit = () => {
    const body = {
      id: role.id,
      nameAr: role.nameAr,
      nameEn: role.nameEn,
      permissions: seva,
    };
    dispatch(updateRole(body))
      .then(res => {
        if (!res.error) {
          showSuccessToast('Role created');
          dispatch(editRoleData());
          Navigate(-1);
        } else {
          showErrorToast(res.error.message);
        }
      })
      .catch(error => {
        showErrorToast('An error occurred while creating the role.');
        console.error(error);
      });
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
  const permissionsByDomain = {};
  return (
    <div className="container">
      <div className="card">


        {false ? (

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
                  {

                    role?.permissions.forEach((permission) => {
                      if (!permissionsByDomain[permission.domain]) {
                        permissionsByDomain[permission.domain] = [];
                      }
                      permissionsByDomain[permission.domain].push(permission.action);
                    })

                  }
                  <div>
                    {Object.keys(permissionsByDomain).map((domain) => (
                      <div key={domain} className='d-flex' style={{ marginBottom: '10px' }}>
                        <h5 style={{ margin: 0 }}>{`${domain} :  `}</h5>
                        <span>{permissionsByDomain[domain].join(', ')}</span>
                      </div>
                    ))}
                  </div>
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
            {/* <div class="row">
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
            </div> */}

            <div className="container">
              <div className="card" style={{ borderRadius: 20, border: 5 }}>
                <div className="container">
                  <div className="row">
                    <div className="form-group col-6 mt-3">
                      <label>NameAr</label>
                      <input
                        type="text"
                        className="form-control"
                        value={nameAr}
                        onChange={e => setNameAr(e.target.value)}
                        placeholder="NameAr"
                      />
                    </div>
                    <div className="form-group col-6 mt-3">
                      <label>NameEn</label>
                      <input
                        type="text"
                        className="form-control"
                        value={nameEn}
                        onChange={e => setNameEn(e.target.value)}
                        placeholder="NameEn"
                      />
                    </div>
                  </div>
                  <div className="row">


                    {role?.permissions?.forEach((permission) => {
                      if (!permissionsByDomain[permission.domain]) {
                        permissionsByDomain[permission.domain] = [];
                      }
                      permissionsByDomain[permission.domain].push(permission.action);
                    })}

                    <div>
                      {Object.entries(newRole).map(([roleName, permissions]) => (
                        <div className="col-md-4" key={roleName}>
                          <div className="card mb-4">
                            <div className="card-body">
                              <h5 className="card-title">{roleName}</h5>
                              {Object.keys(permissions).map(permission => (
                                <div className="d-flex" key={`${roleName}-${permission}`}>
                                  <div className="form-check">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      checked={permissions[permission]}
                                      onChange={() => handlePermissionChange(role.permissions, roleName, permission)}
                                    />

                                  </div>
                                  <label className="form-check-label h6">
                                    {permission}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>


                  </div>
                  <div className="w-100 d-flex justify-content-center">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="confirm-button mt-5   mb-3"
                    >
                      <span className="label-btn"> Save changes </span>
                    </button>
                  </div>

                </div>
              </div>
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
