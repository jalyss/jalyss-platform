import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProvider, editProvider } from '../../../store/provider';
import { showErrorToast, showSuccessToast } from '../../../utils/toast';

function EditProvider() {
  const { providerId } = useParams();
  const dispatch = useDispatch();
  const provider = useSelector((state) => state.provider.provider);
  const [updatedProvider, setUpdatedProvider] = useState({});

  useEffect(() => {
    dispatch(fetchProvider(providerId));
  }, [dispatch, providerId]);

  useEffect(() => {
    setUpdatedProvider(provider);
  }, [provider]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(editProvider({ id: providerId, body: updatedProvider }));
      showSuccessToast('Provider updated successfully');
    } catch (error) {
      console.log(error);
      showErrorToast(error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProvider((prevProvider) => ({ ...prevProvider, [name]: value }));
  };

  return (
    <div>
      <div className="container">
        <div className="card">
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="d-flex mb-2" style={{ justifyContent: 'center' }}>
                <img
                  className="img-fluid rounded-start mt-5"
                  src={provider?.logo}
                  alt="Card image cap"
                  style={{ height: 100, width: 250 }}
                />
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
                    value={updatedProvider?.name || ''}
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
                    value={updatedProvider?.accountBalance || ''}
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
                    value={updatedProvider?.email || ''}
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="form-group col-6">
                  <label>Telephone number</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="+21644251517"
                    name="tel"
                    id="tel"
                    onChange={handleChange}
                    value={updatedProvider?.tel || ''}
                  />
                </div>
                <div className="form-group col-6">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="1234 Main St"
                    name="address"
                    id="address"
                    onChange={handleChange}
                    value={updatedProvider?.address || ''}
                  />
                </div>
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
