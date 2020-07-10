import React from "react";
import "./App.css";
import Navigation from "./components/helpers/navigation";
import DataSharingService from "../src/components/helpers/dataShare";
import communicationService from "./components/helpers/communicationService";

export default class App extends React.Component<any, any> {
  async componentDidMount() {
    communicationService.init();
    const user = await sessionStorage.getItem("user");
    const userObject = await sessionStorage.getItem("userObject");
    if (user && user.length > 0) {
      DataSharingService.setUserName(user);
    }
    if (userObject && userObject.length > 0) {
      DataSharingService.setUserObject(JSON.parse(userObject));
    }
  }
  render() {
    return <Navigation />;
  }
}
