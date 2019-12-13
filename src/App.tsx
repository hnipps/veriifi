import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import UploadId from "./pages/UploadId";
import UploadPhoto from "./pages/UploadPhoto";

import "./App.css";

const App: React.FC = () => {
  return (
    <main className="mt4 mw7 center">
      <Router>
        <Switch>
          <Route path="/photo">
            <UploadPhoto />
          </Route>
          <Route path="/done">
            <div>DONE!</div>
          </Route>
          <Route path="/">
            <UploadId />
          </Route>
        </Switch>
      </Router>
    </main>
  );
};

export default App;
