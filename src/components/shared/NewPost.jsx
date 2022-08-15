import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useUserData } from "../../contexts/userContext.jsx";

export default function NewPost() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [userData] = useUserData();
  const [profilePic, setProfilePic] = useState("");

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

  function publishPost(e) {
    setLoading(true);
    e.preventDefault();
    axios
      .post(
        "https://projeto17-linkr-backend.herokuapp.com/post",
        { url, text },
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      )
      .then(() => {
        alert("Post publicado com sucesso");
        setLoading(false);
        window.location.reload(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
        alert("Houve um erro ao publicar seu link");
      });
  }

  return (
    <NewPostContainer>
      <img src={profilePic}></img>
      <PublicationForm>
        <h4>What are you going to share today?</h4>
        {loading ? (
          <form onSubmit={publishPost}>
            <input
              class="disabled"
              disabled
              type="url"
              placeholder="http://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <textarea
              class="disabled"
              disabled
              type="text"
              placeholder="Awesome article about #javascript"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button class="disabled" disabled>
              Publishing...
            </button>
          </form>
        ) : (
          <form onSubmit={publishPost}>
            <input
              type="url"
              placeholder="http://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <textarea
              type="text"
              placeholder="Awesome article about #javascript"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">Publish</button>
          </form>
        )}
      </PublicationForm>
    </NewPostContainer>
  );
}

const NewPostContainer = styled.div`
  width: 611px;
  height: 209px;
  background: #ffffff;
  border-radius: 16px;
  display: flex;
  position: relative;
  margin-bottom: 21px;
  padding-bottom: 52px;

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
    padding: 0px 15px 40px 15px;

    img {
      display: none;
    }
  }
`;

const PublicationForm = styled.div`
  margin-top: 21px;
  display:flex;
  flex-direction: column;
  width: 100%;

  h4 {
    font-size: 20px;
    font-family: "Lato", sans-serif;
    font-weight: 300;
    color: #707070;
    margin-bottom: 10px;
  }
  form {
    display: flex;
    flex-direction: column;
    .disabled {
      opacity: 0.7;
    }
    input,
    textarea {
      width: 477px;
      height: 30px;
      margin: 2.5px 0;
      background: #efefef;
      border-radius: 5px;
      border: none;
      padding: 0 13px;
      font-family: "Lato", sans-serif;
      font-weight: 300;
      font-size: 15px;
      ::placeholder {
        position: absolute;
        top: 5px;
        left: 13px;
      }
    }

    textarea {
      resize: none;
      height: 58px;
      padding: 5px 13px;
    }

    button {
      background: #1877f2;
      border-radius: 5px;
      border: none;
      width: 112px;
      height: 31px;
      color: #ffffff;
      position: absolute;
      bottom: 16px;
      right: 22px;
    }

    @media (max-width: 935px) {
      display: flex;
      /* justify-content: center; */

      input,
      textarea {
        width: 100%;
      }

      button {
        height: 25px;
        bottom: 9px;
        right: 15px;
      }
    }
  }
`;
