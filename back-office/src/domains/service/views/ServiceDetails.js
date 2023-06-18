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
import { MdOutlinePayments } from "react-icons/md";
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

  const [basicModal, setBasicModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [tarifId, setTarifId] = useState(null);


  const toggleShow = () => setBasicModal(!basicModal);
  const service = useSelector((state) => state.service.service);

  useEffect(() => {
    dispatch(fetchServiceById(serviceId));
  }, [dispatch]);

  console.log(serviceId, "SerID");
  console.log(tarifId ,"tarifID");
  console.log(selectedId, "selectedId");

console.log(service,"serrrrr")


  const handleRemove = (selectedId, serviceId,tarifId) => {
    if (selectedId !== null) {
      dispatch(removeSpace(selectedId));
      setSelectedId(null);
    }
    if (tarifId !== null) {
      dispatch(removeTarif(tarifId));
      setTarifId(null)
    }
  
   else if (serviceId !== null && selectedId === null &&  tarifId === null) {
      dispatch(removeservice(serviceId));
    }
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

      <div className="spaceListWrapper">
        {service?.workSpace.map((elem, i) => (
          <div
            key={elem.id}
            className="spaceItemWrapper"
            style={{ cursor: "pointer" }}
          >
            {elem.image ? (
              <img
                className="spaceItemCover"
                src={elem.image?.path}
                alt={elem.image?.alt}
              />
            ) : (
              <img
                className="spaceItemCover"
                src="https://www.ultimatesource.toys/wp-content/uploads/2013/11/dummy-image-landscape-1-1024x800.jpg"
                alt="cover"
              />
            )}
            <div className="d-flex flex-column">
              <h5 style={{ margin: "20px", flex: "1" }}>{elem.name}</h5>

              <h7 style={{ margin: "20px", flex: "1" }}>{elem.description}</h7>

              <h8 style={{ margin: "20px", flex: "1" }}>{elem.amenities}</h8>
            </div>

            <div className="spaceItemFooter d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column">
                  <h5 className="mt-3">Price: {elem.price}</h5>
                  <p
                    style={{
                      fontSize: "0.6rem",
                      color: "#a9a9a9",
                      fontWeight: "600",
                    }}
                  >
                    Capacity: {elem.capacity}
                  </p>
                </div>
              </div>

              <Dropdown>
                <Dropdown.Toggle
                  className="ellipsis-btn dropdownToggleBlogCard"
                  style={{ all: "unset" }}
                >
                  <span>&#8942;</span>
                </Dropdown.Toggle>
                <Dropdown.Menu size="sm" title="">
                  <>
                    <Dropdown.Item
                      onClick={() => {
                        setSelectedId(elem.id);
                        setBasicModal(true);
                      }}
                    >
                      Delete
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("")}>
                      Update
                    </Dropdown.Item>
                  </>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        ))}
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
        {service?.tarif.map((item, index) => (
          <div className="col-md-2.5 mx-1" key={index}>
            <div
              className="card serviceCard"
              style={{
                borderRadius: 25,
                transition: "all 1.6s ease-in-out",
              }}
            >
              <div className="card-body service">
                <h1 className="card-title serviceType">{item.name}</h1>
                <p className="soustitle">Capacity: {item.capacity}</p>
                <p>{item.description}</p>
                <p>Duration:{item.duration}</p>

                <div className="price">
                  Only <a className="priceNumber"> {item.price}</a>DT
                  <p>Price per day:{item.pricePerDay}</p>
                </div>
                <div className="d-flex align-items-center">
                  <Dropdown>
                    <Dropdown.Toggle
                      className="ellipsis-btn dropdownToggleBlogCard"
                      style={{ all: "unset" }}
                    >
                      <span>&#8942;</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu size="sm" title="">
                      <>
                        <Dropdown.Item
                          onClick={() => {
                            setTarifId(elem.id);
                            setBasicModal(true);
                          }}
                        >
                          Delete
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate("")}>
                          Update
                        </Dropdown.Item>
                      </>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <>
          <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Delete</MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={toggleShow}
                  ></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>Press continue to delete</MDBModalBody>

                <MDBModalFooter>
                  <button
                    color="secondary"
                    type="button"
                    class="btn btn-secondary btn-sm"
                    onClick={toggleShow}
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    onClick={() => {
                      handleRemove(selectedId, serviceId,tarifId);
                      setBasicModal(false);
                    }}
                  >
                    Continue
                  </button>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </>
    </div>
  );
}
