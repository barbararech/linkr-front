import { useState, useEffect, useRef } from "react";
import { Oval } from "react-loader-spinner";
import { TiPencil } from "react-icons/ti";
import { IconContext } from "react-icons";
import { RiDeleteBin7Fill } from "react-icons/ri";
import Modal from "react-modal";
import styled from "styled-components";
import axios from "axios";
import { useUserData } from "../../contexts/userContext.jsx";
import Like from "../shared/Like.jsx";
import { Link } from "react-router-dom";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import Comments from "./Comments.jsx";
import API from "./constants.jsx";
import { BiRepost } from "react-icons/bi";

export default function AllPosts({
  id,
  username,
  pictureUrl,
  link,
  article,
  urlTitle,
  urlDescription,
  urlImage,
  userId,
  sessionUserId,
  refreshAxios,
  setRefreshAxios,
  isRepost,
  userRepostId,
  reposterName,
  countReposts
}) {
  const [edit, setEdit] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [modalOpen, setModal] = useState(false);
  const [modalRepostOpen, setModalRepost] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [userData] = useUserData();
  const elem = useRef("");
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `Bearer ${userData.token}`, //Padrão da API (Bearer Authentication)
    },
  };

  let loadingAnimation = (
    <Oval
      height={80}
      width={80}
      color="#FFFFFF"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#000000"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );

  function showEdit() {
    setEdit(!edit);
  }

  function showModal() {
    setModal(!modalOpen);
  }

  function showModalRepost(){
    setModalRepost(!modalRepostOpen)
  }

  function sendText(event) {
    event.preventDefault();
    const dados = { text: elem.current.value };
    setLoadingEdit(true);
    const request = axios.put(
      `${API}/post/${id}`,
      dados,
      config
    );
    request
      .then((response) => {
        setLoadingEdit(false);
        setEdit(false);
        setRefreshAxios(!refreshAxios);
      })
      .catch((err) => {
        console.error(err);
        setLoadingEdit(false);
        setEdit(false);
        alert("Houve um erro ao editar seu post");
      });
  }

  function deletePost(event) {
    event.preventDefault();
    setLoadingDelete(true);
    const request = axios.delete(
      `${API}/post/${id}`,
      config
    );
    request
      .then((response) => {
        setLoadingDelete(false);
        setModal(false);
        setRefreshAxios(!refreshAxios);
      })
      .catch((err) => {
        console.error(err);
        setLoadingDelete(false);
        setModal(false);
        alert("Houve um erro ao excluir seu post");
      });
  }

  function EditIcons() {
    if (sessionUserId !== userId) {
      return <></>;
    }
    if (sessionUserId === userId) {
      return (
        <div className="icons">
          <TiPencil onClick={() => showEdit(id)}></TiPencil>
          <RiDeleteBin7Fill onClick={() => showModal(id)}></RiDeleteBin7Fill>
        </div>
      );
    }
  }

  function UrlImage() {
    if (urlImage[0] === "/") {
      const teste2 = link.split("/");
      const teste = `${teste2[0]}//${teste2[2]}${urlImage}`;
      return <img src={teste} className="urlInfoImg" alt="" />;
    }
    if (urlImage === "") {
      return (
        <img
          src="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png"
          className="urlInfoImg"
          alt=""
        />
      );
    } else {
      return <img src={urlImage} className="urlInfoImg" alt="" />;
    }
  }

  function ReposterName(){
    if(userRepostId === sessionUserId){
      return <Repost>
        <IconContext.Provider value={{color:"#FFFFFF", size: "20px"}}>
                  <BiRepost/>
                  </IconContext.Provider>
                  <h1>Re-posted by you</h1>
            </Repost>
    }else{
      return <Repost>
                  <IconContext.Provider value={{color:"#FFFFFF", size: "20px"}}>
                      <BiRepost/>
                  </IconContext.Provider>
                  <h1>Re-posted by {reposterName}</h1>
              </Repost>
    }
  }

  function createRepost(event){
      event.preventDefault()
      setLoadingDelete(true)
      const request = axios.post(`${API}/repost/${id}`, {}, config)
      request.then((response) =>{
        setLoadingDelete(false);
        setModalRepost(false);
        setRefreshAxios(!refreshAxios);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false)
        alert("Houve um erro ao repostar")
      })
  }
  return (
    <>
     <Container>
     {isRepost ? <ReposterName/> : <></>}
      <Posts>
        <div className="interactions">
          <Link to={`/user/${userId}`}>
            {" "}
            <img src={pictureUrl} />
          </Link>
          <Like id={id} />
          <IconContext.Provider value={{color:"#FFFFFF", size: "30px"}}>
          <div className="reposts" >
          <BiRepost onClick={() => showModalRepost(id)}></BiRepost>
          <p>{countReposts} re-posts</p>
          </div>
          </IconContext.Provider>
        </div>
        <div className="postInfo">
          <div className="postHeader">
            <span>
              <h2>{username}</h2>
              {edit ? (
                <form onSubmit={sendText}>
                  <input
                    ref={elem}
                    type="text"
                    placeholder={article}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        showEdit(id);
                      }
                    }}
                    disabled={loadingEdit}
                    style={{ marginBottom: "10px" }}
                  />
                  <button style={{ display: "none" }} type="submit"></button>
                </form>
              ) : (
                <ReactTagify
                  colors="#FFFFFF"
                  tagClicked={(e) => {
                    const trendingtag = e.replace("#", "");
                    navigate(`/hashtag/${trendingtag}`);
                  }}
                >
                  {" "}
                  <h3>{article}</h3>
                </ReactTagify>
              )}
            </span>
            <EditIcons />
          </div>
          <div
            className="urlInfo"
            style={{ cursor: "pointer" }}
            onClick={() => {
              window.open(link, "_blank");
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "16px",
                  marginBottom: "5px",
                  marginTop: "8px",
                }}
              >
                {urlTitle}
              </h3>
              <h3 style={{ fontSize: "11px", marginBottom: "14px" }}>
                {urlDescription}
              </h3>
              <h3 style={{ fontSize: "11px" }}>{link}</h3>
            </div>
            <div>
              <UrlImage />
            </div>
          </div>
        </div>

        <Modal
          isOpen={modalOpen}
          onRequestClose={showModal}
          contentLabel="Delete Modal"
          style={modalStyle}
        >
          <ContainerModal>
            {loadingDelete ? (
              loadingAnimation
            ) : (
              <>
                <h4>Are you sure you want to delete this post?</h4>
                <div className="modalButtons">
                  <button className="back" onClick={showModal}>
                    No, go back
                  </button>
                  <button type="submit" className="delete" onClick={deletePost}>
                    {" "}
                    Yes, delete it
                  </button>
                </div>
              </>
            )}
          </ContainerModal>
        </Modal>

        <Modal
            isOpen={modalRepostOpen}
            onRequestClose={showModalRepost}
            contentLabel="Delete Modal"
            style={modalStyle}
        >
          <ContainerModal>
            {loadingDelete ? (
              loadingAnimation
            ) : (
              <>
                <h4>Do you want to re-post this link?</h4>
                <div className="modalButtons">
                  <button className="back" onClick={showModalRepost}>
                    No, cancel
                  </button>
                  <button type="submit" className="delete" onClick={createRepost}>
                    {" "}
                    Yes, share!
                  </button>
                </div>
              </>
            )}
          </ContainerModal>
        </Modal>
      </Posts>
      </Container>
      <Comments id={id}/>
    </>
  );
}

