import Flickity from "react-flickity-component";
import { Link } from "react-router-dom";
import css from "../../style/carousel.css";
// import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SessionsCard = ({ sessions }) => {
  // const navigate = useNavigate();
  // const { t, i18n } = useTranslation();
  function extractTextFromHTML(html) {
    const temporaryElement = document.createElement("div");
    temporaryElement.innerHTML = html;
    return (
      temporaryElement.textContent.substring(0, 100) ||
      temporaryElement.innerText.substring(0, 100) ||
      ""
    );
  }
  const flickityOptions = {
    cellalign: "left",
    pageDots: false,
    groupCells: true,
    selectedAttraction: 0.01,
    friction: 0.1,
  };
  useEffect(() => {});
  return (
    <div>
      {sessions.length ? (
        <div className="row p-3">
          <h1 className="secondLine p-5">Sessions results</h1>
          <Flickity
            className={"sessions"}
            elementType={"div"}
            options={flickityOptions}
            disableImagesLoaded={false}
          >
            {sessions.map((blog, i) => (
              <div
                className="card-sessions blogItemWrapper"
                key={blog.id}
                style={{ cursor: "pointer" }}
              >
                {blog.cover ? (
                  <img
                    className="blogItemCover"
                    src={blog.cover.path}
                    alt="cover"
                    onClick={() => navigate(`/blogs/${blog.id}`)}
                  />
                ) : (
                  <img
                    className="blogItemCover"
                    src="https://www.ultimatesource.toys/wp-content/uploads/2013/11/dummy-image-landscape-1-1024x800.jpg"
                    alt="cover"
                    onClick={() => navigate(`/sessions/${blog.id}`)}
                  />
                )}
                <div
                  className="chip mt-3"
                  onClick={() => navigate(`/sessions/${blog.id}`)}
                >
                  {blog.category.nameEn}
                </div>
                <div
                  className="d-flex flex-column gap-2"
                  onClick={() => navigate(`/sessions/${blog.id}`)}
                >
                  <h5 style={{ margin: "20px", flex: "1" }}>{blog.titleEn}</h5>

                  <p className="blogItemDescription">
                    {" "}
                    <p>{extractTextFromHTML(blog.descriptionEn)}</p>
                  </p>
                </div>

                <div className="blogItemFooter d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    {/* {blog.author.avatar ? (
                  <img
                    className="blogItemAuthorAvatar"
                    src={blog.author.avatar.path}
                    alt="avatar"
                  />
                ) : ( */}
                    <img
                      className="blogItemAuthorAvatar"
                      src="https://static-00.iconduck.com/assets.00/user-avatar-icon-512x512-vufpcmdn.png"
                      alt="avatar"
                    />
                    {/* )} */}
                    <div className="d-flex flex-column">
                      {/* <h6 className="mt-3">{blog.author.fullNameEn}</h6> */}
                      <p
                        style={{
                          fontSize: "0.6rem",
                          color: "#a9a9a9",
                          fontWeight: "600",
                        }}
                      >
                        {blog.createdAt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Flickity>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default SessionsCard;
