import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../../../utils/toast';

function CreateRole() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [nameAr,setNameAr] =  useState();
  const [nameEn,setNameEn] =  useState();

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

    }

  })
  const handleSubmit = () => {
    const body = {
      nameAr:nameAr,
      nameEn:nameEn,
      permissions:role
    }
    let aux = Object.assign({}, body);
    dispatch(createRole(aux)).then((res) => {
      if (!res.error) {
        showSuccessToast(("Role created"));
        dispatch(fetchRoles());
        Navigate(-1);
      } else {
        showErrorToast(res.error.message);
      }
    });    console.log("Role created:", body);
  };
 


  return (
    <div className="container">
    <div className="card" style={{borderRadius:20 , border:5}}>
      <div className="container">
        <div className="row">
          <div className="form-group col-6 mt-3">
            <label>NameAr</label>
            <input
              type="text"
              className="form-control"
              onChange={(e)=>setNameAr(e.target.value)}
              placeholder="NameAr"
            />
          </div>
          <div className="form-group col-6 mt-3">
            <label>NameEn</label>
            <input
              type="text"
              className="form-control"
              onChange={(e)=>setNameEn(e.target.value)}
              placeholder="NameEn"
            />
          </div>
        </div>
        <div className="row">
          {Object.entries(role.permissions).map(([key, value]) => (
            <div className="col-md-4" key={key}>
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{key}</h5>
                  {value.map(permission => (
                    <div className="form-check" key={permission}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`${key}-${permission}`}
                        onChange={(e)=>setRole(e.target.value)}
                      />
                      <label
                        className="form-check-label h6"
                        htmlFor={`${key}-${permission}`}
                      >
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

   )
}

export default CreateRole
