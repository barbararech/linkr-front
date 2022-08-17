import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useUserData } from "../../contexts/userContext.jsx";
import refreshAxiosContext from "../../contexts/refreshAxiosContext.jsx";

export default function FollowButton() {
  const { id } = useParams();
  const [following, setFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useUserData();
  const [sessionUserId, setSessionUserId] = useState("");
  const { token } = userData;
  const { refreshAxios, setRefreshAxios } = useContext(refreshAxiosContext);
  console.log(following);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

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

  useEffect(() => {
    axios
      .get(
        `https://projeto17-linkr-backend.herokuapp.com/following/${id}`,
        config
      )
      .then((response) => {
        console.log(response.data);
        setFollowing(response.data);
      })
      .catch((error) => {
        const message = error.response.statusText;
        alert(message);
      });
  }, []);

  function Follow() {
    setIsLoading(true);
    axios
      .post(
        `https://projeto17-linkr-backend.herokuapp.com/follow/${id}`,
        {},
        config
      )
      .then((response) => {
        setIsLoading(false);
        setRefreshAxios(!refreshAxios);
      })
      .catch((error) => {
        const message = error.response.statusText;
        alert("Não foi possível executar a operação!");
        setIsLoading(false);
      });
  }

  function Unfollow() {
    setIsLoading(true);
    axios
      .delete(
        `https://projeto17-linkr-backend.herokuapp.com/unfollow/${id}`,
        config
      )
      .then((response) => {
        setIsLoading(false);
        setRefreshAxios(!refreshAxios);
      })
      .catch((error) => {
        const message = error.response.statusText;
        alert("Não foi possível executar a operação!");
        setIsLoading(false);
      });
  }

  function RenderButton() {
    if (sessionUserId === parseInt(id)) {
      return <></>;
    }

    if (following.length === 0) {
      return (
        <Button
          onClick={() => Follow()}
          following={following}
          isLoading={isLoading}
        >
          Follow
        </Button>
      );
    } else {
      return (
        <Button
          onClick={() => Unfollow()}
          following={following}
          isLoading={isLoading}
        >
          Unfollow
        </Button>
      );
    }
  }

  return RenderButton();
}

const Button = styled.button`
  width: 112px;
  height: 31px;
  background: ${(props) =>
    props.following.length === 0 ? "#1877f2" : "#ffffff"};
  border-radius: 5px;
  border: none;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) => (props.following.length === 0 ? "#ffffff" : "#1877f2")};
  cursor: pointer;
  opacity: ${(props) => (props.isLoading ? "0.5" : "1")};

  @media (max-width: 935px) {
    margin-right: 15px;
  }
`;
