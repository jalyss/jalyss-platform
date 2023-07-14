import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProvider } from '../../../store/provider';
import { showErrorToast, showSuccessToast } from '../../../utils/toast';

function CreateProvider() {
  const dispatch = useDispatch();
  const [provider, setProvider] = useState({
    name: '',
    accountBalance: 0,
    email: '',
    tel: '',
    address: ''
  });
  const providerStore = useSelector((state) => state.provider);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProvider((prevProvider) => ({ ...prevProvider, [name]: value }));
  };

  const submitCreate = async (event) => {
    event.preventDefault();
    let aux = { ...provider, accountBalance: Number(provider.accountBalance) };
    try {
      await dispatch(createProvider(aux));
      showSuccessToast('Provider created successfully');
    } catch (error) {
      console.log(error);
      showErrorToast(error.message);
    }
  };
  
  return (
    <div className="container">
      <div className="card">
        <div className="container">
          <form>
            <div className="mt-3">
              <label htmlFor="formFile" className="form-label">
                Choose a logo
              </label>
              <input className="form-control" type="file" id="formFile" />
            </div>

            <div className="row">
              <div className="form-group col-6 mt-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  value={provider.name}
                />
              </div>
              <div className="form-group col-6 mt-3">
                <label>Account</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="0"
                  name="accountBalance"
                  id="accountBalance"
                  onChange={handleChange}
                  value={provider.accountBalance}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="form-group col-6">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="email@gmail.com"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={provider.email}
                />
              </div>
              <div className="form-group col-6">
                <label>Telephone Number</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="+21644251517"
                  name="tel"
                  id="tel"
                  onChange={handleChange}
                  value={provider.tel}
                />
              </div>
            </div>

            <div className="form-group mt-3">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="1234 Main St"
                name="address"
                id="address"
                onChange={handleChange}
                value={provider.address}
              />
            </div>

            <div className="w-100 d-flex justify-content-center">
              <button className="btn btn-primary mt-3" onClick={submitCreate}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProvider;
