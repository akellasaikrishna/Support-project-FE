import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import DataSharingService from "../helpers/dataShare";
import CommunicationService from "../helpers/communicationService";
const config = require("../helpers/config.json");

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [socketId, setSocketId] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const history = useHistory();
  const onLogin = () => {
    fetch(config.apiURL + "doLogin", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: userName, password: password }),
    })
      .then((d) => d.json())
      .then((res) => {
        if (res["status"] === 200) {
          console.log(res);
          DataSharingService.setUserName(res["data"]["user"]["userName"]);
          DataSharingService.setUserObject(res["data"]["user"]);
          sessionStorage.setItem("user", res["data"]["user"]["userName"]);
          sessionStorage.setItem(
            "userObject",
            JSON.stringify(res["data"]["user"])
          );
          window.location.reload(false);
        } else {
          alert(res["message"]);
        }
      });
  };
  const onRegister = () => {
    fetch(config.apiURL + "doRegister", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
        socketId: "initialSocket",
      }),
    })
      .then((d) => d.json())
      .then((res) => {
        if (res["status"] === 200) {
          setUserName("");
          setPassword("");
          setIsRegister(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  if (!isRegister) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(45deg,#067AD9, #12848B)",
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
            <h1>Login</h1>
            <TextField
              style={{ margin: 5, width: "20em" }}
              id="login-username"
              label="Username"
              variant="outlined"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
            <TextField
              style={{ margin: 5, width: "20em" }}
              id="login-password"
              label="Password"
              variant="outlined"
              value={password}
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => onLogin()}
              color="primary"
            >
              Login
            </Button>
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
                  setIsRegister(true);
                }}
              >
                register?
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(-45deg,#067AD9, #12848B)",
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
            <TextField
              style={{ margin: 5, width: "20em" }}
              id="register-username"
              label="Username"
              variant="outlined"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
            <TextField
              style={{ margin: 5, width: "20em" }}
              id="register-password"
              label="Password"
              variant="outlined"
              value={password}
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => onRegister()}
              color="primary"
            >
              Register
            </Button>
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
                  setIsRegister(false);
                }}
              >
                login?
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
