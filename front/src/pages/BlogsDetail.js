import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBlog } from "../store/blog";
import { useSelector } from "react-redux";

const BlogDetail = () => {
  const dispatch = useDispatch();
  
  const { blogId } = useParams();
  const navigate = useNavigate();
  // const [selectedBlog, setSelectedBlog] = useState(blog[blogId]);
  const blogStore = useSelector((state) => state.blog);
  const { blog } = blogStore;
  useEffect(() => {
    console.log("Dispatching fetchBlog action...");
    dispatch(fetchBlog(blogId))
  }, []);
 console.log("jj",blog);

  const handleBlogSelection = (blog) => {
    setSelectedBlog(blog);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!blog) {
    // Render a loading indicator or placeholder while waiting for the data
    return <div>Loading...</div>;
  }
  return (
    <BlogDetailWrapper>
       <BlogDetailContent>
        <HeaderContent>
          <GoBackLink onClick={() => navigate(-1)}>
            <span> &#8592;</span> <span>Go Back</span>
          </GoBackLink>
          <BookmarkIcon>
            <span>&#x1F516;</span>
          </BookmarkIcon>
        </HeaderContent>
        <BlogContainer> 
           <BlogHeader>
            <BlogDate>Published {blog.createdAt}</BlogDate>

            <Title>{blog.title}</Title>

            <CategoryInfo>
              <CategoryLabel>Category:</CategoryLabel>
              <SubCategoryList>
              
              </SubCategoryList>
            </CategoryInfo> 
             <AuthorContainer>
              <AuthorAvatar
                src={blog.authorAvatar}
                alt="Author Avatar"
              />
              <AuthorName>{blog.authorName}</AuthorName>
            </AuthorContainer> 
           </BlogHeader>
          <BlogImg src={blog.cover} alt="cover" />
           
          <BlogDescription> <span dangerouslySetInnerHTML={{ __html: blog.content }} ></span></BlogDescription>
        </BlogContainer>
      </BlogDetailContent>

      <BlogDetailSidebar>
        <AuthorAvatarr src={blog.authorAvatar} alt="author-avatar" />
        <AuthorNamee>{blog.authorName}</AuthorNamee>
        <MoreFromAuthor>More from {blog.authorName}</MoreFromAuthor> 
        {/* <SideContainer>
          {blogss
            .filter(
              (blog) =>
                blog.authorName === selectedBlog.authorName &&
                blog.id !== selectedBlog.id
            )

            // .slice(0, 3)
            .map((blog) => (
              <SideBlogContainer
                key={blog.id}
                onClick={() => handleBlogSelection(blog)}
              >
                <SideBlogTitle>
                  {blog.title}
                  <br />
                  <span>Category: </span> <small>{blog.category}</small>
                </SideBlogTitle>
                <SideBlogImage src={blog.cover} alt="blog-cover" />
              </SideBlogContainer>
            ))}
        </SideContainer> */}
        
      </BlogDetailSidebar>
    </BlogDetailWrapper>
  );
};
const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const BookmarkIcon = styled.span`
  cursor: pointer;
  font-size: 30px;
  margin-bottom: 2rem;
  /* Responsive adjustments */
  @media (max-width: 768px) {
    top: -20px;
  }

  @media (max-width: 480px) {
    top: -30px;
  }
`;

const SideBlogContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;
`;
const SideContainer = styled.div`
  margin-top: 10px;
`;

const SideBlogTitle = styled.h6`
  flex: 1;
  span {
    color: #6c757d;
    font-size: 0.8rem;
  }
`;

const SideBlogImage = styled.img`
  width: 100px;
  height: 80px;
  object-fit: cover;
  margin-left: 8px;
  border-radius: 15px;
`;
const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem;
`;

const AuthorAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 1rem;
`;

const AuthorName = styled.h3`
  font-size: 1.2rem;
  color: #333;
`;
const BlogDetailWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  width: 100%;
`;

const BlogDetailContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 30px;
  border-right: 1px dashed #ccc;
  padding-right: 20px;
`;

const BlogDetailSidebar = styled.div`
  width: 300px;
  margin-top: 15px;
`;
const AuthorAvatarr = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const AuthorNamee = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 50px;
`;

const BlogContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const GoBackLink = styled.div`
  text-decoration: none;
  font-size: 0.8rem;
  color: #a9a9a9;
  font-weight: 500;
  margin-bottom: 2rem;
  display: block;
  cursor: pointer;
`;

const BlogHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BlogDate = styled.p`
  font-size: 0.8rem;
  color: #a9a9a9;
  font-weight: 500;
`;

const BlogImg = styled.img`
  width: 100%;
  border-radius: 15px;
`;

const BlogSubCategory = styled.div`
  display: flex;
  justify-content: center;
`;

const CategoryChip = styled.div`
  margin: 1rem;
`;

const BlogDescription = styled.p`
  padding: 1rem;
  margin-top: 1.5rem;
`;
const CategoryInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;
  margin: 0.5rem;
  ${BlogDate} {
    margin-left: auto;
  }
`;

const CategoryLabel = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
  color: #333;
`;

const SubCategoryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
`;

const SubCategoryItem = styled.li`
  font-size: 0.7rem;
  background: linear-gradient(to right, #6190e8, #a7bfe8);
  color: #fff;
  padding: 0.3rem 0.5rem;
  border-radius: 5px;
  width: fit-content;
  text-transform: capitalize;
  margin: 0 4px;
`;
const MoreFromAuthor = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  color: #3a0b50;
  text-decoration: underline;
  font-style: italic;
`;
const Title = styled.h1`
  text-align: center;
  white-space: pre-line;
`;

export default BlogDetail;
