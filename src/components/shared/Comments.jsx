import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useUserData } from "../../contexts/userContext.jsx";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaRegPaperPlane } from "react-icons/fa";

export default function Comments ({id}){
const [userData] = useUserData();
const navigate = useNavigate();
const [text, setText] = useState("");
const [profilePic, setProfilePic] = useState("");
const [sessionUserId, setSessionUserId] = useState("");
const { token } = userData;

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


    useEffect(() => {
        axios
          .get("https://projeto17-linkr-backend.herokuapp.com/pictureUrl", {
            headers: { Authorization: `Bearer ${userData.token}` },
          })
          .then((res) => {
            const { pictureUrl } = res.data;
            setProfilePic(pictureUrl);
          })
          .catch((e) => console.log(e));
      }, [userData.token]);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, //Padrão da API (Bearer Authentication)
        },
      };

function sendComment (e){

    const data = {comment: text, userId: sessionUserId} 
    const promise = axios.post(`https://projeto17-linkr-backend.herokuapp.com/comment/${id}`, data, config )
    promise.then(() => {
        alert("Comentário publicado com sucesso");
        setText("");
      })
      .catch((err) => {
        console.error(err);
        alert("Houve um erro ao publicar seu comentário");
      });
    }

    return (
        <Container>
        <div className="write">
          <img src={profilePic} />
          <input placeholder="write a comment..." value={text} onChange={(e) => setText(e.target.value)}/>
          <FaRegPaperPlane onClick={sendComment} ></FaRegPaperPlane>
        </div>
        </Container>
    )
}

const Container = styled.div`
  background-color: #1E1E1E;
  min-height: 80px;
  margin-top: -30px;
  margin-bottom: 30px;
  border-radius: 0 0 6px 6px;

  .write {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    align-items:center;
  }

  input{
    color: #FFFFFF;
    font-family: 'Latos';
    background-color: #252525;
    border: none;
    border-radius: 8px;
    width: 410px;
    height: 39px;
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    padding-left: 10px;
  }

  img{
    width: 39px;
    height: 39px;
    border-radius: 26.5px;
  }
`