// src/App.js
import React from "react";
import AuctionsPage from "./pages/AuctionsPage";
import NavBar from "./Components/NavBar";
import PrivateRoute from "./utils/PrivateRoute";
import { Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";

function App() {
  const history = createBrowserHistory();
  return (
    <div>
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <div className="wrapper">
          <Switch>
            <PrivateRoute path="/" exact component={AuctionsPage} />
            <PrivateRoute path="/auctions" component={AuctionsPage} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
