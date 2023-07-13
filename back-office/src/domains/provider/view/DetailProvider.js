import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProvider } from '../../../store/provider';

function DetailProvider() {
  const { providerId } = useParams();
  const dispatch = useDispatch();
  const provider = useSelector((state) => state.provider.provider);

  useEffect(() => {
    dispatch(fetchProvider(providerId));
  }, [dispatch, providerId]);

  return (
    <div>
      <div className="container">
        <div className="card mb-3" style={{ width: 1000 }}>
          <div className="row g-0">
            <div className="col-md-4"></div>
            <div className="col-md-8">
              <div className="card-body">
                <h3 className="card-title" style={{ textAlign: 'center' }}>
                  {provider?.name}
                </h3>
                <hr />
                <div className="row">
                  <div className="col-2">
                    <h6>logo</h6>
                  </div>
                  <div className="col-4">
                  <img
            className="card-img-top"
            src={provider?.logo?.path}
            alt="Card image cap"
          />
                  </div>
                </div>
                <div className="row">
                  <div className="col-2">
                    <h6>Email :</h6>
                  </div>
                  <div className="col-4">
                    <p className="card-text">
                      <small className="text-muted">{provider?.email}</small>
                    </p>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <h6>Telephone Number:</h6>
                  </div>
                  <div className="col-4">
                    <p className="card-text">
                      <small className="text-muted">{provider?.tel}</small>
                    </p>
                  </div>
                </div>
               
                <div className="row mt-3">
                  <div className="col-4">
                    <h6>Adresse :</h6>
                  </div>
                  <div className="col-4">
                    <p className="card-text">{provider?.address}</p>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <h6>Account Balance :</h6>
                  </div>
                  <div className="col-4">
                    <p className="card-text">
                      <small className="text-muted">{provider?.accountBalance}</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProvider;
