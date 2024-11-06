import "./App.css";
import React from "react";
import Greet from "./Components/Greet";
import Welcome from "./Components/Welcome";
import ClickFunction from "./Components/ClickFunction";
import ClickClass from "./Components/ClickClass";
import EventBind from "./Components/EventBind";

function App() {
  return (
    <div className="App">
      {/* <Greet names="Onggi" username="Giw" color="Cyan" /> */}
      {/* <Welcome names="Onggi" username="Giw" /> */}
      {/* <ClickFunction /> */}
      {/* <ClickClass /> */}
      <EventBind />
    </div>
  );
}

export default App;
