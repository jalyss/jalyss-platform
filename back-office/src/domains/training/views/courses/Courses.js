import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletcours, fetchcours } from "../../../../store/courses";
import { findAllSessionTitles } from "../../../../store/sessions";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import Select from "react-select";

const Courses = () => {
  const [titles, setTitles] = useState();
  const [data, setData] = useState();
  const coursStore = useSelector((state) => state.courses.courses.items);
  const titlesData = useSelector((state) => state.sessions.session);
  console.log(data, "eeee");
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  useEffect(() => {
    dispatch(fetchcours());
    dispatch(findAllSessionTitles());
    const updatedTitles = titlesData?.map((post) => ({
      value: post.title,
      label: post.title,
    }));
    setTitles(updatedTitles);
  }, [data]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletecoursClick = (id) => {
    dispatch(deletcours(id)).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("COURS has been deleted");
      }
    });
  };

  return (
    <div>
      <div className="button category">
        <div className="button add">
          <Button
            sx={{ marginLeft: "900px" }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={() => {
              navigate("/training/courses/AddNewCours");
            }}
          >
            add new course
          </Button>
        </div>
      </div>
      <label
        className="d-flex justify-content-center"
        style={{ width: "100%", marginTop: "5px" }}
      >
        <div>
          <Select
            onChange={(e) => {
              setData(e);
            }}
            placeholder="Search by sessions"
            options={titles}
            isMulti
          />
        </div>
      </label>
      {!data?.length ? (
        <div
          className="cart"
          style={{
            marginLeft: 30,
            marginTop: "100px",
            boxShadow: 20,
            display: "grid",
            gridTemplateColumns: "repeat(3 ,1fr)",
            gap: "20px",
          }}
        >
          {coursStore.map((el, i) => (
            <Card style={{ width: 300 }} key={i}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=600"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  titel: {el.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Content: {el.content}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Start-At: {el.startAt}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  End-At: {el.endAt}
                </Typography>

                {el.sessions && el.sessions.length > 0 && (
                  <Typography variant="body2" color="text.secondary">
                    Sessions:
                    {el.sessions.map((session, index) => (
                      <span key={index}> {session.session.title},</span>
                    ))}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => handleDeletecoursClick(el.id)}
                >
                  Delete
                </Button>
                <Button size="small" onClick={() => navigate(`${el.id}`)}>
                  Update
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      ) : (
        <div
          className="cart"
          style={{ marginLeft: 30, marginTop: "100px", boxShadow: 20 }}
        >
          <div
          className="cart"
          style={{
            marginLeft: 30,
            marginTop: "100px",
            boxShadow: 20,
            display: "grid",
            gridTemplateColumns: "repeat(3 ,1fr)",
            gap: "20px",
          }}
        >
          {coursStore
            .filter((el) =>
              el.sessions.some((session) =>
                data.some(
                  (selectedSession) =>
                    selectedSession.label === session.session.title
                )
              )
            )
            .map((el, i) => (
              <Card style={{ width: 300 }} key={i}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image="https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=600"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Title: {el.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Content: {el.content}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Start-At: {el.startAt}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    End-At: {el.endAt}
                  </Typography>

                  {el.sessions && el.sessions.length > 0 && (
                    <Typography variant="body2" color="text.secondary">
                      Sessions:
                      {el.sessions.map((session, index) => (
                        <span key={index}> {session.session.title},</span>
                      ))}
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => handleDeletecoursClick(el.id)}
                  >
                    Delete
                  </Button>
                  <Button size="small" onClick={() => navigate(`${el.id}`)}>
                    Update
                  </Button>
                </CardActions>
              </Card>
            ))}
              </div>
        </div>
      )}
      {/* Check if the filtered array is empty */}
      {data?.length > 0 &&
        coursStore
          .filter((el) =>
            el.sessions.some((session) =>
              data.some(
                (selectedSession) => selectedSession.label === session.session.title
              )
            )
          )
          .length === 0 &&   <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "10pc",
          }}
        >
          <div style={{ color: "grey" }}>
            No users to show
          </div>
        </div>}
    </div>
  );
};

export default Courses;
