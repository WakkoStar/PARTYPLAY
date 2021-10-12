import React from 'react';

import './App.scss';

import Connection from '../Components/Connection';
import Home from '../Components/Home';
import Route from '../Components/Route';
import ThrowCube from '../Components/ThrowCube';

function App() {
  return (
    <div className="app">
      <Route path="">
        <Connection />
      </Route>
      <Route path="/session">
        <Home />
      </Route>
      <Route path="/session/throwCube">
        <ThrowCube />
      </Route>
    </div>
  );
}

export default App;
