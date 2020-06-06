import React from 'react';
import "./App.css"
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"

import Product from "./components/Product"
import Seller from "./components/seller"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Product} />
        <Route path="/seller" exact component={Seller} />
      </Switch>
    </Router>
  );
}

export default App;
