import React, { useEffect } from "react";
import * as wssConnection from "./utils/wssConnection";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";

import LoginPage from "./LoginPage/LoginPage";
import Dashboard from "./Dashboard/Dashboard";

const App = () => {
  useEffect(() => {
    wssConnection.connectWithWebSocket();
  }, []);

  return (
    <div className="h-screen w-full">
      <Router>
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
