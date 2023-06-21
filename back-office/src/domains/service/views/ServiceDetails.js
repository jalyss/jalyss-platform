import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchServiceById, removeservice } from "../../../store/service";
import { removeSpace } from "../../../store/space";
import tarif, { removeTarif } from "../../../store/tarif";
import { DataGrid } from "@mui/x-data-grid";
import { BsPersonWorkspace } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { MdOutlinePayments } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";

import "../../../assets/styles/WorkSpaceDetails.css";

import AddButton from "../../../components/buttons/AddButton";



export default function ServiceDetails() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedId, setSelectedId] = useState(null);
  const [tarifId, setTarifId] = useState(null);

  const service = useSelector((state) => state.service.service);

  useEffect(() => {
    dispatch(fetchServiceById(serviceId));
  }, [dispatch]);

  const handleRemoveTarif = (id) => {
    dispatch(removeTarif(id));
    dispatch(fetchServiceById(serviceId));
  };

  const handleRemoveSpace = (id) => {
    dispatch(removeSpace(id));
    dispatch(fetchServiceById(serviceId));
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
        </div>
      )}
      <div className="d-flex justify-content-end">
        <AddButton
          onClick={() => navigate(`create-workspace`)}
          content="Create space"
          startIcon
          Icon={<BsPersonWorkspace />}
        />
      </div>
      <div style={{ height: 400, width: "100%", marginBottom: "20px" }}>
        <DataGrid
          columns={workspaceColumns}
          rows={workspaceRows}
          pageSize={5}
        />
      </div>
      <div className="d-flex justify-content-end">
        <AddButton
          onClick={() => navigate(`create-Tarif`)}
          content="Create new tarif"
          startIcon
          Icon={<MdOutlinePayments />}
        />
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid columns={tarifColumns} rows={tarifRows} pageSize={5} />
      </div>
    </div>
  );
}
