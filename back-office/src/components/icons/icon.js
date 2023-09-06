function Icon(props) {
  return (
    <div>
      <img
        style={{ color: "red", width: "45%", height: "40%" }}
        src={props.img}
        className="image_icon"
      />
    </div>
  );
}

export default Icon;
