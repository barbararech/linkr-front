import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {
  useUserData,
  saveUserDataInLocalStorage,
} from "../../contexts/userContext.jsx";
import Input from "../Input.jsx";
import { BsSearch } from "react-icons/bs";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Header() {
  const [, setUserData] = useUserData();
  const navigate = useNavigate();

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

  function signOut() {
    setUserData("");
    saveUserDataInLocalStorage("");
    navigate("/");
  }

  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };

  return (
    <Container>
      <div className="top">
        <Link to="/timeline">
          <div className="logo">
            {" "}
            <h2>linkr</h2>{" "}
          </div>
        </Link>

        <span className="toggle-desktop">
          <div className="input">
            {" "}
            <Input />
            <div className="icon">
              {" "}
              <BsSearch />{" "}
            </div>
          </div>
        </span>

        <div>
          <div className="split">
            <div className="arrow" onClick={toggleClass}>
              {" "}
              {isActive ? <AiOutlineUp /> : <AiOutlineDown />}{" "}
            </div>
            <img className="right" onClick={toggleClass} src={profilePic} />
          </div>
          <div className={isActive ? "logout" : "hide"}>
            <h3 onClick={signOut}>Logout</h3>
          </div>
        </div>
      </div>

      <span className="toggle-mobile">
        <div className="input-mobile">
          {" "}
          <Input />
          <div className="icon">
            {" "}
            <BsSearch />{" "}
          </div>
        </div>
      </span>
    </Container>
  );
}

const Container = styled.div`
  .top {
    color: #ffffff;
    background-color: #151515;
    height: 72px;
    display: flex;
    justify-content: space-between;
  }

  .logo {
    margin-top: 12px;
    h2 {
      font-family: "Passion One";
      font-style: normal;
      font-weight: 700;
      font-size: 49px;
      margin-left: 0.5em;
    }
  }
  .input {
    position: relative;
    margin-top: 13px;
    input {
      width: 50vw;
      height: 45px;
      background: #ffffff;
      border-radius: 8px;
      font-family: "Lato";
      font-weight: 400;
      font-size: 19px;
      color: #515151;
      padding-left: 15px;
      padding-right: 35px;
      ::placeholder {
        color: #c6c6c6;
      }
    }
  }
  .input-mobile {
    position: relative;
    margin-top: 13px;
    margin-left: 2vw;
    margin-right: 2vw;
    input {
      /* aqui */
      width: 100%;
      height: 45px;
      background: #ffffff;
      border-radius: 8px;
      font-family: "Lato";
      font-weight: 400;
      font-size: 19px;
      color: #515151;
      padding-left: 15px;
      padding-right: 35px;
      ::placeholder {
        color: #c6c6c6;
      }
    }
  }
  .icon {
    position: absolute;
    top: 12px;
    right: 12px;
    color: #c6c6c6;
  }

  .hide {
    display: none;
  }

  .right {
    width: 53px;
    height: 53px;
    border-radius: 26.5px;
    margin: 10px;
    margin-top: 12px;
  }

  .arrow {
    padding-top: 30px;
  }

  .split {
    display: flex;
  }

  .logout {
    margin-top: -5px;
    margin-left: -27px;
    padding-top: 10px;
    padding-left: 35px;
    width: 120px;
    height: 47px;
    background-color: #171717;
    border-radius: 0px 0px 0px 20px;
    position: absolute;
    z-index: 1;
    cursor:pointer;

    h3 {
      font-family: "Lato";
      font-style: normal;
      font-weight: 700;
      font-size: 17px;
      line-height: 20px;
      letter-spacing: 0.05em;
    }
  }

  .toggle-desktop {
  }

  .toggle-mobile {
    display: none;
  }

  a {
    text-decoration: none;
    color: #ffffff;
  }

  @media (max-width: 935px) {
    width: 100%;
    .toggle-desktop {
      display: none;
    }
    .toggle-mobile {
      display: block;
      /* width:100vw; */
    }

    .right {
      width: 41px;
      height: 41px;
      border-radius: 26.5px;
      margin: 15px;
    }

    .logo {
      margin-top: 15px;
      h2 {
        font-size: 45px;
      }
    }
  }
`;
