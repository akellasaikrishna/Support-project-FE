import React, { Component, Fragment } from "react";
import DataSharingService from "../helpers/dataShare";
import send from "../../assets/sendmessage.png";
import CommunicationService from "../helpers/communicationService";
const config = require("../helpers/config.json");

interface state {
  userName: string;
  activeUsers: any;
  allUsers: any;
  message: string;
  userSocketId: string;
  selectedUser: any;
  user: any;
  messages: any;
}
const colorPallete = ["#2196F3", "#8BC34A"];
export default class Chat extends Component<any, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      userName: "",
      activeUsers: [],
      allUsers: [],
      message: "",
      userSocketId: "",
      selectedUser: null,
      user: null,
      messages: [],
    };
    CommunicationService.registerCallback(
      "conn ack",
      this,
      this.digestConnection
    );
    CommunicationService.registerCallback(
      "activeUsers",
      this,
      this.digestActiveUsers
    );
    CommunicationService.registerCallback(
      "received_message",
      this,
      this.digestMessages
    );
  }
  componentDidMount() {
    DataSharingService.getUserName.subscribe((res: any) => {
      this.setState({ userName: res });
    });
    DataSharingService.getUserObject.subscribe((res: any) => {
      this.setState({ user: res });
    });
    this.fetchAllUsers();
  }
  fetchAllUsers = () => {
    fetch(config.apiURL + "allUsers", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((d) => d.json())
      .then((res) => {
        if (res["status"] === 200) {
          console.log(res["data"]);
          this.setState({ allUsers: res["data"] });
        } else {
          alert(res["message"]);
        }
      });
  };
  updateUserSocket = () => {
    fetch(config.apiURL + "updateUser", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: this.state.userName,
        socketId: this.state.userSocketId,
      }),
    })
      .then((d) => d.json())
      .then((res) => {
        if (res["status"] === 200) {
          console.log(res);
          console.log(JSON.parse(sessionStorage.userObject));
          this.fetchAllUsers();
        } else {
          alert(res["message"]);
        }
      });
  };
  render() {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#f1f2f6",
        }}
      >
        <div
          style={{
            width: "22%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#74b9ff",
                margin: "1em",
                borderRadius: "55px",
                boxShadow: "0.2em 0.2em 0.5em",
                height: "60px",
                width: "60px",
              }}
            >
              <p
                style={{ fontSize: 15, fontWeight: 600, fontFamily: "Poppins" }}
              >
                {this.state.userName.toLocaleUpperCase().split("")[0]}
              </p>
            </div>
            <div>
              <p
                style={{ fontSize: 15, fontWeight: 600, fontFamily: "Poppins" }}
              >
                {this.state.userName.toLocaleUpperCase()}
              </p>
            </div>
          </div>
          <div style={{ margin: "0.8em 0em" }}>
            {this.state.allUsers &&
              this.state.allUsers.map((item: any, key: any) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      cursor: "pointer",
                      marginBottom: "15px",
                      padding: "10px",
                      backgroundColor:
                        this.state.selectedUser?.userName === item?.userName
                          ? "#70a1ff"
                          : "#f1f2f6",
                    }}
                    onClick={() =>
                      this.setState({ messages: [], selectedUser: item })
                    }
                    key={key}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor:
                          this.state.activeUsers.indexOf(item.socketId) != -1
                            ? colorPallete[1]
                            : colorPallete[0],
                        borderRadius: "55px",
                        flexDirection: "row",
                        cursor: "pointer",
                        height: "35px",
                        width: "35px",
                        margin: "0px 10px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          fontFamily: "Poppins",
                          textAlign: "center",
                          color: "#000000",
                        }}
                      >
                        {item?.userName.toLocaleUpperCase().split("")[0]}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          fontFamily: "Poppins",
                          textAlign: "center",
                          color: "#000000",
                        }}
                      >
                        {item?.userName.toLocaleUpperCase()}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div style={{ width: "78%" }}>
          {this.state.selectedUser == null ? (
            <Fragment>
              <div
                style={{
                  width: "100%",
                  height: this.state.selectedUser ? "90%" : "100%",
                  backgroundColor: "#b2bec3",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2>Select a user to chat</h2>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "13%",
                  paddingLeft: "15px",
                  alignItems: "center",
                  borderBottom: "1px solid #ecf0f1",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "1em",
                    width: "20%",
                  }}
                >
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      fontFamily: "Poppins",
                      color: "#000000",
                    }}
                  >
                    {this.state.selectedUser.userName.toLocaleUpperCase()}
                  </p>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "77%",
                  backgroundColor: "#FFFFFF",
                  overflow: "auto",
                  display: "flex",
                }}
              >
                {this.state.messages &&
                  this.state.messages.map((item: any, key: any) => {
                    return (
                      <div
                        key={key}
                        style={
                          item.receiverId.length === 0
                            ? {
                                width: "40%",
                                padding: "6px",
                                textAlign: "center",
                                borderRadius: "25px",
                                float: "right",
                                margin: "5px",
                                backgroundColor: "#3498db",
                                wordWrap: "break-word",
                              }
                            : {
                                width: "40%",
                                padding: "6px",
                                textAlign: "center",
                                borderRadius: "25px",
                                float: "left",
                                margin: "5px",
                                backgroundColor: "#686de0",
                                wordWrap: "break-word",
                              }
                        }
                      >
                        <p>{item.message}</p>
                      </div>
                    );
                  })}
              </div>
            </Fragment>
          )}
          {this.state.selectedUser && (
            <div
              style={{
                width: "100%",
                height: "10%",
                backgroundColor: "#FFFFFF",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <input
                style={{
                  padding: "15px",
                  borderRadius: "55px",
                  borderWidth: "0px",
                  backgroundColor: "#F1F1F4",
                  outline: "none",
                  width: "100%",
                  margin: "0px 15px",
                  boxShadow: "2px 2px 10px",
                }}
                type="text"
                placeholder="Type a message"
                value={this.state.message}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    this.sendMessage();
                  }
                }}
                onChange={(event) =>
                  this.setState({ message: event.target.value })
                }
              />
              {this.state.message.length > 0 && (
                <img
                  style={{
                    borderRadius: "10px",
                    width: "3%",
                    backgroundColor: "aliceblue",
                    padding: "10px",
                    margin: "0px 10px",
                  }}
                  src={send}
                  alt=""
                  onClick={() => this.sendMessage()}
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
  sendMessage = () => {
    this.setState(
      {
        messages: [
          ...this.state.messages,
          { receiverId: "", message: this.state.message },
        ],
      },
      () => {
        this.setState({ message: "" });
      }
    );
    CommunicationService.postMessage("send_message", {
      receiverId: this.state.selectedUser.socketId,
      message: this.state.message,
    });
  };
  digestConnection = (res: any) => {
    this.setState({ userSocketId: res["id"] }, () => {
      this.updateUserSocket();
    });
  };
  digestActiveUsers = (res: any) => {
    this.setState({ activeUsers: res }, () => {
      this.fetchAllUsers();
    });
  };
  digestMessages = (res: any) => {
    console.log(res);
    this.setState({ messages: [...this.state.messages, res] });
  };
}
