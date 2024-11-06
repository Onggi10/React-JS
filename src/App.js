import "./App.css";
import React from "react";
import Greet from "./Components/Greet";
import Welcome from "./Components/Welcome";

function App() {
  return (
    <div className="App">
      <Greet names="Onggi" username="Giw" color="Cyan" />
      <Welcome names="Onggi" username="Giw" />
    </div>
  );
}

export default App;
