import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../../../utils/toast';
import { createRole, fetchRoles } from '../../../store/role';

function CreateRole() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');

  const initialPermissions = {
    create: false,
    update: false,
    delete: false,
    view: false,
  };

  const initialRoleState = {
    employee: { ...initialPermissions },
    blog: { ...initialPermissions },
    article: { ...initialPermissions },
    articleByBrunch: { ...initialPermissions },
    providers: { ...initialPermissions },
    category: { ...initialPermissions },
    type: { ...initialPermissions },
    publishingHouse: { ...initialPermissions },
    author: { ...initialPermissions },
    orderList: { ...initialPermissions },
    listOfUsers: { ...initialPermissions },
    client: { ...initialPermissions },
    space: { ...initialPermissions },
    training: { ...initialPermissions },
    chat: { ...initialPermissions },
    role: { ...initialPermissions },
  };

  const [newRole, setNewRole] = useState(initialRoleState);
  const [seva, setsaved] = useState([]);

  const handlePermissionChange = (roleName, permission) => {
    setsaved([...seva,{domain:roleName,action:permission}])
    setNewRole(prevRoles => ({
      ...prevRoles,
      [roleName]: {
        ...prevRoles[roleName],
        [permission]: !prevRoles[roleName][permission],
      },
    }));
  };
  
  const handleSubmit = () => {
    const body = {
      nameAr: nameAr,
      nameEn: nameEn,
      permissions: seva,
    };

    dispatch(createRole(body))
      .then(res => {
        if (!res.error) {
          showSuccessToast('Role created');
          dispatch(fetchRoles());
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

  return (
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
                            id={`${roleName}-${permission}`}
                            checked={permissions[permission]}
                            onChange={() => handlePermissionChange(roleName, permission)}
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
          <div className="w-100 d-flex justify-content-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="confirm-button mt-5 mb-3"
            >
              <span className="label-btn"> Add Role </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRole;