const Posts = styled.div`
  width: 611px;
  height: 276px;
  background-color: #171717;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-bottom: 16px;
  padding-top: 18px;
  padding-bottom: 20px;
  box-sizing: border-box;
  display: flex;
  position: relative;

  img {
    margin-left: 18px;
    width: 53px;
    height: 53px;
    border-radius: 26.5px;
  }

  .postInfo {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 18px;
  }

  h2 {
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 9px;
    color: #ffffff;
    font-family: "Lato", sans-serif;
  }

  h3 {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 10px;
    line-height: 20px;
    font-family: "Lato", sans-serif;
    color: #b7b7b7;
    /* display: inline-block; */
    /* word-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  max-height: 3.6em; */
  }

  .urlInfo {
    width: 503px;
    height: 155px;
    border: 1px solid #4d4d4d;
    border-radius: 11px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 20px 0px 20px 20px;
  }

  .urlInfo > h3 {
    margin-bottom: 10px;
  }
  .urlInfoImg {
    width: 155px;
    height: 155px;
    border-radius: 0px 12px 8px 0px;
    box-sizing: border-box;
    display: flex;
  }

  .postHeader {
    height: 59px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .postHeader > span {
    height: 59px;
  }

  .icons {
    width: 40px;
    height: 59px;
    display: flex;
    justify-content: space-between;
  }

  .reposts{
    width: 50px; 
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 18px;
    flex-direction: column;
  }

  .reposts>p{
    margin-top: 5px;
    font-size: 11px;
    color: #ffffff;
  }

  @media (max-width: 935px) {
    width: 100vw;
    height: 30%;
    background-color: #171717;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
    border-radius: 0px;
    padding: 10px 18px 15px 0px;

    img {
      margin-left: 15px;
    }

    .postInfo {
      margin-left: 15px;
      width: 100%;
    }

    h2 {
      font-size: 17px;
      /* margin-bottom: 0px; */
    }

    h3 {
      font-size: 15px;
      /* margin-bottom: 0px; */
      line-height: 18px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 150px;
    }

    .urlInfo {
      width: 100%;
      height: 70%;
    }

    .urlInfo > h3 {
      margin-bottom: 4px;
    }
    .urlInfoImg {
      width: 95px;
      height: 30%;
      border-radius: 0px 12px 12px 0px;
    }
  }
`;

