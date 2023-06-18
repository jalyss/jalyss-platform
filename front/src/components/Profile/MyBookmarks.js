import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import { fetchBookmarks, removeBookmark } from "../../store/bookmarks";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

const MyBookmarks = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookmarksStore = useSelector((state) => state.bookmark);
  const authStore = useSelector((state) => state.auth);

  const { bookmarks } = bookmarksStore;

  const [skip, setSkip] = useState(0);

  const take = 6;

  useEffect(() => {
    if (authStore.me) {
      dispatch(fetchBookmarks({ skip, take }));
      console.log(bookmarks, "wesh");
      console.log(bookmarksStore.bookmarks, "lol");
    }
  }, [dispatch, authStore.me, skip, take]);

  const handleRemoveBookmark = (blogId) => {
    dispatch(removeBookmark(blogId)).then((res) => {
      if (!res.error) {
        showSuccessToast(t("bookmark removed"));
      } else {
        showErrorToast(t("bookmark.removeError"));
      }
    });
  };
  const handleChangeSkip = (event, value) => {
    setSkip((value - 1) * take);
  };

  function extractTextFromHTML(html) {
    const temporaryElement = document.createElement("div");
    temporaryElement.innerHTML = html;
    return (
      temporaryElement.textContent.substring(0, 100) ||
      temporaryElement.innerText.substring(0, 100) ||
      ""
    );
  }

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div
        style={{
          borderTop: "0.5px",
          height: "1px",
          width: "100%",
          backgroundColor: "#a9a9a9",
        }}
      />
      <div className="blogListWrapper">
        {bookmarks.items.map((bookmark) => (
          <div
            className="blogItemWrapper"
            key={bookmark.blog.id}
            style={{ cursor: "pointer" }}
          >
            {bookmark.blog.cover ? (
              <img
                className="blogItemCover"
                src={bookmark.blog.cover.path}
                alt="cover"
                onClick={() => navigate(`/blogs/${bookmark.blog.id}`)}
              />
            ) : (
              <img
                className="blogItemCover"
                src="https://www.ultimatesource.toys/wp-content/uploads/2013/11/dummy-image-landscape-1-1024x800.jpg"
                alt="cover"
                onClick={() => navigate(`/blogs/${bookmark.blog.id}`)}
              />
            )}
            <div
              className="chip mt-3"
              onClick={() => navigate(`/blogs/${bookmark.blog.id}`)}
            >
              {bookmark.blog.category.nameEn}
            </div>
            <div
              className="d-flex flex-column gap-2"
              onClick={() => navigate(`/blogs/${bookmark.blog.id}`)}
            >
              <h5 style={{ margin: "20px", flex: "1" }}>
                {bookmark.blog.title}
              </h5>
              <p className="blogItemDescription">
                <p>{extractTextFromHTML(bookmark.blog.content)}</p>
              </p>
            </div>
            <div className="blogItemFooter d-flex justify-content-between">
              <div className="d-flex align-items-center">
                {bookmark.blog.author.avatar ? (
                  <img
                    className="blogItemAuthorAvatar"
                    src={bookmark.blog.author.avatar.path}
                    alt="avatar"
                  />
                ) : (
                  <img
                    className="blogItemAuthorAvatar"
                    src="https://static-00.iconduck.com/assets.00/user-avatar-icon-512x512-vufpcmdn.png"
                    alt="avatar"
                  />
                )}
                <div className="d-flex flex-column">
                  <h6 className="mt-3">{bookmark.blog.author.fullNameEn}</h6>
                  <p
                    style={{
                      fontSize: "0.6rem",
                      color: "#a9a9a9",
                      fontWeight: "600",
                    }}
                  >
                    {bookmark.blog.createdAt}
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
                  <Dropdown.Item
                    onClick={() => handleRemoveBookmark(bookmark.id)}
                  >
                    {t("bookmark.remove")}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center my-5">
        <Pagination
          count={Math.ceil(bookmarks.totalCount / take)}
          color="secondary"
          variant="outlined"
          onChange={handleChangeSkip}
        />
      </div>
    </section>
  );
};

export default MyBookmarks;
