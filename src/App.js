// src/App.js
import React from "react";
import HomePage from "./pages/HomePage";
import NavBar from "./Components/NavBar";
// import PrivateRoute from "./utils/PrivateRoute";
import { Router, Route, Switch } from "react-router-dom";
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
            <Route path="/" exact component={HomePage} />
            {/* <PrivateRoute path="/" exact component={AuctionsPage} />
          <PrivateRoute path="/auctions" component={AuctionsPage} />
          <PrivateRoute path="/create" component={CreateAuctionPage} /> */}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
