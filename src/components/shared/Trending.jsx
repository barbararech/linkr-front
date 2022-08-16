import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserData } from "../../contexts/userContext.jsx";
import refreshAxiosContext from "../../contexts/refreshAxiosContext.jsx";

export default function Trending() {
  const [trending, setTrending] = useState([]);
  const [userData, setUserData] = useUserData();
  const { token } = userData;
  const { refreshAxios, setRefreshAxios } = useContext(refreshAxiosContext);

  useEffect(() => {
    axios
      .get("https://projeto17-linkr-backend.herokuapp.com/trending", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setTrending(response.data);
      })
      .catch((error) => {
        const message = error.response.statusText;
        alert(message);
      });
  }, [refreshAxios]);

  function RenderTrending() {
    if (trending.length === 0) {
      return (
        <Hashtags>
          <p> Ainda não há hashtags utilizadas!</p>
        </Hashtags>
      );
    }

    return trending.map((hashtags, index) => {
      const { hashtag } = hashtags;
      return (
        <Link to={`/hashtag/${hashtag}`} key={index}>
          <i> # {hashtag} </i>
        </Link>
      );
    });
  }

  return (
    <TrendingContainer>
      <Title>
        <h1>trending</h1>
      </Title>
      <Hashtags>{RenderTrending()}</Hashtags>
    </TrendingContainer>
  );
}

const TrendingContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 301px;
  height: 406px;
  background: #171717;
  border-radius: 16px;
  position: relative;
  margin-left: 45px;
  margin-top: 106px;

  @media (max-width: 935px) {
    display: none;
  }
`;

const Title = styled.div`
  border-bottom: 1px solid #484848;
  height: 61px;
  width: 100%;

  h1 {
    font-family: "Oswald";
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #ffffff;
    padding: 10px 16px;
  }
`;

const Hashtags = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #ffffff;
  padding: 20px 16px;
  font-family: "Lato";
  font-weight: 700;
  font-size: 19px;
  line-height: 30px;
  letter-spacing: 0.05em;

  a {
    text-decoration: none;
    color: #ffffff;
  }
`;
