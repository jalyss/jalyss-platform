import React from "react";

const Addclient = () => {
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div
            style={{ backgroundColor: "rgb(77,24,71)" }}
            className="modal-header"
          >
            <h1
              className="modal-title fs-5"
              style={{ color: "white" }}
              id="staticBackdropLabel"
            >
              Add client
            </h1>
            <button
              //   style={{ : "white" }}
              type="button"
              className="btn-close btn-light"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div
            // style={{ backgroundColor: "rgb(249,234,250)" }}
            className="modal-body d-flex justify-content-center align-items-center flex-column"
          >
            <div className="d-flex gap-2 mb-3">
              <div className="">
                <label htmlFor="nameAr" className="form-label">
                  Full Name arabic
                </label>
                <input
                  type="text"
                  className="form-control rounded"
                  id="nameAr"
                  placeholder="arabic Name"
                />
              </div>
              <div className="">
                <label htmlFor="nameEn" className="form-label">
                  Full Name English
                </label>
                <input
                  type="text"
                  className="form-control rounded"
                  id="nameEn"
                  placeholder="English Name"
                />
              </div>
            </div>
            <div className="d-flex gap-2 mb-3">
              <div className="">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control rounded"
                  style={{ padding: "10px" }}
                  id="email"
                  placeholder="name@example.com"
                />
              </div>
              <div className="">
                <label htmlFor="phone" className="form-label">
                  Phone number
                </label>
                <input
                  type="number"
                  className="form-control rounded"
                  id="phone"
                  placeholder="Phone number"
                />
              </div>
            </div>
            <div className="d-flex gap-2 mb-3">
              <div className="">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control rounded"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <div className="">
                <label htmlFor="rPassword" className="form-label">
                  Repeat password
                </label>
                <input
                  type="password"
                  className="form-control rounded"
                  id="rPassword"
                  placeholder="Repeat your password"
                />
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Example textarea
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div
            // style={{ backgroundColor: "rgb(77,24,71)" }}
            className="modal-footer"
          >
            <button
              style={{ backgroundColor: "rgb(249,234,250)" }}
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              style={{ backgroundColor: "rgb(220,53,69)", border: "none" }}
              type="button"
              className="btn btn-primary"
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addclient;
