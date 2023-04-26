import React, { useState } from "react";
import styled from "styled-components";
import { FaFire } from "react-icons/fa";

function Blogs() {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "7 CSS tools you should be using ",
      category: "development",
      subCategory: ["frontend", "ui/ux", "design"],
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      authorName: "John Doe",
      authorAvatar:
        "https://www.seekpng.com/png/detail/506-5062029_about-the-author-avatar.png",
      createdAt: "June 03, 2021",
      cover:
        "https://firstsiteguide.com/wp-content/uploads/2017/06/personal.png",
    },
    {
      id: 2,
      title: "Milan Places That Highlight The City",
      category: "travel",
      subCategory: ["vacation", "holidays", "sight seeing"],
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      authorName: "John Doe",
      authorAvatar:
        "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png",
      createdAt: "June 03, 2021",
      cover:
        "https://cdn.dribbble.com/users/22136/screenshots/13929049/media/8481526fd29b0d7c346bb6e1ae30960f.jpg?compress=1&resize=400x300",
    },
    {
      id: 3,
      title: "Online Shopping – An Alternative to Shopping in the Mall",
      category: "shopping",
      subCategory: ["e-commerce store", "clothing", "shopping store"],
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      authorName: "John Doe",
      authorAvatar:
        "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg",
      createdAt: "June 03, 2021",
      cover:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/makeup-blog-cover-header-template-design-e54ae757dbec04731c9453e7e583eacd_screen.jpg?ts=1599078201",
    },
    {
      id: 4,
      title: "ADVENTURE IN YOU",
      category: "adventure",
      subCategory: ["adrenaline", "stay-fit", "lifestyle"],
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      authorName: "John Doe",
      authorAvatar:
        "https://im.indiatimes.in/content/2022/Feb/AMP-44_61fb8b8840826.jpg?w=820&h=540&cc=1",
      createdAt: "June 03, 2021",
      cover:
        "https://www.shutterstock.com/image-vector/podcast-covers-standtype-studio-microphone-260nw-1936658734.jpg",
    },
    {
      id: 5,
      title: "Loaded BBQ Baked Potatoes",
      category: "cooking",
      subCategory: ["bbq", "food", "lifestyle"],
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      authorName: "John Doe",
      authorAvatar: "https://cdn-icons-png.flaticon.com/512/5556/5556468.png",
      createdAt: "June 03, 2021",
      cover:
        "https://www.designhill.com/design-blog/wp-content/uploads/2018/04/Book-Cover-Design.jpg",
    },
    {
      id: 6,
      title: "Beyond the Beach",
      category: "travel",
      subCategory: ["beaches", "sea", "holidays"],
      description:
        "Lorem Ipsum is simply dummy text of th, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      authorName: "John Doe",
      authorAvatar:
        "https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Transparent-Picture.png",
      createdAt: "June 03, 2021",
      cover:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWqYwuYrk6znDSzzI1QAt3dxoI3A6YtTfWZg&usqp=CAU",
    },
    {
      id: 7,
      title: "Art & Perception",
      category: "art",
      subCategory: ["skill", "design", "passion"],
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      authorName: "John Doe",
      authorAvatar:
        "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
      createdAt: "June 03, 2021",
      cover: "https://i.ytimg.com/vi/s9rj6xWIkeA/maxresdefault.jpg",
    },
  ]);
  const [trendingBlogs, setTrendingBlogs] = useState([
    {
      id: 7,
      authorName: "John Doe",
      title: "Art & Perception",
      authorAvatar:
        "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
      createdAt: "June 03, 2021",
    },
    {
      id: 11,
      authorName: "Jane Smith",
      title: "The Science of Cooking",
      authorAvatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_I7naanAwdaK0p6sjZWAJzqHy3QD71Wb6syF4OvJwegZAn1HYPS-2EmcMZjw57AHe8Tc&usqp=CAU",
      createdAt: "September 14, 2020",
    },
    {
      id: 42,
      authorName: "Samantha Lee",
      title: "Travel Photography",
      authorAvatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      createdAt: "July 02, 2021",
    },
    {
      id: 12,
      authorName: "Olivia Brown",
      title: "Healthy Eating Habits for a Better Life",
      authorAvatar:
        "https://www.americantravelblogger.com/wp-content/uploads/2017/09/3pRiRvW4.jpg",
      createdAt: "November 27, 2021",
    },
    {
      id: 11,
      authorName: "David Lee",
      title: "The Future of Electric Cars",
      authorAvatar:
        "https://photographypro.com/wp-content/uploads/2017/08/portrait-photography-focal-length-telephoto-1.jpg",
      createdAt: "October 15, 2021",
    },
    {
      id: 11,
      authorName: "Jane Smith",
      title: "The Science of Cooking",
      authorAvatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt5nzi_lZnB56agglieG1ABy2Pyho61Z0ydjDTzKCTkKxGcaZ45gvCgT0r0k6MG9tQ&usqp=CAU",
      createdAt: "September 14, 2020",
    },
  ]);
  return (
    <div>
      <Header>
        <Subtitle>
          Welcome to Jalyss Blog <span>&#128075;</span>  
        </Subtitle>
        <Description>
          The path to personal growth <br /> exploring change and development
          through reading.
        </Description>
      </Header>
      <SearchBarWrap>
        <SearchForm>
          <SearchInput type="text" placeholder="Search By Category" />
          <GoButton>Go</GoButton>
        </SearchForm>
      </SearchBarWrap>

      <StyledHeading>
        <FaFire />
        Trending on Jalyss
      </StyledHeading>
      <Container>
        <TrendingBlogsContainer>
          {trendingBlogs.map((blog, index) => (
            <BlogContainer key={blog.id}>
              <BlogNumber>{`${(index + 1)
                .toString()
                .padStart(2, "0")}`}</BlogNumber>
              <BlogAuthorAvatar src={blog.authorAvatar} alt={blog.authorName} />
              <BlogDetails>
                <BlogAuthorName>{blog.authorName}</BlogAuthorName>
                <BlogTitle>{blog.title}</BlogTitle>
                <BlogCreatedAt>{blog.createdAt}</BlogCreatedAt>
              </BlogDetails>
            </BlogContainer>
          ))}
        </TrendingBlogsContainer>
      </Container>
      <Separator />
      <BlogListWrapper>
        {blogs.map((blog) => (
          <BlogItemWrapper key={blog.id}>
            <BlogItemCover src={blog.cover} alt="cover" />
            <Chip>{blog.category}</Chip>
            <BlogItemTitle>{blog.title}</BlogItemTitle>
            <BlogItemDescription>{blog.description}</BlogItemDescription>
            <BlogItemFooter>
              <BlogItemAuthor>
                <BlogItemAuthorAvatar src={blog.authorAvatar} alt="avatar" />
                <BlogItemAuthorInfo>
                  <BlogItemAuthorName>{blog.authorName}</BlogItemAuthorName>
                  <BlogItemAuthorDate>{blog.createdAt}</BlogItemAuthorDate>
                </BlogItemAuthorInfo>
              </BlogItemAuthor>
              <BlogItemLink>➝</BlogItemLink>
            </BlogItemFooter>
          </BlogItemWrapper>
        ))}
      </BlogListWrapper>
    </div>
  );
}
const Header = styled.header`
  text-align: center;
`;

