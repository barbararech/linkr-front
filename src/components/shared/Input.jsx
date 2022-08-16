import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";

export default function Input() {
  const [APIData, setAPIData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const config = {
      username: searchInput
  };

  useEffect(() => {

    if (searchInput.length > 2) {

      axios({
        method: "POST",
        url: "https://projeto17-linkr-backend.herokuapp.com/search",
        data: config
      })
        .then(response => {
          setAPIData([...response.data]);
          console.log(APIData);
          console.log('Update API');
          console.log(searchInput)
        })
        .catch(error => {
        });
  

    }

  }, [searchInput]);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);

  };

  function Users({ username, pictureUrl }) {
    return (
      <UserList>
        <div className="user">
          <div>
            <img src={pictureUrl} alt={"img"} />
          </div>

          <div className="list">
            <span className="username">{username}</span>
          </div>
        </div>
      </UserList>
    );
  }

  return (
    <Container>
      <div className="split">
        <DebounceInput placeholder="Search for people" debounceTimeout={300} minLength={3} onChange={(e) => searchItems(e.target.value)} />

        {searchInput.length > 2
          ? APIData.map((user) => {
              return (
                <Link to={`/user/${user.id}`}>
                  <Users
                    id={user.id}
                    username={user.username}
                    pictureUrl={user.pictureUrl}
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
  justify-content: space-between;

  img {
    width: 39px;
    height: 39px;
    margin-left: 13px;
    border-radius: 50%;
  }

  .user {
    display: flex;
    flex-direction: row;
  }

  .username {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #515151;
    margin-top: 7px;
  }

  .list {
    display: flex;
    flex-direction: column;
    margin-left: 14px;
  }
`;
