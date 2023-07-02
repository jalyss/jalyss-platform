import React, { useEffect, useState } from "react";
import "../../../assets/styles/WorkSpaceDetails.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchServiceById, removeservice } from "../../../store/service";
import { removeSpace } from "../../../store/space";
import tarif, { removeTarif } from "../../../store/tarif";
import Dropdown from "react-bootstrap/Dropdown";
import AddButton from "../../../components/buttons/AddButton";
import { BsPersonWorkspace } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { MdOutlinePayments } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

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

  console.log(serviceId, "SerID");
  console.log(tarifId, "tarifID");
  console.log(selectedId, "selectedId");

  const handleRemoveTarif = (id) => {
    dispatch(removeTarif(id));
    dispatch(fetchServiceById(serviceId));
  };

  const handleRemoveSpace = (id) => {
    dispatch(removeSpace(id));
    dispatch(fetchServiceById(serviceId));
  };

  const columnsWorkSpace = [
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "show",
      headerName: "Show",
      flex: 0.5,
      renderCell: (params) => (
        <GridActionsCellItem
          icon={<BiDetail />}
          onClick={() => navigate(`space-details/${params.row.id}`)}
        />
      ),
    },
    {
      field: "update",
      headerName: "Update",
      flex: 0.5,
      renderCell: () => <GrDocumentUpdate />,
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.5,
      renderCell: (params) => (
        <GridActionsCellItem
          icon={<MdDeleteOutline />}
          onClick={() => handleRemoveSpace(params.row.id)}
        />
      ),
    },
  ];

  const columnsTarif = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    {
      field: "show",
      headerName: "Show",
      flex: 0.5,
      renderCell: (params) => (
        <GridActionsCellItem
          icon={<BiDetail />}
          onClick={() => navigate(`tarif-details/${params.row.id}`)}
        />
      ),
    },
    {
      field: "update",
      headerName: "Update",
      flex: 0.5,
      renderCell: (params) => (
        <GridActionsCellItem
          icon={<GrDocumentUpdate />}
          onClick={() => navigate(`edit-tarif/${params.row.id}`)}
        />
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.5,
      renderCell: (params) => (
        <GridActionsCellItem
          icon={<MdDeleteOutline />}
          onClick={() => handleRemoveTarif(params.row.id)}
        />
      ),
    },
  ];

  return (
    <div className="view">
      {service && (
        <div class="card mb-3">
          <img
            class="card-img-top"
            src={service.cover?.path}
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{service.name}</h5>
            <p class="card-text">
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
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={service?.workSpace}
          columns={columnsWorkSpace}
          autoHeight
          disableColumnMenu
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

      <div className="d-flex justify-content-center align-items-center">
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={service?.tarif}
            columns={columnsTarif}
            autoHeight
            disableColumnMenu
          />
        </div>
      </div>
    </div>
  );
}
