import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { createRole, fetchRoles } from "../../../store/role";

function CreateRole() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [nameAr, setNameAr] = useState();
  const [nameEn, setNameEn] = useState();
  const [data, setData] = useState([]);

  const [role, setRole] = useState({
    permissions: {
      employee: ["create", "update", "delete", "view"],
      blog: ["create", "update", "delete", "view"],
      Article: ["create", "update", "delete", "view"],
      ArticleByBrunch: ["create", "update", "delete", "view"],
      providers: ["create", "update", "delete", "view"],
      category: ["create", "update", "delete", "view"],
      type: ["create", "update", "delete", "view"],
      publishingHouse: ["create", "update", "delete", "view"],
      author: ["create", "update", "delete", "view"],
      orderList: ["create", "update", "delete", "view"],
      listOfUsers: ["create", "update", "delete", "view"],
      client: ["create", "update", "delete", "view"],
      space: ["create", "update", "delete", "view"],
      training: ["create", "update", "delete", "view"],
      chat: ["create", "update", "delete", "view"],
      role: ["create", "update", "delete", "view"],
    },
  });

  const [Newrole, setNewRole] = useState({
    newpermissions: {
      employee: [false, false, false, false],
      blog: [false, false, false, false],
      Article: [false, false, false, false],
      ArticleByBrunch: [false, false, false, false],
      providers: [false, false, false, false],
      category: [false, false, false, false],
      type: [false, false, false, false],
      publishingHouse: [false, false, false, false],
      author: [false, false, false, false],
      orderList: [false, false, false, false],
      listOfUsers: [false, false, false, false],
      client: [false, false, false, false],
      space: [false, false, false, false],
      training: [false, false, false, false],
      chat: [false, false, false, false],
      role: [false, false, false, false],
    },
  });

  const x = ["create", "update", "delete", "view"];
  const handlePermissionChange = (roleName, permission) => {
    const updatedNewRole = { ...Newrole };
    updatedNewRole.newpermissions[roleName][permission] =
      !updatedNewRole.newpermissions[roleName][permission];

    const newPermissionObject = { domain: roleName, action: x[permission] };

    // Check if the permission already exists in data
    const existingIndex = data.findIndex(
      (item) =>
        item.domain === newPermissionObject.domain &&
        item.action === newPermissionObject.action
    );

    if (existingIndex !== -1) {
      // Remove the existing permission
      const newData = data.slice();
      newData.splice(existingIndex, 1);
      setData(newData);
    } else {
      // Add the new permission
      setData((prevData) => [...prevData, newPermissionObject]);
    }
    setNewRole(updatedNewRole);
  };

  const handleSubmit = () => {
    const body = {
      nameAr: nameAr,
      nameEn: nameEn,
      permissions: data,
    };
    let aux = Object.assign({}, body);
    dispatch(createRole(aux)).then((res) => {
      if (!res.error) {
        showSuccessToast("category created");
        Navigate(-1);
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  return (
    <div className="container">
      <div className="card" style={{ borderRadius: 20, border: 5 }}>
        <div className="container">
          <div className="row mb-5">
            <div className="form-group col-6 mt-3">
              <label>NameAr</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setNameAr(e.target.value)}
                placeholder="NameAr"
              />
            </div>
            <div className="form-group col-6 mt-3">
              <label>NameEn</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="NameEn"
              />
            </div>
          </div>
          <div className="row mt-5">
            {Object.entries(Newrole.newpermissions).map(
              ([roleName, permissions]) => (
                <div className="col-md-4" key={roleName}>
                  <div className="card mb-4">
                    <div className="card-body">
                      <h5 className="card-title">{roleName}</h5>
                      {permissions.map((permission, index) => (
                        <div className="d-flex">
                          <div
                            className="form-check"
                            key={`${roleName}-${permission}`}
                          >
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`${roleName}-${permission}`}
                              checked={permission}
                              onChange={() =>
                                handlePermissionChange(roleName, index)
                              }
                            />
                          </div>
                          <label className="form-check-label h6">
                            {permission} -{" "}
                            {role.permissions[roleName][index]
                              ? role.permissions[roleName][index]
                              : "False"}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="w-100 d-flex justify-content-center">
            <button
              type="submit"
              onClick={() => handleSubmit()}
              className="confirm-button mt-5   mb-3"
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
