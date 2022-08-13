import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { useState, useEffect } from "react";
import { useUserData } from "../contexts/userContext.jsx";
import axios from 'axios';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IconContext } from "react-icons";

export default function Like({ infos }) {
  const URL = "https://projeto17-linkr-backend.herokuapp.com";
  const { id } = infos;
  let postId = id || 1;
  const [userData] = useUserData();
  const [infoText, setInfoText] = useState("ninguém curtiu este post");
  const [likesInfo, setLikesInfo] = useState({
    likesUsers: [{ username: "Você" }, { username: "Fulano" }],
    liked: false,
    likes: 0,
  });

  const config = {
    headers: {
      Authorization: `Bearer ${userData.token}`, //Padrão da API (Bearer Authentication)
    },
  };

  function likePost() {
    let newURL = URL;
    if (!likesInfo.liked) {
      newURL = URL + "/like/" + postId;
    } else {
      newURL = URL + "/dislike/" + postId;
    }
    setLikesInfo({ ...likesInfo, liked: !likesInfo.liked });
    axios
      .post(newURL,{}, config)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    axios
      .get(`${URL}/likes/${postId}`, config)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          const info = res.data;
          setLikesInfo(info);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [likesInfo.liked]);

  useEffect(() => {
    if (likesInfo.likes === 0) {
      setInfoText("Ninguém curtiu este post");
    } else if (likesInfo.likes === 1) {
      setInfoText(likesInfo.likesUsers[0]?.username + " curtiu este post");
    } else if (likesInfo.likes === 2) {
      setInfoText(
        `${likesInfo.likesUsers[0]?.username} e ${likesInfo.likesUsers[1]?.username} curtiram este post`
      );
    } else if (likesInfo.likes > 2) {
      setInfoText(
        `${likesInfo.likesUsers[0]?.username}, ${
          likesInfo.likesUsers[1]?.username
        } e outras ${likesInfo.likes * 1 - 2} pessoas`
      );
    }
  }, [likesInfo.likesUsers]);
  console.log(likesInfo.likes)
  return (
    <>
   
      <Heart onClick={likePost} liked={likesInfo.liked} data-tip={infoText}>
        {likesInfo.liked ? (
           <IconContext.Provider value={{color:'red', size:"20px"}}>
            <AiFillHeart></AiFillHeart>
          </IconContext.Provider>
        ) : (
          <IconContext.Provider value={{color:"#FFFFFF", size: "20px"}}> 
            <AiOutlineHeart></AiOutlineHeart>
          </IconContext.Provider> 
        )}
        <p>{likesInfo.likes} likes</p>
      </Heart>
      <ReactTooltip place='bottom' type='light' effect='solid' />
    
    </>
  );
}

const Heart = styled.div`
  width: 50px;
  height: 50px;
  margin-left: 18px;
  left: 0;
  bottom: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin-top: 5px;
    font-size: 11px;
    color:#FFFFFF;
  }
  :hover {
    cursor: pointer;
  }
`;
