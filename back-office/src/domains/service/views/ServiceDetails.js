import React, { useEffect } from "react";
import  "../../../assets/styles/WorkSpaceDetails.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchServiceById } from "../../../store/service";
import Dropdown from "react-bootstrap/Dropdown";
import AddButton from "../../../components/buttons/AddButton";
import { BsPersonWorkspace } from "react-icons/bs";

// import CreateWorkSpace from '../views/CreateWorkSpace';

export default function ServiceDetails() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const service = useSelector((state) => state.service.service);

  useEffect(() => {
    dispatch(fetchServiceById(serviceId));

  }, [dispatch]);



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



      <div className="spaceListWrapper" >
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
            <div className="d-flex flex-column ">
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
    </div>
  );
}
