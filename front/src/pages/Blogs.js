import React, { useState } from "react";
import styled from "styled-components";
import { FaFire } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { blogss, trendingblogss } from "../constants/BlogsData";
import {Fade} from "react-reveal";
import landingPerson from "../assets/styles/landingPerson.json";
import data from "../assets/styles/data.json";
import DisplayLottie from "./DisplayLottie";
import DocumentMeta from "react-document-meta";
import useMeta from "../hooks/useMeta";
import { useTranslation } from "react-i18next";
function Blogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState(blogss);
  const [trendingBlogs, setTrendingBlogs] = useState(trendingblogss);
  const { t, i18n } = useTranslation()
  const meta = useMeta(t('blog.title'), t('blog.description'))

  const greeting = {
    title: "Welcome to Jalyss Blog 👋",
    subTitle:
      "where personal growth meets insightful reading! Are you looking to expand your knowledge, gain new insights, and explore your full potential? Then look no further than Jalyss Blog. Our platform offers a wide range of articles, book reviews, and personal stories .",
    displayGreeting: true, // Set false to hide this section, defaults to true
  };
  return (
    <DocumentMeta {...meta} className="container-fluid">
    <div>
      <Fade bottom duration={1000} distance="40px">
        <Containerr style={{alignItems:'normal',height: "600px" , margin:"0 70px"}}>
          <div className="d-flex align-items-center justify-content-center  " style={{margin:30}}>
            <div className="col-lg-6">
              {/* <GreetingMain> */}
                <GreetingTextDiv style={{margin:20}}>
                <GreetingText>Welcome to Jalyss Blog <br />👋</GreetingText>

                  <GreetingSubTitle>{greeting.subTitle}</GreetingSubTitle>
                  <GreetingButtonDiv>
                    <GreetingButton $primary> <NoStyle href="#blogListWrapper" >Explore</NoStyle>
 </GreetingButton>
                    <GreetingButton onClick={()=>{navigate('/BlogsForm')}}>Write yours</GreetingButton>
                  </GreetingButtonDiv>
                </GreetingTextDiv>
              {/* </GreetingMain> */}
            </div>
            <div className="col-lg-6">
              <GreetingImageDiv>
                <LandingPerson animationData={landingPerson} />
              </GreetingImageDiv>
            </div>
          </div>
        </Containerr>
      </Fade>
      <Fade bottom duration={3000} distance="40px">
        <Containerr style={{alignItems:'normal', margin:"0 70px"}}>
          <div className=" d-flex align-items-center">
            <div className="col-lg-6">
              <GreetingImageDiv>
                <LandingPerson animationData={data} />
              </GreetingImageDiv>
            </div>
            <div className="col-lg-6">
              <GreetingMain>
                <GreetingTextDiv>
                  <GreetingText>
                    Trending on Jalyss <br /> <FaFire /> 
                  </GreetingText>
                  <div className="d-flex flex-wrap justify-content-center">
                    {trendingBlogs.map((blog, index) => (
                      <BlogContainer key={blog.id}>
                        <BlogNumber>{`${(index + 1)
                          .toString()
                          .padStart(2, "0")}`}</BlogNumber>
                        <BlogAuthorAvatar
                          src={blog.authorAvatar}
                          alt={blog.authorName}
                        />
                        <BlogDetails>
                          <BlogAuthorName>{blog.authorName}</BlogAuthorName>
                          <BlogTitle>{blog.title}</BlogTitle>
                          <BlogCreatedAt>{blog.createdAt}</BlogCreatedAt>
                        </BlogDetails>
                      </BlogContainer>
                    ))}
                  </div>
                </GreetingTextDiv>
              </GreetingMain>
            </div>
          </div>
        </Containerr>
      </Fade>

      <Separator />

      <SearchBarWrap>
        <SearchForm>
          <SearchInput type="text" placeholder="Search By Category" />
          <GoButton>Go</GoButton>
        </SearchForm>
      </SearchBarWrap>
      <BlogListWrapper id="blogListWrapper" >
        {blogs.map((blog, i) => (
          <BlogItemWrapper key={blog.id}  onClick={() => navigate(`/blogs/${i}`)}    style={{ cursor: "pointer" }}>
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
              {/* <BlogItemLink

              >
                ➝
              </BlogItemLink> */}
            </BlogItemFooter>
          </BlogItemWrapper>
        ))}
      </BlogListWrapper>
    </div>
    </DocumentMeta>
  );
}
const NoStyle=styled.a` 
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: none;
    color: white;
  }
`
const Row = styled.div`
  margin-left: 0 !important;
  margin-right: 0 !important;
`;

const BlogContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  width:300px;
  margin-top:20px;
  margin-bottom:20px;
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

const Separator = styled.div`
  border-top: 0.5px dashed #a9a9a9;

`;
const Containerr = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top:-30px
  width: 100%;
  margin-left: 0;
  margin-right: 0;
`;

const GreetingMain = styled.div`
  display: flex;
  // margin-left: 80px;
`;

const GreetingTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GreetingText = styled.h1`
  margin-bottom: 20px;
  font-size: 50px;
  // line-height: 1.1;
  text-align: center;
  white-space: pre-line;
  color: #000000 @media (max-width: 768px) {
    font-size: 30px;
    text-align: center;
  }
`;

const GreetingSubTitle = styled.p`
  font-size: 29px;
  line-height: 40px;
  font-size: 30px;
  line-height: 40px;
  color: #868e96;

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: normal;
    text-align: center;
  }
`;

const GreetingButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

const GreetingButton = styled.button`
  background: ${(props) => (props.$primary ? "#0f52ba" : "white")};
  color: ${(props) => (props.$primary ? "white" : "#0f52ba")};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${(props) => (props.$primary ? "#0f52ba" : "#0f52ba")};
  border-radius: 3px;
  width: 150px;
  height: 50px;
`;

const GreetingImageDiv = styled.div`
  height: 100%;
`;

const LandingPerson = styled(DisplayLottie)`
  max-width: 50%;
  height: auto;
`;

export default Blogs;
