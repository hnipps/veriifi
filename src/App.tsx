import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import UploadId from "./pages/UploadId";
import UploadPhoto from "./pages/UploadPhoto";
import ThankYou from "./pages/ThankYou";
import Introduction from "./pages/Introduction";
import Header from "./components/Header";

import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main className="mt4 mw7 center">
        <Switch>
          <Route path="/photo">
            <UploadPhoto />
          </Route>
          <Route path="/done">
            <ThankYou />
          </Route>
          <Route path="/id">
            <UploadId />
          </Route>
          <Route path="/">
            <Introduction />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