const Title = styled.h2`
  color: #0080ff;
  font-size: 2rem;
`;

const Subtitle = styled.h1`
  font-size: 3rem;
  color: #0f52ba;
  margin-bottom: 1rem;
  margin-top: 3rem;
  span {
    color: #b0c4de;
  }
`;

const Description = styled.p`
  color: #a9a9a9;
  font-weight: 500;
`;

const SearchBarWrap = styled.div`
  background-color: #f0f0f0;
  width: fit-content;
  margin: 2.5rem auto 4rem auto;
  padding: 0.5rem;
  border-radius: 5px;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  background-color: #f0f0f0;
  outline: none;
  border: none;
`;

const ClearButton = styled.span`
  padding-right: 0.5rem;
  cursor: pointer;
`;

const GoButton = styled.button`
  outline: none;
  border: none;
  padding: 0.3rem 1rem;
  border-radius: 5px;
  background-color: #0f52ba;
  color: #fff;
`;

const BlogListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3rem;
  margin: 40px 50px 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const BlogItemTitle = styled.h5`
  margin: 20px;
  flex: 1;
`;

const BlogItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    border-color: #333;
    & ${BlogItemTitle} {
      text-decoration: underline;
    }
  }
`;

const BlogItemCover = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  margin-bottom: 0.5rem;
`;

const BlogItemDescription = styled.p`
  position: relative;
  max-height: 80px;
  overflow: hidden;
  font-size: 0.8rem;
  color: #a9a9a9;
  transition: color 0.2s ease-in-out;
  margin: 0 20px;
  &::before {
    position: absolute;
    content: "...";
    bottom: 0;
    right: 0;
  }
  &:hover {
    color: #333;
  }
`;

const BlogItemFooter = styled.footer`
  display: flex;
  align-items: center;
  margin: 20px;
  justify-content: space-between;
`;

const BlogItemLink = styled.span`
  text-decoration: none;
  color: inherit;
`;

const BlogItemAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const BlogItemAuthorAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 0.5rem;
`;

const BlogItemAuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const BlogItemAuthorName = styled.h6`
  margin: 0;
`;

const BlogItemAuthorDate = styled.p`
  font-size: 0.6rem;
  color: #a9a9a9;
  font-weight: 600;
`;
const Chip = styled.div`
  font-size: 0.7rem;
  background: linear-gradient(to right, #6190e8, #a7bfe8);
  color: #fff;
  padding: 0.3rem 0.5rem;
  border-radius: 5px;
  width: fit-content;
  text-transform: capitalize;
  margin: 0 20px;
`;

const TrendingBlogsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  margin: 0 250px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const BlogContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const BlogNumber = styled.h3`
  margin: 0;
  color: #a9a9a9;
  font-size: 1.5rem;
  font-weight: bold;
`;

const BlogAuthorAvatar = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
`;

const BlogDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const BlogTitle = styled.h6`
  margin: 0;
  // font-size: 1.25rem;
  font-weight: bold;
`;

const BlogAuthorName = styled.p`
  margin: 0;
  font-size: 1rem;
`;

const BlogCreatedAt = styled.p`
  margin: 0;
  font-size: 0.75rem;
  color: #666;
`;
const StyledHeading = styled.h2`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-left: 250px;

  svg {
    margin-right: 10px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Separator = styled.div`
  border-top: 0.5px dashed #a9a9a9;
  margin-top: 40px;
`;

export default Blogs;