const ContainerModal = styled.div`
  width: 597px;
  height: 262px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  h4 {
    width: 350px;
    height: 82px;
    font-size: 34px;
    font-family: "Lato", sans-serif;
    font-weight: 700;
    color: #ffffff;
    text-align: center;
  }

  .modalButtons {
    width: 338px;
    display: flex;
    justify-content: space-evenly;
  }

  .modalButtons > button {
    width: 134px;
    height: 37px;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 700;
    border: 0;
  }

  .back {
    background-color: #ffffff;
    color: #1877f2;
  }

  .delete {
    background-color: #1877f2;
    color: #ffffff;
  }

  @media (max-width: 935px) {
    width: 70vw;
    height: 262px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    box-sizin: border-box;

    h4 {
      width: 50vw;
      height: 82px;
      font-size: 24px;
      font-family: "Lato", sans-serif;
      font-weight: 700;
      color: #ffffff;
      text-align: center;
    }

    .modalButtons {
      width: 50vw;
      display: flex;
      justify-content: space-evenly;
    }

    .modalButtons > button {
      width: 20vw;
      height: 37px;
      border-radius: 5px;
      font-size: 14px;
      font-weight: 700;
      border: 0;
    }

    .back {
      background-color: #ffffff;
      color: #1877f2;
    }

    .delete {
      background-color: #1877f2;
      color: #ffffff;
    }
  }
`;
const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "fit-content",
    width: "fit-content",
    backgroundColor: "#333333",
    borderRadius: "50px",
    border: "0",
  },
};

const Container = styled.div`
  width: 611px;
  height: 309px;
  display: flex;
  flex-direction: column;
  border-radius: 6px 6px 0 0;
  background-color: #1E1E1E;

  .interactions{
    display:flex;
    flex-direction: column;
    align-items: center;
  }
`
const Repost = styled.div`
    width: 611px;
    min-height: 33px;
    display: flex;
    align-items: center;
    padding-left: 13px;

    h1{
      color:#FFFFFF;
      font-size:11px;
    }
`