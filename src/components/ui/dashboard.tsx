import React, { Component } from "react";
import Header from "./header";
import Footer from "./footer";

export default class Dashboard extends Component {
  render() {
    return (
      <div style={{ minHeight: "100vh" }}>
        <Header />
        <div>
          <img
            style={{ width: "100%" }}
            src={require("../../assets/gannon.jpg")}
            alt=""
          />
        </div>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              letterSpacing: "4px",
              fontFamily: "Segoe UI",
              fontWeight: 400,
              fontSize: "30px",
              margin: 0,
              padding: 0,
              width: "60%",
              textAlign: "center",
            }}
          >
            MASTER OF SCIENCE IN COMPUTER AND INFORMATION SCIENCE OPTIONS
          </h2>
          <p
            style={{
              fontSize: "15px",
              opacity: "0.60",
              margin: "35px 0px",
              fontWeight: 600,
            }}
          >
            <i
              style={{
                fontFamily: "Segoe UI",
              }}
            >
              Believe in the Possibilities
            </i>
          </p>
          <p
            style={{
              fontFamily: "Segoe UI",
              fontSize: "15px",
              textAlign: "justify",
              width: "60%",
            }}
          >
            The Master of Science in Computer and Information Science offers
            students three options, which allow the student to select a
            technology, analytical or a practical and applied focus for the
            application of computing technologies. These consist of Information
            Technology, Data Science and Software Engineering. Each option
            consists of 30 credits of graduate work beyond the foundations
            series, and each specifies its own foundations series courses. The
            specific courses of study for each option is described below.
          </p>
        </div>
        <Footer />
      </div>
    );
  }
}
