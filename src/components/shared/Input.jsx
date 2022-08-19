import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import API from "./constants";
import { useUserData } from "../../contexts/userContext";
import { BsDot } from "react-icons/bs";
import { IconContext } from "react-icons";


export default function Input() {
  const [APIData, setAPIData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [userData] = useUserData();
  const [sessionUserId, setSessionUserId] = useState("");
  const body = {
    username: searchInput,
  };

  const config = {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  };

  useEffect(() => {
    if (searchInput.length > 2) {
      axios
        .post(
          `${API}/search`,
          body,
          config
        )
        .then((response) => {
          setAPIData(response.data);
        })
        .catch((error) => {});
    }
  }, [searchInput]);

  useEffect(() => {
    const requestId = axios.get(
      "https://projeto17-linkr-backend.herokuapp.com/userId",
      config
    );
    requestId
      .then((response) => {
        setSessionUserId(response.data.id);
      })
      .catch((err) => {
        setConnectError(err);
        console.error(err);
      });
  }, []);


  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
  };

  function Users({ username, pictureUrl, followerId }) {
    console.log(sessionUserId);
    console.log(followerId);
    return (
      <UserList>
        <div className="user">
          <div>
            <img src={pictureUrl} alt={"img"} />
          </div>
          <div className="list">
            <span className="username">{username}</span>
          </div>
          {sessionUserId === followerId ? (
            <>
              <IconContext.Provider value={{ color: "#c5c5c5", size: "40px" }}>
                <BsDot />
              </IconContext.Provider>
              <span className="following"> following</span>
            </>
          ) : (
            <></>
          )}
        </div>
      </UserList>
    );
  }

  return (
    <Container>
      <div className="split">
        <DebounceInput
          placeholder="Search for people"
          debounceTimeout={300}
          minLength={3}
          onChange={(e) => searchItems(e.target.value)}
        />

        {searchInput.length > 2
          ? APIData.map((user) => {
              return (
                <Link to={`/user/${user.id}`}>
                  <Users
                    id={user.id}
                    username={user.username}
                    pictureUrl={user.pictureUrl}
                    followerId={user.userId}
                  />
                </Link>
              );
            })
          : ""}
      </div>
    </Container>
  );
}

//Styles

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .split {
    background-color: #e7e7e7;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    z-index: 1;
  }

  input {
    font-family: "Lato";
    box-sizing: border-box;
    width: 350px;
    min-height: 45px;
    background: #ffffff;
    border: none;
    border-radius: 5px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #666666;
    //margin: 0;
  }
`;

const UserList = styled.div`
  border-bottom-style: solid;
  border-bottom-color: lightgray;
  padding-bottom: 10px;
  padding-top: 10px;
  position: relative;
  font-family: "roboto slab";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  display: flex;
  /* justify-content: space-between; */

  img {
    width: 39px;
    height: 39px;
    margin-left: 13px;
    border-radius: 50%;
  }

  .user {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
  }

  .username {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #515151;
    height: 100%;
    margin-bottom: 4px;
    margin-right: -9px;
  }

  .list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 14px;
    height: 100%;
  }

  .following {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #c5c5c5;
    height: 100%;
    margin-bottom: 4px;
    margin-left: -9px;
  }
`;
