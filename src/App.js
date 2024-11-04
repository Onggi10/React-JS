import "./App.css";
import React, { Component } from "react";
import Greet from "./Components/Greet";
import Welcome from "./Components/Welcome";
import Love from './Components/Love'


function App() {
  return (
    <div className="App">
      <Greet />
      <Love />
      <Welcome />
    </div>
  );
}

export default App;
