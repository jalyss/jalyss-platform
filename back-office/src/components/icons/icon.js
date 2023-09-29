function Icon(props) {
  return (
    <>
      {props?.modalId ? (
        <div
          data-bs-toggle="modal"
          data-bs-target={props.modalId}
          style={{ padding: 0, margin: 0 }}
        >
          <img
            style={{ color: "red", width: "35%", height: "35%" }}
            src={props.img}
            className="image_icon"
          />
        </div>
      ) : (
        <div style={{ padding: 0, margin: 0 }}>
          <img
            style={{ color: "red", width: "35%", height: "35%" }}
            src={props.img}
            className="image_icon"
          />
        </div>
      )}
    </>
  );
}

export default Icon;
