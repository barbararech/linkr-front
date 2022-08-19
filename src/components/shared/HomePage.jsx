import Header from "./Header.jsx";
import NewPost from "./NewPost.jsx";
import Trending from "./Trending.jsx";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { useUserData } from "../../contexts/userContext.jsx";
import AllPosts from "./AllPosts.jsx";
import refreshAxiosContext from "../../contexts/refreshAxiosContext.jsx";
import NewPostsAlert from "./NewPostsAlert.jsx";
import ConnectionError from "./ConnectionError.jsx";
import WithoutPosts from "./WithoutPosts ";
import NoPostsYet from "./NoPostsYet.jsx";
import WithoutFriends from "./WithoutFriends.jsx";
import LoadingAnimation from "./LoadingAnimation.jsx";
import FollowButton from "./FollowButton.jsx";
import API from "./constants.jsx";
import { Oval } from "react-loader-spinner";

export default function HomePage({ axiosRequest, pageName, userImg }) {
  const [posts, setPosts] = useState([]);
  const { refreshAxios, setRefreshAxios } = useContext(refreshAxiosContext);
  const [userData] = useUserData();
  const [connectError, setConnectError] = useState("");
  const [sessionUserId, setSessionUserId] = useState("");
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [end, setEnd] = useState(false);
  const ref = useRef();
  const config = {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  };

  function getPosts(){
    const request = axios.get(
      `${API}/${axiosRequest}?page=0`,
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
      })
  }

  useEffect(() => {
    getPosts();
  }, [refreshAxios]);

  useEffect(() => {
    const requestId = axios.get(
      `${API}/userId`,
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

  useEffect(() => {
    axios
      .get(`${API}/following`, config)
      .then((response) => {
        setFollowing(response.data);
      })
      .catch((error) => {
        const message = error.response.statusText;
        alert(message);
      });
  }, []);

  useEffect(() => {
    async function getPostsByPage() {
      const promise = await axios.get(`${API}/${axiosRequest}?page=${currentPage}`, config);
      if (promise?.data?.length < 10 && posts?.length > 0) {
        setPosts((prevInsideState) => [...prevInsideState, ...promise.data]);
        setEnd((prev) => !prev);
        return;
      }
      if (posts?.length > 0) {
        setPosts((prevInsideState) => [...prevInsideState, ...promise.data]);
      }
    }
    if (currentPage > 0) {
      getPostsByPage();
    }
  }, [currentPage]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        console.log("ACHEI VOCE");
        setTimeout(() => {
          setCurrentPage((prev) => prev + 1);
        }, 2000);
      }
    });
    if (ref.current) {
      console.log("Existe algo para observar");
      intersectionObserver.observe(ref.current);
    }
    return () => intersectionObserver.disconnect();
  }, [loading]);


  function RenderPosts() {
    if (connectError !== "") {
      return <ConnectionError />;
    }

    if (pageName.includes("posts") && loading === false && posts.length === 0) {
      console.log("oii");
      return <NoPostsYet />;
    }

    if (
      pageName === "timeline" &&
      loading === false &&
      following.length === 0
    ) {
      return <WithoutFriends />;
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
        isRepost,
        userRepostId,
        reposterName,
        countReposts
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
            isRepost={isRepost}
            userRepostId={userRepostId}
            reposterName={reposterName}
            countReposts={countReposts}
          />
        );
      }
    );
  }

  function RenderPage() {
    return (
      <>
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
          currentPage={currentPage}
        />
        {RenderPosts()}
        {!end ?
        <div ref={ref} className="loadMore">     <Oval
        height={36}
        width={36}
        color="#6D6D6D"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#000000"
        strokeWidth={2}
        strokeWidthSecondary={2}
      /> Loading more posts</div>:
        <div className="loadMore"> You reached the end. There are no more posts to show</div>}
      </>
    );
  }

  return (
    <>
      <Helmet>
        <style>{"body { background-color: #333333; }"}</style>
      </Helmet>
      <Header />
      <Container>
        <ContainerPosts>
          {loading ? <LoadingAnimation /> : <>{RenderPage()}</>}
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

  .loadMore{
    color: #6D6D6D;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
    padding-bottom: 338px;
  }
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
    padding-left: ${(props) => (props.userImg ? "0px" : "20px")};
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
