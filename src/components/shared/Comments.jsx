import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useUserData } from "../../contexts/userContext.jsx";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaRegPaperPlane } from "react-icons/fa";
import API from "./constants.jsx";

export default function Comments ({id}){
const [userData] = useUserData();
const navigate = useNavigate();
const [text, setText] = useState("");
const [profilePic, setProfilePic] = useState("");
const [sessionUserId, setSessionUserId] = useState("");
const [postComments, setPostComments] = useState("");
const [postNum, setPostNum] = useState("");
const { token } = userData;

    useEffect(() => {
      const requestId = axios.get(
        `${API}/userId`,
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
          .get(`${API}/pictureUrl`, {
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

      useEffect(() => {
        const requestId = axios.get(
          `${API}/comment/${id}`, [] , config 
        );
        requestId
          .then((response) => {
            setPostComments([...response.data]);
            // console.log(postComments)

          })
          .catch((err) => {
            console.error(err);
          });
      }, [postComments]);

      // useEffect(() => {
      //   const requestId = axios.get(
      //     `http://localhost:5002/comments/${id}`, [] , config 
      //   );
      //   requestId
      //     .then((response) => {
      //       setPostNum([...response.data]);
      //       console.log(postNum)

      //     })
      //     .catch((err) => {
      //       console.error(err);
      //     });
      // }, [postNum]);

function sendComment (e){

    const data = {comment: text, userId: sessionUserId} 
    const promise = axios.post(`${API}/comment/${id}`, data, config )
    promise.then(() => {
        //alert("Comentário publicado com sucesso");
        setText("");
      })
      .catch((err) => {
        console.error(err);
        alert("Houve um erro ao publicar seu comentário");
      });
    }

    
    function Comment({comment, username, pictureUrl}) {
      return(
        <CommentBox>
          <img src={pictureUrl}/>
          <div>
          <h3>{username}</h3>
          <h4>{comment}</h4>
          </div>
        </CommentBox>

      )
      }

    return (
        <Container>
        {postComments.length > 0 ? postComments.map((comment)=> {
          return(
            <Comment comment={comment.comment} pictureUrl={comment.pictureUrl} username={comment.username}/>
          )
        }) : "" }
        <div className="write">
          <img src={profilePic} />
          <input placeholder="write a comment..." value={text} onChange={(e) => setText(e.target.value)}/>
          <IconContext.Provider value={{color:"#FFFFFF", size:"20px"}}>
          <FaRegPaperPlane onClick={sendComment} ></FaRegPaperPlane>
          </IconContext.Provider>
        </div>
        </Container>
    )



}

const CommentBox = styled.div`

:first-child{
  margin-top: 45px;
}

margin-top: 10px;
display:flex;
align-items: center;
border-bottom: #353535 1px solid;

h3{
  color: #ACACAC;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  margin-left: 6px;
}

h4{
  color: #ACACAC;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  margin-left: 8px;
}

img{
    width: 39px;
    height: 39px;
    border-radius: 26.5px;
    margin-bottom: 10px;
    margin-left: 20px;
    margin-right: 10px;
  }

  @media (max-width: 935px) {
    :first-child{
    margin-top: 45px;
}
  }

`


const Container = styled.div`

/* :first-child{
  margin-top: 45px;
} */

  background-color: #1E1E1E;
  //min-height: 80px;
  margin-top: -30px;
  margin-bottom: 30px;
  border-radius: 0 0 6px 6px;

  .write {
    margin-top: 40px;
    padding-bottom: 10px;
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

  @media (max-width: 935px) {
    input{
      width: 80%;
    }
  }


`