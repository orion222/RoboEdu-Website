import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { devices } from "../../data/devices";
import { request } from "../../data/fetch";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SelectTimeTable(props) {
  const tableStyle = {
    color: "black",
    width: "1000px",
  };

  const tableHeaderStyle = {
    backgroundColor: "#04aa6d",
    color: "white",
    width: "11%"
  };

  const mainTableHeaderStyle = {
    backgroundColor: "#04aa6d",
    color: "white",
    width: "78%"
  };

  const [weeks, setWeeks] = useState([]);
  const auth = sessionStorage.getItem("authkey");

  const getWeeks = async () => {
    props.selectedStudents.map(
      async (i) => {
        return await request("/programs/getweeks", "post", {
          authkey: auth,
          studentid: i
        })
        .then(
          (res) => {
            console.log(res);
            setWeeks(res);
          }
        ).catch(err => {
          console.log(err)
        });
      }
    );
  }

  useEffect(() => {
    getWeeks();
  }, []);

  const Table = (props) => {
    const {data} = props
    console.log({data});

    return(
      <table style={tableStyle}>
        <tbody>
          <tr>
            <th style={tableHeaderStyle}>Time</th>
            <th style={mainTableHeaderStyle}>Summary</th>
            <th style={tableHeaderStyle}>Select</th>
          </tr>

          {data.map(row =>
            {if(row !== null){
              <Row
              id = {row.ID}
              week = {row.Week}
              program = {row.Program}/>
            }}
          )}
        </tbody>
      </table>
    );
  };

  const Row = (props) => {
    const {id, week, program} = props
    
    return(
      <React.Fragment>
        <tr>
          <td height={30}>Week {week}</td>
          <td height={30}>Program: {program}</td>
          <td rowSpan={3}>
          <div class="form-check" style={{display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
            <input class="form-check-input" type="checkbox" value="" id={id} onClick={(c) => updateWeeks(c.target)}/>
          </div>
          </td>
        </tr>
      </React.Fragment>
    );
  };

  const updateWeeks = (w) => {
    
  };

  const sendWeeks = () => {
    props.setPage(3)
    props.setTitle(3);
  };

  return (
    <Container>
      {/* <table style={tableStyle}>
        <tr>
          <th style={tableHeaderStyle}>Time</th>
          <th style={mainTableHeaderStyle}>Summary</th>
          <th style={tableHeaderStyle}>Select</th>
        </tr>
        <tr>
          <td rowSpan={3}>Week 1</td>
          <td>Program 1</td>
          <td rowSpan={3}>
          <div class="form-check" style={{display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
            <label class="form-check-label" for="flexCheckDefault"/>
          </div>
          </td>
        </tr>
        <tr>
          <td>Program 2</td>
        </tr>
        <tr>
          <td>Program 3</td>
        </tr>
        <tr>
          <td rowSpan={3}>Week 2</td>
          <td>Program 1</td>
          <td rowSpan={3}>
          <div class="form-check" style={{display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
            <label class="form-check-label" for="flexCheckDefault"/>
          </div>
          </td>
        </tr>
        <tr>
          <td>Program 2</td>
        </tr>
        <tr>
          <td>Program 3</td>
        </tr>
      </table> */}

      <Table data = {weeks}/>

      <Box>
        <Button onClick = {() => {
          props.setTitle(1);
          props.setPage(1)}}>Back</Button>
        <Button onClick = {() => sendWeeks()}>Next</Button>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  @media ${devices.mobile} {
    width: 80vw;
  }

  @media ${devices.laptop} {
    width: 60vw;
  }
`;

const Box = styled.div`
  position: relative;
  display: flex;
  @media ${devices.tablet}{
    left: 25px;
    padding: 25px 0px;
  }
  @media ${devices.laptop} {
    left: 50px;
    padding: 25px 0px;
  }
`;

const Button = styled.a`
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

  &:link {
    text-decoration: none;
  }
  &:visited {
    text-decoration: none;
  }
  &:hover {
    text-decoration: none;
  }
  &:active {
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
    width: 20vw;
    height: 5vw;
    font-size: 1vw;
    margin-right: 0;
  }
  @media ${devices.laptop} {
    width: 10vw;
    height: 2vw;
    font-size: 1vw;
  }

  @media ${devices.laptopL} {
    width: 10vw;
    height: 2vw;
    font-size: 1vw;
  }
`;