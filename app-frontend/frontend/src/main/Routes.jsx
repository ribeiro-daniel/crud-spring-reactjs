import React from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";

import Home from "../components/home/Home";
import User from "../components/user/User";
import Login from "../components/user/Login";

import StoreProvider from "../components/Store/Provider";
import RoutesPrivate from "../components/Routes/Private/Private";

export default (props) => (
  <StoreProvider>
    <BrowserRouter>
      <Switch>
        <RoutesPrivate exact path="/" component={Home} />
        <RoutesPrivate exact path="/users" component={User} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  </StoreProvider>
);
