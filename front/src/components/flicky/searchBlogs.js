import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import css from "../../style/carousel.css";
import Flickity from "react-flickity-component";
const SearchBlogs = ({ blogs }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  // const blogStore = useSelector((state) => state.blog);
  // const { blogs } = blogStore;
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
    // autoPlay: 1500,
    // pauseAutoPlayOnHover: false,
  };

  return (
    <div>
      {blogs.length ? (
        <div className="row p-3 p-md-2 p-sm-1">
          <h1 className="secondLine">Blogs results</h1>
          <Flickity
            className={"carousel"}
            elementType={"div"}
            options={flickityOptions}
            disableImagesLoaded={false}
          >
            <div></div>
            {blogs.map((blog, i) => (
              <div
                className="blog-card"
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
                    onClick={() => navigate(`/blogs/${blog.id}`)}
                  />
                )}
                <div className="d-flex flex-column align-items-start p-3 gap-1">
                  <div
                    className="chip"
                    onClick={() => navigate(`/blogs/${blog.id}`)}
                  >
                    {blog.category.nameEn}
                  </div>
                  <div
                    className="d-flex flex-column pt-1"
                    onClick={() => navigate(`/blogs/${blog.id}`)}
                  >
                    <h5>{blog.title}</h5>

                    <p className="blogItemDescription">
                      <p>{extractTextFromHTML(blog.content)}</p>
                    </p>
                  </div>

                  <div className="blogItemFooter d-flex justify-content-between justify-content-sm-start">
                    <div className="d-flex align-items-center">
                      {/* {blog.author.avatar ? (
                  <img
                    className="blogItemAuthorAvatar"
                    src={blog.author.avatar?.path}
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
                        <h6 className="mt-3">{blog.author.fullNameEn}</h6>
                        <p
                          style={{
                            fontSize: `0.6rem`,
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
export default SearchBlogs;
