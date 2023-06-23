import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchServiceById, removeService } from "../../../store/service";
import { removeSpace } from "../../../store/space";
import tarif, { removeTarif } from "../../../store/tarif";
import { DataGrid } from "@mui/x-data-grid";
import { BsPersonWorkspace } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { MdOutlinePayments } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";


import "../../../assets/styles/ServiceDetails.css";

import AddButton from "../../../components/buttons/AddButton";



export default function ServiceDetails() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

const id = serviceId

  const service = useSelector((state) => state.service.service);
console.log(service);

  useEffect(() => {
    dispatch(fetchServiceById(serviceId));
  }, [dispatch]);

  const handleRemoveTarif = (id) => {
    dispatch(removeTarif(id)).then((res) => {
      dispatch(fetchServiceById(serviceId));
      if (!res.error) {
        showSuccessToast("Tarif has been deleted");
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  const handleRemoveSpace = (id) => {
    dispatch(removeSpace(id)).then((res) => {
      dispatch(fetchServiceById(serviceId))
      if (!res.error) {
        showSuccessToast("WorkSpace has been deleted");
        
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  const handleRemoveService = (id) => {
    dispatch(removeService(id)).then((res) => {
      if (!res.error) {
        showSuccessToast("Service has been deleted");
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  const workspaceColumns = [
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "show",
      headerName: "Show",
      width: 100,
      renderCell: (params) => (
        <BiDetail onClick={() => navigate(`space-details/${params.row.id}`)} />
      ),
    },
    {
      field: "update",
      headerName: "Update",
      width: 100,
      renderCell: (params) =>(  <GrDocumentUpdate onClick={() => navigate(`edit-space/${params.row.id}`)}/>),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <MdDeleteOutline
          onClick={() => handleRemoveSpace(params.row.id)}
        />
      ),
    },
  ];

  const tarifColumns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "price", headerName: "Price", width: 120 },
    {
      field: "show",
      headerName: "Show",
      width: 100,
      renderCell: (params) => (
        <BiDetail onClick={() => navigate(`tarif-details/${params.row.id}`)} />
      ),
    },
    {
      field: "update",
      headerName: "Update",
      width: 100,
      renderCell: (params) => (
        <GrDocumentUpdate onClick={() => navigate(`edit-tarif/${params.row.id}`)} />
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <MdDeleteOutline
          onClick={() => handleRemoveTarif(params.row.id)}
        />
      ),
    },
  ];

  const workspaceRows = service?.workSpace.map((elem) => ({
    id: elem.id,
    name: elem.name,
  }));

  const tarifRows = service?.tarif.map((elem) => ({
    id: elem.id,
    name: elem.name,
    price: elem.price,
  }));

  return (
    <div className="view">
      {service && (
        <div className="card mb-3">
          <img
            className="card-img-top"
            src={service.cover?.path}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{service.name}</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
          <button onClick={()=>{handleRemoveService(service.id),navigate(-1)} } > Delete Service</button>
        </div>
      )}
   <div className="d-flex justify-content-between align-items-center">
  <h3>WorkSpace list:</h3>
  <div>
    <AddButton
      onClick={() => navigate(`create-workspace`)}
      content="Create space"
      startIcon
      Icon={<BsPersonWorkspace />}
    />
  </div>
</div>
      <div style={{ height: 400, width: "100%", marginBottom: "20px" }}>
        {workspaceRows&&<DataGrid
          columns={workspaceColumns}
          rows={workspaceRows}
          pageSize={5}
        />}
      </div>
      <div className="d-flex justify-content-between align-items-center">
      <h3 >Tarif's list:</h3>
        <AddButton
          onClick={() => navigate(`create-Tarif`)}
          content="Create new tarif"
          startIcon
          Icon={<MdOutlinePayments />}
        />
      </div>
      <div style={{ height: 400, width: "100%" }}>
       {tarifRows&&<DataGrid columns={tarifColumns} rows={tarifRows} pageSize={5} />}
      </div>
    </div>
  );
}
