import Header from "./Header.jsx";
import NewPost from "./NewPost.jsx";
import Trending from "./Trending.jsx";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useUserData } from "../../contexts/userContext.jsx";
import AllPosts from "./AllPosts.jsx";
import refreshAxiosContext from "../../contexts/refreshAxiosContext.jsx";
import NewPostsAlert from "./NewPostsAlert.jsx";
import ConnectionError from "./ConnectionError.jsx";
import WithoutPosts from "./WithoutPosts.jsx";
import LoadingAnimation from "./LoadingAnimation.jsx";
import FollowButton from "./FollowButton.jsx";

export default function HomePage({ axiosRequest, pageName, userImg }) {
  const [posts, setPosts] = useState([]);
  const { refreshAxios, setRefreshAxios } = useContext(refreshAxiosContext);
  const [userData] = useUserData();
  const [connectError, setConnectError] = useState("");
  const [sessionUserId, setSessionUserId] = useState("");
  const [loading, setLoading] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  };

  useEffect(() => {
    const request = axios.get(
      `https://projeto17-linkr-backend.herokuapp.com/${axiosRequest}`,
      config
    );
    setLoading(true);
    request
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setConnectError(err);
        setLoading(false);
        console.error(err);
      });
  }, [refreshAxios]);

  useEffect(() => {
    const requestId = axios.get(
      "https://projeto17-linkr-backend.herokuapp.com/userId",
      config
    );
    requestId
      .then((response) => {
        setSessionUserId(response.data.id);
        console.log(response.data);
      })
      .catch((err) => {
        setConnectError(err);
        console.error(err);
      });
  }, []);

  function RenderPosts() {
    if (connectError !== "") {
      return <ConnectionError />;
    }

    if (posts.length === 0 && loading === false) {
      return <WithoutPosts />;
    }

    return posts.map(
      ({
        id,
        username,
        pictureUrl,
        link,
        article,
        urlTitle,
        urlDescription,
        urlImage,
        userId,
      }) => {
        return (
          <AllPosts
            id={id}
            username={username}
            pictureUrl={pictureUrl}
            link={link}
            article={article}
            urlTitle={urlTitle}
            urlDescription={urlDescription}
            urlImage={urlImage}
            userId={userId}
            sessionUserId={sessionUserId}
            refreshAxios={refreshAxios}
            setRefreshAxios={setRefreshAxios}
          />
        );
      }
    );
  }
  console.log(userImg);

  return (
    <>
      <Helmet>
        <style>{"body { background-color: #333333; }"}</style>
      </Helmet>
      <Header />
      <Container>
        <ContainerPosts>
          <HeaderTitle userImg={userImg}>
            <PageName>
              {userImg ? <img src={userImg} alt="userImage" /> : ""}
              <Title>{pageName}</Title>
            </PageName>
            {pageName.includes("posts") ? <FollowButton /> : ""}
          </HeaderTitle>
          {pageName === "timeline" ? <NewPost /> : ""}
          <NewPostsAlert
            posts={posts}
            axiosRequest={axiosRequest}
            pageName={pageName}
          />
          {loading ? <LoadingAnimation /> : RenderPosts()}
        </ContainerPosts>
        <Trending />
      </Container>
    </>
  );
}

const Container = styled.div`
  margin-top: 53px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;

  @media (max-width: 935px) {
    margin-top: 19px;
  }
`;

const ContainerPosts = styled.div`
  margin-right: 25px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (max-width: 935px) {
    margin-right: 0px;
  }
`;

const HeaderTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 161%;
  box-sizing: border-box;
  margin-bottom: 40px;

  img {
    height: 50px;
    width: 50px;
    border-radius: 26.5px;
    margin: 0px 20px;
  }

  @media (max-width: 935px) {
    margin-left: ${(props) => (props.userImg ? "0px" : "20px")};
    margin-right: 0px;
    margin-bottom: 20px;
    width: 100%;
  }
`;

const PageName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.h1`
  color: #ffffff;
  font-family: "Oswald";
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  height: 100%;

  @media (max-width: 935px) {
    font-size: 33px;
    line-height: 49px;
  }
`;
