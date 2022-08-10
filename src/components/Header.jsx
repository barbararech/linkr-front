import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useUserData, saveUserDataInLocalStorage} from "../contexts/userContext.jsx";
import Input from "./Input.jsx";
import {BsSearch} from 'react-icons/bs';


export default function Header (){

    const [, setUserData] = useUserData();
    const navigate = useNavigate();
    
    function signOut (){
        setUserData("");
        saveUserDataInLocalStorage("");
        navigate("/");
    }

    return (
        <Container>
            <div className="top">
                <div className="logo"> <h2>linkr</h2> </div>

                <span className="toggle-desktop">
                    <div className="input"> <Input/> 
                        <div className="icon" > <BsSearch /> </div>
                    </div>
                </span>

                <div className="logout"> <h3 onClick={signOut}>Logout</h3> </div>
            </div>

            <span className="toggle-mobile">
                <div className="input-mobile"> <Input/>     
                    <div className="icon" > <BsSearch /> </div>
                </div>
            </span>

        </Container>
        
    )
}

const Container = styled.div`


  .top{
    color: #FFFFFF;
    background-color: #151515;
    height: 72px;
    display: flex;
    justify-content: space-between;
  }

  .logo{

    margin-top: 12px;

    h2{
    font-family: 'Passion One';
    font-style: normal;
    font-weight: 700;
    font-size: 49px;
    margin-left: 0.5em;
    }
  }

  .input{

    position: relative;
    margin-top: 13px;


    input{
    width: 50vw;
    height: 45px;
    background: #FFFFFF;
    border-radius: 8px;
    font-family: 'Lato';
    font-weight: 400;
    font-size: 19px;
    color: #515151;
    padding-left: 15px;
    padding-right: 35px;

    ::placeholder{
    color: #C6C6C6;
    }
  }
  }

  .input-mobile{

    position: relative;
    margin-top: 13px;
    margin-left: 2vw;
    margin-right: 2vw;

    input{
    width: 96vw;
    height: 45px;
    background: #FFFFFF;
    border-radius: 8px;
    font-family: 'Lato';
    font-weight: 400;
    font-size: 19px;
    color: #515151;
    padding-left: 15px;
    padding-right: 35px;

    ::placeholder{
    color: #C6C6C6;
    }
    }
}

  .icon{
    position: absolute;
    top: 12px;
    right: 12px;
    color: #C6C6C6;

  }

  .logout{

    margin-top: 24px;
    margin-right: 8px;

    h3{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: 0.05em;
    }
  }

  .toggle-desktop{

  }

  .toggle-mobile{
    display: none;
  }

  @media (max-width: 935px){
    .toggle-desktop {
        display: none;
    }

    .toggle-mobile{
        display: block;
    }
  }
`