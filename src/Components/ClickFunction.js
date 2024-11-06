import React from "react";

function ClickFunction() {
  function clickHandler() {
    console.log("Pressed");
  }
  return (
    <div>
      <button onClick={clickHandler}>Click Here</button>
    </div>
  );
}
export default ClickFunction;
