import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { useInterval } from "usehooks-ts";
import axios from "axios";
import { HiRefresh } from "react-icons/hi";
import { IconContext } from "react-icons";

import refreshAxiosContext from "../../contexts/refreshAxiosContext.jsx";
import { useUserData } from "../../contexts/userContext.jsx";

export default function LoadingPostsAlert({ posts, axiosRequest, pageName }) {
  const [newPosts, setNewPosts] = useState([]);
  const { refreshAxios, setRefreshAxios } = useContext(refreshAxiosContext);
  const [userData] = useUserData();
  const timeUpdatePosts = 15000;

  const config = {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  };

  console.log(axiosRequest);
  console.log(pageName);

  useInterval(() => {
    getNewPosts();
  }, timeUpdatePosts);

  function getNewPosts() {
    useEffect(() => {
      const request = axios.get(
        `https://projeto17-linkr-backend.herokuapp.com/${axiosRequest}`,
        config
      );
      request
        .then((response) => {
          setNewPosts(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }, []);
  }

  console.log(newPosts);

  function renderAlert() {
    const diffPosts = newPosts.length - posts.length;
    console.log(newPosts);
    console.log(posts);

    if (diffPosts > 1) {
      return (
        <Container>
          <ButtonAlert onClick={setRefreshAxios(true)}>
            {diffPosts} new posts, load more!
            <i>
              <HiRefresh />
            </i>
          </ButtonAlert>
        </Container>
      );
    }
  }

  return <>{renderAlert()}</>;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 61px;
  width: 100%;
  margin-bottom: 17px;
`;

const ButtonAlert = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 61px;
  width: 100%;
  background-color: #1877f2;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  font-family: "Lato";
  font-size: 16px;
  color: #ffffff;

  i {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
  }

  @media (max-width: 935px) {
    border-radius: 0px;
  }
`;
