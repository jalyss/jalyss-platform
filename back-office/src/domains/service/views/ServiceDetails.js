import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchServiceById, removeService } from "../../../store/service";
import { removeSpace } from "../../../store/space";
import tarif, { removeTarif } from "../../../store/tarifs";
import { DataGrid } from "@mui/x-data-grid";
import { BsPersonWorkspace } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { MdOutlinePayments } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";



import AddButton from "../../../components/buttons/AddButton";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import "../../../assets/styles/ServiceDetails.css";

export default function ServiceDetails() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null);
  const [basicModal, setBasicModal] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const toggleShow = (type, id) => {
    setDeleteType(type);
    setDeleteId(id);
    setBasicModal(!basicModal);
    
  };

  const id = serviceId;
  const service = useSelector((state) => state.service.service);

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
      dispatch(fetchServiceById(serviceId));
      if (!res.error) {
        showSuccessToast("WorkSpace has been deleted");
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  const handleRemoveService = (serviceId) => {
    dispatch(removeService(serviceId)).then((res) => {
      if (!res.error) {
        showSuccessToast("Service has been deleted");
        navigate(-1);
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
      renderCell: (params) => (
        <GrDocumentUpdate
          onClick={() => navigate(`edit-space/${params.row.id}`)}
        />
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <MdDeleteOutline
          onClick={() => toggleShow("space", params.row.id)}
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
        <GrDocumentUpdate
          onClick={() => navigate(`edit-tarif/${params.row.id}`)}
        />
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <MdDeleteOutline onClick={() => toggleShow("tarif", params.row.id)} />
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

  const handleConfirmDelete = () => {
    if (deleteType === "space") {
      handleRemoveSpace(deleteId);
    } else if (deleteType === "tarif") {
      handleRemoveTarif(deleteId);
    } else if (deleteType === "service") {
      handleRemoveService(deleteId);
    }
    setBasicModal(false);
  };

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
            <p className="card-text">{service.description}</p>
          </div>
          <button onClick={() => toggleShow("service", service.id)}>
            Delete Service
          </button>
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
        {workspaceRows && (
          <DataGrid columns={workspaceColumns} rows={workspaceRows} pageSize={5} />
        )}
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <h3>Tarif's list:</h3>
        <AddButton
          onClick={() => navigate(`create-Tarif`)}
          content="Create new tarif"
          startIcon
          Icon={<MdOutlinePayments />}
        />
      </div>
      <div style={{ height: 400, width: "100%" }}>
        {tarifRows && (
          <DataGrid columns={tarifColumns} rows={tarifRows} pageSize={5} />
        )}
      </div>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Delete</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setBasicModal(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>Press continue to delete</MDBModalBody>
            <MDBModalFooter>
              <button
                color="secondary"
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setBasicModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleConfirmDelete}
              >
                Continue
              </button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}
