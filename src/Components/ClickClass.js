import React, { Component } from "react";

class ClickClass extends Component {
  clickHandler() {
    console.log("Tombol Ke 2 Di Klik");
  }
  render() {
    return (
      <div>
        <button onClick={this.clickHandler}>Click me!</button>
      </div>
    );
  }
}

export default ClickClass;
