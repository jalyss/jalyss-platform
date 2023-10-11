import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "../../../assets/styles/signup.css";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useTranslation } from "react-i18next";
import { createEmployee } from "../../../store/employee";
import { fetchBranches } from "../../../store/branche";
import { fetchRoles } from "../../../store/role";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function CreateEmployee() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState({});
  const roleStore = useSelector((state) => state.role);
  const branchStore = useSelector((state) => state.branche);
  const [avatar, setAvatar] = useState(null);
  const Navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchRoles());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((Employee) => ({ ...Employee, [name]: value }));
  };

  const submitCreate = async () => {
    try{

      if (avatar) {
        const formData = new FormData();
        formData.append("file", avatar);

      const response = await axios.post(
        `${process.env.SERVER_UPLOAD_CONFIG}/upload`,
        formData
        );

        employee.avatarId = response.data.id;
      }
    
    let aux = Object.assign({}, employee);
    dispatch(createEmployee(aux)).then((res) => {
      if (!res.error) {
        showSuccessToast(t("employee.created"));
        Navigate(-1)
      } else {
        showErrorToast(res.error.message);
      }
    });
  }catch(err){
    console.log(err)
  }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    setAvatar(file);
  };
  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <h2>Create Employee</h2>
        <div className="d-flex flex-wrap">
          <div class="image-upload">
            <label id="image">{t("image")}</label>
            <img src={preview ? preview : employee?.avatar?.path} alt="" />
            (
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            )
          </div>
          {preview && (
            <button
              type="button"
              class="delete-button"
              onClick={() => {
                setPreview(null);
                setAvatar(null);
              }}
            >
              X
            </button>
          )}
          <div className=" m-3">
            <div class="row">
              <div class="col mb-3 ">
                <label for="fullNameAr">
                  {t("nameAr")}
                  <span style={{ color: "red" }}>*</span>
                </label>

                <input
                  class="form-control mt-2"
                  required
                  name="fullNameAr"
                  id="fullNameAr"
                  value={employee?.fullNameAr}
                  onChange={handleChange}
                />
              </div>
              <div class="col mb-3 ">
                <label for="fullNameEn">
                  {t("nameEn")}
                  <span style={{ color: "red" }}>*</span>
                </label>

                <input
                  class="form-control mt-2"
                  required
                  id="fullNameEn"
                  name="fullNameEn"
                  // pattern="^(\w\w+)\s(\w+)$"
                  value={employee?.fullNameEn}
                  onChange={(e) =>
                    setEmployee((Employee) => ({
                      ...Employee,
                      fullNameEn: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div class="row">
              <div class="col mb-3 ">
                <label for="email">
                  {t("email")}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  required
                  class="form-control mt-2"
                  type="email"
                  id="email"
                  name="email"
                  value={employee?.email}
                  onChange={handleChange}
                />
              </div>
              <div class="row">
                <div class="col mb-3 ">
                  <label for="address">
                    {t("yy")}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    required
                    class="form-control mt-2"
                    id="address"
                    name="address"
                    value={employee?.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div class="col mb-3 ">
                <label for="tel">
                  {t("phone")}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  required
                  type="tel"
                  class="form-control mt-2"
                  id="tel"
                  name="tel"
                  value={employee?.tel}
                  onChange={handleChange}
                />
              </div>
            </div>
       
           

            <div class="row">
              <div class="col mb-3 ">
                <label for="branch">الفرع</label>
                <select
                  name="branchId"
                  class="form-control mt-2"
                  id="branch"
                  value={employee?.branchId}
                  onChange={handleChange}
                >
                  <option value={null}>--حدد الفرع--</option>
                  {branchStore.branches.items.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>

              <div class="col mb-3 ">
                <label for="role">الدور</label>
                <select
                  name="roleId"
                  class="form-control mt-2"
                  id="role"
                  value={employee?.roleId}
                  onChange={handleChange}
                >
                  <option value={null}>--حدد الدور--</option>
                  {roleStore.roles.items.map((item) => (
                    <option value={item.id}>{item.nameAr}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="w-100 d-flex justify-content-center">
          <button
            type="submit"
            className="confirm-button mt-3"
            onClick={submitCreate}
          >
            <span className="label-btn"> Add Employee </span>
          </button>
        </div>
    </div>
  );
}

export default CreateEmployee;
