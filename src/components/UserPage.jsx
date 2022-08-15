import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "../components/shared/HomePage.jsx";
import axios from "axios";
import { useUserData } from "../contexts/userContext.jsx";

export default function UserPage() {
  const { id } = useParams();
  const [userData] = useUserData();
  const [username, setUsername] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  };

  useEffect(() => {
    const request = axios.get(
      `https://projeto17-linkr-backend.herokuapp.com/username/${id}`,
      config
    );
    request
      .then((response) => {
        setUsername(response.data.username);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const axiosRequest = `user/${id}`;
  const pageName = `${username}'s posts`;

  return <HomePage axiosRequest={axiosRequest} pageName={pageName} />;
}
