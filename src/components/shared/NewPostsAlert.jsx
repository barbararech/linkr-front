import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { useInterval } from "usehooks-ts";
import axios from "axios";
import { HiRefresh } from "react-icons/hi";
import refreshAxiosContext from "../../contexts/refreshAxiosContext.jsx";
import { useUserData } from "../../contexts/userContext.jsx";
import API from "./constants.jsx";

export default function NewPostsAlert({ posts, axiosRequest, pageName }) {
  const [newPosts, setNewPosts] = useState(0);
  const { refreshAxios, setRefreshAxios } = useContext(refreshAxiosContext);
  const [userData] = useUserData();
  const timeUpdatePosts = 15000;

  const config = {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  };

  useInterval(() => {
    getNewPosts();
  }, timeUpdatePosts);

  function getNewPosts() {
    const request = axios.get(
      `${API}/${axiosRequest}?page=0`,
      config
    );
    request
      .then((response) => {
        if(response.data[0].createdAt > posts[0].createdAt){
          const aux = response.data.filter((el)=> el.createdAt > posts[0].createdAt)
          setNewPosts(aux.length)
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function renderAlert() {
    if (newPosts >= 1) {
      return (
        <Container>
          <ButtonAlert onClick={()=>setRefreshAxios(!refreshAxios)}>
            {newPosts} new posts, load more!
            <i>
              <HiRefresh />
            </i>
          </ButtonAlert>
        </Container>
      );
    }

    if (newPosts === 10){
      return (
        <Container>
          <ButtonAlert onClick={()=>setRefreshAxios(!refreshAxios)}>
            {diffPosts}+ new posts, load more!
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
  cursor: pointer;

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
