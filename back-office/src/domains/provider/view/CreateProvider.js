
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProvider, fetchProviders } from '../../../store/provider';
import { showErrorToast, showSuccessToast } from '../../../utils/toast';

function CreateProvider() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [address, setAddress] = useState('');
  const [logo, setLogo] = useState(null);

  const providerStore = useSelector((state) => state.provider);

  useEffect(() => {
    dispatch(fetchProviders());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!name || !accountBalance || !email || !tel || !address ) {
      console.log('Please fill in all required fields');
      return;
    }

    let body = {
      name,
      accountBalance,
      email,
      tel,
      address,
    };

    if (logo !== null) {
      try {
        const formData = new FormData();
        formData.append('file', logo);

        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/upload`,
          formData
        );

        body.logoId = response.data.id;
      } catch (error) {
        console.error('Error uploading logo image:', error);
      }
    }

    dispatch(createProvider(body)).then((res) => {
      if (!res.error) {
        showSuccessToast('Provider has been created');
        navigate(-1);
      } else {
        showErrorToast(res.error.message);
      }
    });
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
            <input
          type="file"
          className="form-control-file"
          id="logo"
          onChange={(e) => setLogo(e.target.files[0])}
        
        />
          </div>

          <div className="row">
            <div className="form-group col-6 mt-3">
              <label>Name</label>
              <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
            </div>
            <div className="form-group col-6 mt-3">
              <label>Account</label>
              <input
          type="number"
          className="form-control"
          id="accountBalance"
          value={accountBalance}
          onChange={(e) => setAccountBalance(e.target.value)}
          required
        />
            </div>
          </div>

          <div className="row mt-3">
            <div className="form-group col-6">
              <label>Email</label>
              <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
            </div>
            <div className="form-group col-6">
              <label>Telephone Number</label>
              <input
          type="text"
          className="form-control"
          id="tel"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          required
        />
            </div>
          </div>

          <div className="form-group mt-3">
            <label>Address</label>
            <input
          type="text"
          className="form-control"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
          </div>

          <div className="w-100 d-flex justify-content-center">
            <button className="btn btn-primary mt-3" onClick={handleSubmit}>
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


