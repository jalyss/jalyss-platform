import React from 'react'

export default function spaceDetails() {
  return (
         {/* <div className="spaceListWrapper">
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
      </div> */}
  )
}
