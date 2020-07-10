import React, { useState, useEffect, Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import DataSharingService from "../helpers/dataShare";
import CommunicationService from "../helpers/communicationService";
import Header from "./header";
import { ToggleButton } from "@material-ui/lab";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
const config = require("../helpers/config.json");

interface state {
  registrationType: boolean;
}

export default class Register extends Component<any, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      registrationType: false,
    };
  }
  handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: boolean
  ) => {
    this.setState({ registrationType: newFormats });
  };
  render() {
    return (
      <div style={{ minHeight: "100vh" }}>
        <Header />
        <div
          style={{
            height: window.innerHeight - 55,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            style={{
              minWidth: "30%",
              borderRadius: "15px",
            }}
          >
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>Register New</h1>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <h4>Register as:</h4>
                <ToggleButtonGroup
                  value={this.state.registrationType}
                  exclusive
                  onChange={this.handleAlignment}
                  aria-label="text alignment"
                >
                  <ToggleButton value={true} aria-label="left aligned">
                    Professor
                  </ToggleButton>
                  <ToggleButton value={false} aria-label="centered">
                    Student
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              <div>
                <TextField
                  style={{ margin: 5, width: "20em" }}
                  id="register-username"
                  label="Username"
                  variant="outlined"
                  //   value={userName}
                  //   onChange={(event) => setUserName(event.target.value)}
                />
                <TextField
                  style={{ margin: 5, width: "20em" }}
                  id="register-password"
                  label="Password"
                  variant="outlined"
                  //   value={password}
                  type="password"
                  //   onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div>
                <Button
                  variant="contained"
                  //   onClick={() => onRegister()}
                  color="primary"
                >
                  Register
                </Button>
              </div>
              <div style={{ width: "100%" }}>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#3f51b5",
                    padding: 0,
                    margin: 0,
                    textAlign: "end",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    //   setIsRegister(false);
                  }}
                >
                  login?
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      // <div
      //   style={{
      //     height: "100vh",
      //     display: "flex",
      //     justifyContent: "center",
      //     alignItems: "center",
      //     background: "linear-gradient(-45deg,#067AD9, #12848B)",
      //   }}
      // >
      //   <Card
      //     style={{
      //       minWidth: "30%",
      //       borderRadius: "15px",
      //     }}
      //   >
      //     <CardContent
      //       style={{
      //         display: "flex",
      //         flexDirection: "column",
      //         justifyContent: "center",
      //         alignItems: "center",
      //       }}
      //     >
      //       <h1>Register New</h1>
      //       <TextField
      //         style={{ margin: 5, width: "20em" }}
      //         id="register-username"
      //         label="Username"
      //         variant="outlined"
      //         //   value={userName}
      //         //   onChange={(event) => setUserName(event.target.value)}
      //       />
      //       <TextField
      //         style={{ margin: 5, width: "20em" }}
      //         id="register-password"
      //         label="Password"
      //         variant="outlined"
      //         //   value={password}
      //         type="password"
      //         //   onChange={(event) => setPassword(event.target.value)}
      //       />
      //       <Button
      //         variant="contained"
      //         //   onClick={() => onRegister()}
      //         color="primary"
      //       >
      //         Register
      //       </Button>
      //       <div style={{ width: "100%" }}>
      //         <p
      //           style={{
      //             fontSize: "14px",
      //             fontWeight: 600,
      //             color: "#3f51b5",
      //             padding: 0,
      //             margin: 0,
      //             textAlign: "end",
      //             cursor: "pointer",
      //           }}
      //           onClick={() => {
      //             //   setIsRegister(false);
      //           }}
      //         >
      //           login?
      //         </p>
      //       </div>
      //     </CardContent>
      //   </Card>
      // </div>
    );
  }
}
