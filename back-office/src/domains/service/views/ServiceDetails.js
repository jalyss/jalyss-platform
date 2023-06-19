import React, { useEffect,useState} from "react";
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
import { BiDetail} from 'react-icons/bi';
import { MdOutlinePayments } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
       
MdDeleteOutline
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

// import CreateWorkSpace from '../views/CreateWorkSpace';

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
  console.log(tarifId ,"tarifID");
  console.log(selectedId, "selectedId");


  const handleRemoveTarif = (id) => {
      dispatch(removeTarif(id));
      dispatch(fetchServiceById(serviceId));
  }

  const handleRemoveSpace = (id) => {
    dispatch(removeSpace(id));
    dispatch(fetchServiceById(serviceId));
}

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
            <div class="lightbox">
              <div class="multi-carousel">
                <div class="multi-carousel-inner">
                  <div class="multi-carousel-item">
                    <img
                      src={service.MediaService?.media?.path}
                      alt={service.MediaService?.media?.alt}
                      class="w-100"
                    />
                  </div>
                </div>
              </div>
              <button
      class="carousel-control-prev"
      type="button"
      tabindex="0"
      data-mdb-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      tabindex="0"
      data-mdb-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
    </button>
            </div>

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
      <table class="table table-sm">
  <thead>
    <tr>

      <th scope="col">Name</th>
      <th scope="col">Show</th>
      <th scope="col">Update</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
      {service?.workSpace.map((elem, i) => (
  <tbody key={elem.id}>
    <tr>

      <td>{elem.name}</td>
      <td><BiDetail/></td>
      <td><GrDocumentUpdate/></td>
      <td onClick={()=>{console.log("wiw",elem.id);handleRemoveSpace(elem.id)}}><MdDeleteOutline/></td>
      
    </tr>
  </tbody>
   ))}
</table>

      <div className="d-flex justify-content-end">
        <AddButton
          onClick={() => navigate(`create-Tarif`)}
          content="Create new tarif"
          startIcon
          Icon={<MdOutlinePayments />}
        />
      </div>

      <div className="d-flex justify-content-center align-items-center">
       
       <table class="table table-sm">
  <thead>
    <tr>

      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Show</th>
      <th scope="col">Update</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
      {service?.tarif.map((elem, i) => (
  <tbody key={elem.id}>
    <tr>

    <td>{elem.name}</td>
      <td>{elem.price}</td>
      <td onClick={() =>{ navigate(`tarif-details/${elem.id}`)}}><BiDetail/></td>
      <td ><GrDocumentUpdate/></td>
     <td onClick={() => { console.log("wiw",elem.id);
    ;
    handleRemoveTarif(elem.id)
      }} ><MdDeleteOutline/></td>
      
    </tr>
  </tbody>
   ))}
</table>
    </div>
    </div>
  );
}
