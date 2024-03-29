import React, { useState } from "react";
import styled from "styled-components";
import { devices } from "../../data/devices";
import { request } from "../../data/fetch";
import { useNavigate } from 'react-router-dom'
import "../../css/index.css";

export default function EmailLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");


  var input = document.getElementById("myInput");
  if (input){
    input.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        onSubmit();
      }
    });
  }
  const navigate = useNavigate()
  function onSubmit() {
    if (email !== "" && password !== ""){
      request("/logins/loginemailpswd", "post", {
        email: email,
        password: password,
        expiry: 1000,
      }).then((res) => {
        console.log(res);

        // invalid credentials
        if (res["auth-key"] === undefined) {
          setSuccess(false)
        }
        // successful login
        else {
          console.log(res["auth-key"])
          sessionStorage.setItem("authkey", res["auth-key"]);
          console.log(res["user id"])
          setSuccess(true)
          navigate("/Home", {state:{parentid: res["user id"]}})
        }
      });
    }
  }

  console.log("Email:", email)
  console.log("password:", password);
  return (
    <Container>
      <div>
        <Box>
          <Label>Email:</Label>
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Box>
        <Box>
          <Label>Password:</Label>
          <Input
            id="myInput"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          
          />
        </Box>
        <Submit
          id="myBtn"
          onClick={() => {
            onSubmit();
          }}
        >
          Login
        </Submit>
        <Message success = {success}> {(success !== "") ? (success) ? "Success": "Invalid Credentials": ""} </Message>
      </div>

    </Container>
    
  );
}
const Message = styled.div`
  font-family: "roboFont";
  position: relative;
  margin-left: auto;
  text-align: center;
  color: ${(props) => (props.success) ? "green": "red"};
  @media ${devices.tablet}{
    font-size: 1vw;
    width: 3vw;
    margin-top: 10px;

  }

  @media ${devices.laptopL}{
    width: 15vw;
    margin-top: 10px;
  }
`
const Submit = styled.a`
  background-color: #aac9d4;
  border-radius: 25px;
  cursor: pointer;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-top: 3vh;
  cursor: pointer;
  type: "submit";
  font-family: "roboFont";
  text-decoration: none;
  &:focus, &:visited, &:link, &:active {
    text-decoration: none;
  }
  &:hover {
    transition: 0.5s;
    background-color: #edd662;
  }
  @media ${devices.mobile} {
    width: 150px;
    font-size: 5vw;
    height: 50px;
    margin-left: auto;
    margin-right: auto;
  }

  @media ${devices.tablet} {
    width: 25vw;
    height: 8.33vw;
    font-size: 3vw;
    margin-right: 0;
  }
  @media ${devices.laptop} {
    width: 15vw;
    height: 5vw;
    font-size: 2vw;
  }

  @media ${devices.laptopL} {
    width: 15vw;
    height: 3.5vw;
    font-size: 2vw;
  }
`;

const Box = styled.div`
  display: flex;
  margin: auto;
  position: relative;
  justify-content: space-between;
  @media ${devices.mobile} {
    padding: 40px 40px 10px;
    flex-direction: column;
  }
  @media ${devices.tablet} {
    padding: 50px 40px 10px;
    flex-direction: row;
    align-items: center;
    width: 60vw;
  }

  @media ${devices.laptop} {
    padding: 50px 40px 10px;
    flex-direction: row;
    align-items: center;
    width: 45vw;
  }

  @media ${devices.laptopL} {
    padding: 50px 40px 10px;
    flex-direction: row;
    align-items: center;
    width: 40vw;
  }
`;

const Container = styled.div`
  background-color: #475f6f;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative;
  bottom: 0px;
`;

const Input = styled.input`
    type: "text";
    required
    autofocus
    font-size: 40px;

    @media ${devices.mobile}{
        font-weight: normal;
        height: 3vh;
        
    }

    @media ${devices.tablet}{
        width: 40vw;
        height: 5vh;
        font-size: 25px;

    }

    @media ${devices.laptop}{
        width: 30vw;
        height: 5vh;
        font-size: 30px;
    }
    @media ${devices.laptopL}{
        height: 4.5vh;
        width: 30vw;
        font-size: 25px;
    }
`;

const Label = styled.div`
  font-weight: bold;
  color: white;
  font-family: "roboFont";
  @media ${devices.mobile} {
    font-size: 20px;
  }

  @media ${devices.tablet} {
    font-size: 25px;
  }

  @media ${devices.laptop} {
    font-size: 25px;
  }

  @media ${devices.laptopL} {
    font-size: 30px;
  }
`;
