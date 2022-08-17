import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useUserData } from "../../contexts/userContext.jsx";
import refreshAxiosContext from "../../contexts/refreshAxiosContext.jsx";

export default function NewPost() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [userData] = useUserData();
  const [profilePic, setProfilePic] = useState("");
  const { refreshAxios, setRefreshAxios } = useContext(refreshAxiosContext);
  const config = {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  };

  useEffect(() => {
    const request =axios.get("https://projeto17-linkr-backend.herokuapp.com/pictureUrl", config) 
    request.then((response) => {
        const { pictureUrl } = response.data;
        setProfilePic(pictureUrl);
    }).catch((err) => 
        console.error(err));
  }, [userData.token]);

  function createPost(e) {
    setLoading(true);
    e.preventDefault();
    const data = {url: url, text: text}
    const promise = axios.post("https://projeto17-linkr-backend.herokuapp.com/post", data, config)
    promise.then(() => {
        alert("Post publicado com sucesso");
        setLoading(false);
        setRefreshAxios(!refreshAxios);
        setText("");
        setUrl("");
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        alert("Houve um erro ao publicar seu link");
      });
  }

  return (
    <Container>
      <img src={profilePic}></img>
      <Form onSubmit={createPost}>
        <h1>What are you going to share today?</h1>
            <input
              disabled = {loading}
              type="url"
              placeholder="http://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <textarea
              disabled = {loading}
              type="text"
              placeholder="Awesome article about #javascript"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="formButton">
            <button disabled={loading}>
             {loading ?  'Publishing...' : 'Publish'}
            </button></div>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  width: 611px;
  height: 209px;
  background: #ffffff;
  border-radius: 16px;
  display: flex;
  margin-bottom: 21px;
  box-sizing: border-box;
  padding-bottom: 16px;

  img {
    height: 50px;
    width: 50px;
    border-radius: 25px;
    margin: 18px;
  }

  @media (max-width: 935px) {
    justify-content: center;
    width: 100vw;
    height: 375px;
    border-radius: 0px;
    padding: 0px 15px 12px 15px;

    img {
      display: none;
    }
  }
`;

const Form = styled.form`
    padding-top: 21px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    h1{
      width: 445px;
      height: 40px;
      font-size: 20px;
      font-weight: 300;
      color: #707070;
      font-family: "Lato"; 
      font-style: normal;
    }

    input, textarea{
      width: 503px;
      height: 30px;
      background: #EFEFEF;
      border-radius: 5px;
      border: 0;
      padding-left: 13px;
      box-sizing: border-box;
    }

    textarea::placeholder, input::placeholder{
      color: #949494;
    }

    textarea{
      margin-top: 5px;
      height:66px;
      resize: none;
    }

    .formButton{
      width: 503px;
      height: 31px;
      display:flex;
      justify-content: flex-end;
      margin-top: 5px;
    }

    button{
      width: 112px;
      height: 31px;
      background: #1877F2;
      border-radius: 5px;
      border:0;
      color: #FFFFFF;
    }

    @media (max-width: 935px) {
      display:flex;
      align-items:center;
      h1{
        width: 90vw;
        text-align:center;
      }
      input, textarea{
        width: 90vw;
      }

      .formButton{
        width: 90vw;
      }
      button{
        height: 22px;
      }
      img {
        display: none;
      }
    }
`;
