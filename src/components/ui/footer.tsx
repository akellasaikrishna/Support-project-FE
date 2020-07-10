import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div
        style={{
          minHeight: "125px",
          padding: "4em",
          backgroundColor: "#000000",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{ width: "2%", margin: "0px 10px" }}
            src="https://pngimg.com/uploads/facebook_logos/facebook_logos_PNG19748.png"
            alt=""
          />
          <img
            style={{ width: "2%", margin: "0px 10px" }}
            src="https://pngimg.com/uploads/twitter/twitter_PNG28.png"
            alt=""
          />
          <img
            style={{ width: "2%", margin: "0px 10px" }}
            src="https://www.freepnglogos.com/uploads/instagram-logos-png-images-free-download-2.png"
            alt=""
          />
        </div>
        <hr style={{ color: "#828282" }} />
      </div>
    );
  }
}
