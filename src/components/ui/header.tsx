import React, { Component } from "react";
import { Link, useRouteMatch } from "react-router-dom";

export default function Header() {
  const url = useRouteMatch();
  console.log(url);
  return (
    <div
      style={{
        minHeight: "55px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        background: "linear-gradient(30deg, #000000, #E91E63)",
        color: "#FFFFFF",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <p
          style={{
            fontSize: "15px",
            marginLeft: "30px",
            // width: "100px",
          }}
        >
          COMPUTER INFORMATION SCIENCE DEPARTMENT
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/contact">
          <p
            style={{
              fontSize: "15px",
              marginRight: "30px",
              color: "#FFFFFF",
            }}
          >
            ABOUT
          </p>
        </Link>
        <Link to="/contact">
          <p
            style={{
              fontSize: "15px",
              marginRight: "30px",
              color: "#FFFFFF",
            }}
          >
            CONTACT
          </p>
        </Link>
        <Link to="/login">
          <p
            style={{
              fontSize: "15px",
              marginRight: "30px",
              color: "#FFFFFF",
            }}
          >
            LOGIN
          </p>
        </Link>
        {url["path"] != "/register" && (
          <Link to="/register">
            <p
              style={{
                fontSize: "15px",
                marginRight: "30px",
                borderRadius: 5,
                border: "2px solid",
                padding: "10px",
                color: "#FFFFFF",
              }}
            >
              REGISTER
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}
