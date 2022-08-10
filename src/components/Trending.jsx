import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

export default function Trending() {
  const [trending, setTrending] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const response = axios
      .get("https://projeto17-linkr-backend.herokuapp.com/trending", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTrending(response.data);
      })
      .catch((e) => {
        const message = error.response.statusText;
        alert(message);
      });
  }, []);

  return (
    <TrendingContainer>
      <Title>
        <h1>trending</h1>
      </Title>
      <Hashtags>
        <p> Oiii</p>
        <p> Oiii</p>
      </Hashtags>
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
  line-height: 23px;
  letter-spacing: 0.05em;
`;
