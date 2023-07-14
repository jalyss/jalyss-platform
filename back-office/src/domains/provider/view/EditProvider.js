import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editProvider, fetchProvider } from "../../../store/provider";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

function EditProvider() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { providerId } = useParams();
 
  const [name, setName] = useState("");
  const [accountBalance, setAccountBalance] = useState(0);
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const [filename, setFileName] = useState("");
  const [filenamesplitted, setFileNamesplitted] = useState("");
  const [logo, setLogo] = useState("");
  
  const providerStore = useSelector((state) => state.provider);
  console.log(providerId, "providerId");
  console.log(providerStore, "providerStore");
  useEffect(() => {
    dispatch(fetchProvider(providerId));
  }, [dispatch, providerId]);
  console.log(providerId, "providerIdMMMM");

  useEffect(() => {
    if (providerStore.provider) {
      const { name, accountBalance, email, tel, address, logo } =
        providerStore.provider;

      setName(name);
      setAccountBalance(accountBalance);
      setEmail(email);
      setTel(tel);
      setAddress(address);
      setFileName(logo.path);
      deleteImg(filename);
      setLogo();
    }
  }, [providerStore.provider]);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    var body = {
      name,
      accountBalance,
      email,
      tel,
      address,
    };
    const submitEdit = async () => {
      let aux = { ...body,providerId, accountBalance: Number(body.accountBalance) };
      try {
        dispatch(editProvider(providerId, aux));
        showSuccessToast("Provider editd successfully");
        navigate(-1);
      } catch (error) {
        console.log(error);
        showErrorToast(error.message);
      }
    };
    if (logo !== null) {
      try {
        const formData = new FormData();
        formData.append("file", logo);

        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/upload`,
          formData
        );

        body.logoId = response.data.id;
      } catch (error) {
        console.error("Error uploading logo image:", error);
      }
    }

    submitEdit();
  };
  const deleteImg = async (path) => {
    const pathElements = path.split("/");
    const name = pathElements[pathElements.length - 1];
    console.log(name, "ggg");
    setFileNamesplitted(name);
  };

  return (
    <div>
      <div className="container">
        <div className="card">
          <div className="container">
            <form onSubmit={handleSubmit}>
             
              <div className="row">
                <div className="form-group col-6 mt-3">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                   
                  />
                </div>
                <div className="form-group col-6 mt-3">
                  <label>Account</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    value={accountBalance}
                    onChange={(e) => setAccountBalance(e.target.value)}
                   
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="form-group col-6">
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="form-group col-6">
                  <label>Telephone number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                   
                  />
                </div>
                <div className="form-group col-6">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlFile1">
                  Image file input
                </label>
                <input
                  type="file"
                  className="form-control-file"
                  id="exampleFormControlFile1"
                  onChange={(e) => setLogo(e.target.files[0])}
                  
                />
                {/* {filenamesplitted && <p>Selected file: {filenamesplitted}</p>} */}
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary mt-3">
                  Update Provider
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProvider;
