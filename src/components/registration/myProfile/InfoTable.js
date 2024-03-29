import React from "react";
import "../../../css/table.css";
import styled from 'styled-components'
import { devices } from "../../../data/devices"
import Schedule from "./Schedule"
import { request } from "../../../data/fetch";


export default function InfoTable(props) {
  const status = ["", "In Cart", "Submitted", "Expired", "Paid"]
  function deleteOrder (id){
    request("/orders/delete", "post", {orderid: id}).then(res => {
      console.log(res)
      if (res[0]["error"]){
        console.log(res[0]["error"])
      }
      else{
        console.log('success')
        props.refetchOrders()
        console.log(props.refresh)
      }
    })
  }

  function confirmOrder(id){
    request("/orders/submit", "post", {orderid: id}).then((res) => {
      console.log(res)
      if (res[0]["error"]){
        console.log("program is full")
      }
      else{
        console.log('success')
        props.refetchOrders()
        console.log(props.refresh)
      }
    })
  }

  function displayButtons (i){
    if (props.fetchedOrders[i]["status"] === 1){
      return (
        <div style = {{display: "flex"}}>
          <Button name = "edit">Edit</Button>
          <Button name = "delete" onClick = {() =>deleteOrder(props.fetchedOrders[i]["ID"])}>Delete</Button>
          <Button name = "confirm" onClick = {() => confirmOrder(props.fetchedOrders[i]["ID"])}>Confirm</Button>
        </div>
      )
    }

  }
  return (
      <Container>
        {
          props.orders.map((schedule, i) => {
            var dateEdited = new Date(props.fetchedOrders[i]["Last Action"]).toLocaleDateString("en-US")
            return (
              <Order key = {i}>
                <Schedule schedule={schedule}/>
                <Summary>
                    <SummaryContainer>
                        <Info>
                          Total: {formatter.format(props.fetchedOrders[i]["Fee"])}<br></br>
                          Last edited: {dateEdited} <br></br>
                          Status: {status[props.fetchedOrders[i]["status"]]}
                        </Info>
                      {displayButtons(i)}
                    </SummaryContainer>
                </Summary>
              </Order>
            )
          }) 
        }
      </Container>
    );
}


const Container = styled.div`
  
  @media ${devices.tablet}{
    width: 95vw;
  }
`
const Order = styled.div`
  background-color: black;
  border: 1px solid black;
  @media ${devices.mobile}{

  }
  @media ${devices.tablet}{
    margin-bottom: 20px;
  }
`
const Summary = styled.div`
  outline: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #E0E5E9;
  border-top: 0;
  @media ${devices.mobile}{

  }

  @media ${devices.tablet}{
    padding: 20px 0px;

  }
`


const SummaryContainer = styled.div`
  display: flex;
  align-items: center;

  @media ${devices.mobile}{

  }

  @media ${devices.tablet}{
  }

`
const Info = styled.div`
  text-align: left;
  display: flex;
  align-items: center;
  @media ${devices.tablet}{
    height: 50px;
  }
  @media ${devices.laptop}{
    height: 50px;

  }

  @media ${devices.laptopL}{
    height: 80px;
    font-size: 18px;
  }
`

const Button = styled.a`
    background-color: ${(props) => {
      if (props.name === "edit") return "#07AEFC";
      else if (props.name === "delete") return "#91C4A9"
      else return "#90DCE8"
    }};
    border-radius: 25px;
    cursor: pointer;
    display: flex;
    justify-content: center;    
    align-items: center;
    cursor: pointer;
    text-decoration: none;
    &:focus, &:visited, &:link, &:active {
      text-decoration: none;
    }
    &:hover{
        transition: 0.5s;
        filter: brightness(1.25);
    }
  @media ${devices.mobile}{
    width: 150px;
    font-size: 5vw;
    height: 50px;

  }

  @media ${devices.tablet}{
      width: 10vw;
      height: 3vw;
      font-size: 1.5vw;
      margin-left: 25px;
      
  }
  @media ${devices.laptop}{
      width: 10vw;
      height: 2.5vw;
      font-size: 2vw;
      margin-left: 25px;

  }

  @media ${devices.laptopL}{
      width: 10vw;
      height: 2.5vw;
      font-size: 1.25vw;
  }
`



var formatter = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
});


