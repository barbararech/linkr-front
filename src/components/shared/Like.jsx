import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { useState, useEffect } from "react";
import { useUserData } from "../../contexts/userContext.jsx";
import axios from "axios";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IconContext } from "react-icons";

export default function Like({id}) {
  const [userData] = useUserData();
  const [toolTipText, setToolTipText] = useState("");
  const [likesCount, setLikesCount] = useState([]);
  const [userLiked, setUserLiked] = useState(false)

  const config = {
    headers: {
      Authorization: `Bearer ${userData.token}`, //Padrão da API (Bearer Authentication)
    },
  };

  function setLike() {
    if (!userLiked) {
      config.headers.action = "like"
    } else {
      config.headers.action = "dislike"
    }
   const promise = axios.post(`https://projeto17-linkr-backend.herokuapp.com/like/${id}`, {}, config)  
   promise.then((response) => {
        setUserLiked(!userLiked);
    }).catch((err) => {
      console.error(err)
    });
  }

  useEffect(() => {
    const request = axios.get(`https://projeto17-linkr-backend.herokuapp.com/likes/${id}`, config)
    request.then((response) => {
          setLikesCount(response.data.likes)
          setUserLiked(response.data.userLiked);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userLiked]);

  useEffect(() => {
    if (likesCount.length === 0) {
      setToolTipText("Ninguém curtiu este post");
    }
    
    if (likesCount.length === 1) {
      setToolTipText(likesCount[0]?.username + " curtiu este post");
    }
    
    if (likesCount.length === 2) {
      setToolTipText(
        `${likesCount[0]?.username} e ${likesCount[1]?.username} curtiram este post`
      );
    }
    
    if (likesCount.length === 3) {
      setToolTipText(
        `${likesCount[0]?.username}, ${likesCount[1]?.username} e 
        outra pessoa`
      );
    }
    
    if (likesCount.length > 3) {
      setToolTipText(
        `${likesCount[0]?.username}, ${likesCount[1]?.username} e 
        outras ${likesCount.length * 1 - 2} pessoas`
      );
    }
  }, [userLiked]);

  return (
    <>
      <Reaction onClick={setLike} data-tip={toolTipText}>
        {userLiked ? (
          <IconContext.Provider value={{ color: "red", size: "20px" }}>
            <AiFillHeart></AiFillHeart>
          </IconContext.Provider>
        ) : (
          <IconContext.Provider value={{ color: "#FFFFFF", size: "20px" }}>
            <AiOutlineHeart></AiOutlineHeart>
          </IconContext.Provider>
        )}
        <p>{likesCount.length} likes</p>
      </Reaction>
      <ReactTooltip place="bottom" type="light" effect="solid" />
    </>
  );
}

const Reaction = styled.div`
  width: 50px;
  height: 50px;
  margin-left: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin-top: 5px;
    font-size: 11px;
    color: #ffffff;
  }
  :hover {
    cursor: pointer;
  }
`;
