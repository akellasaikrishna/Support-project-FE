import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "../ui/login";
import DataSharingService from "../helpers/dataShare";
import Chat from "../ui/chat";
import Dashboard from "../ui/dashboard";
import Register from "../ui/register";

export default class Navigation extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      authenticated: false,
    };
  }
  componentDidMount() {
    DataSharingService.getUserName.subscribe((data: any) => {
      if (data.length > 0) {
        this.setState({ authenticated: true });
      } else {
        this.setState({ authenticated: false });
      }
    });
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            children={this.state.authenticated ? <Dashboard /> : <Dashboard />}
          />
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <this.PrivateRoute path="/chat">
            <Chat />
          </this.PrivateRoute>
        </Switch>
      </Router>
    );
  }

  PrivateRoute = ({ children, ...rest }: any) => {
    return (
      <Route
        {...rest}
        render={() =>
          this.state.authenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          )
        }
      />
    );
  };
}
