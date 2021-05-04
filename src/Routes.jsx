import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />
      </div>
    </Router>
  );
};

export default AppRouter;