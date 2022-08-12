import Header from "./Header.jsx";
import NewPost from "./NewPost.jsx";
import Trending from "./Trending.jsx";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUserData } from "../contexts/userContext.jsx";
import { Oval } from "react-loader-spinner";
import AllPosts from "./AllPosts.jsx";


export default function TimelinePage() {
  const [posts, setPosts] = useState([]);
  const [refreshAxios, setRefreshAxios] = useState(false);
  const [userData] = useUserData();
  const [connectError, setConnectError] = useState("")
  const [sessionUserId, setSessionUserId] = useState("")
  const [loading, setLoading] = useState(false);
 
  
  let loadingAnimation = (
    <Oval
      height={80}
      width={80}
      color="#FFFFFF"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#000000"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );

  const config = {
    headers: {
      Authorization: `Bearer ${userData.token}`, //Padrão da API (Bearer Authentication)
    },
  };

  useEffect(() => {
    const request = axios.get(
      /* "https://projeto17-linkr-backend.herokuapp.com/timeline" */"http://localhost:5000/timeline",
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
        console.error(err);
      });
  }, [refreshAxios]);


  
  useEffect(() => {
    const requestId = axios.get(/* "https://projeto17-linkr-backend.herokuapp.com/userId" */'http://localhost:5000/userId', config);
    requestId.then((response)=>{
      setSessionUserId(response.data.id)
    }).catch((err)=>{
      setConnectError(err)
      console.error(err)
    })
  }, [])


  if (connectError !== "") {
    return (
      <>
        <Helmet>
          <style>{"body { background-color: #333333; }"}</style>
        </Helmet>
        <Header />
        <Container>
          <NewPost />
          <h1
            style={{
              color: "#FFFFFF",
              fontFamily: "Oswald",
              marginTop: "100px",
              textAlign: "center",
              fontSize: "40px",
            }}
          >
            An error occured while trying to fetch the posts, please refresh the
            page
          </h1>
        </Container>
      </>
    );
  }

  if (posts.length === 0 && loading === false) {
    return (
      <>
        <Helmet>
          <style>{"body { background-color: #333333; }"}</style>
        </Helmet>
        <Header />
        <Container>
          <NewPost />
          <h1
            style={{
              color: "#FFFFFF",
              fontFamily: "Oswald",
              marginTop: "100px",
            }}
          >
            There are no posts yet.
          </h1>
        </Container>
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
        <Title>timeline</Title>
          <NewPost />
          {loading ? (
            <>
              <h1
                style={{
                  color: "#FFFFFF",
                  fontFamily: "Oswald",
                  marginTop: "100px",
                  marginBottom: "10px;",
                }}
              >
                Loading
              </h1>
              {loadingAnimation}
            </>
          ) : (
            <>
              {posts.map(
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
              )}
            </>
          )}
        </ContainerPosts>
        <Trending />
      </Container>
    </>
  );
}



const Container = styled.div`
  margin-top: 53px;
  /* width: 100%;
  height: 100vh; */
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  box-sizing: border-box;
`;

const ContainerPosts = styled.div`
  margin-right: 25px;
  /* width: 100%; */
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  box-sizing: border-box;
  
`;

const Title = styled.h1`
  color: #ffffff;
  font-family: 'Oswald';
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  margin-bottom: 43px;
`;
