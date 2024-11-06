import React, { Component } from "react";

class EventBind extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "Hello",
    };
  }

  clickHandler(){
    console.log("Tombol Di Klik");
    
  }
  render() {
    return (
      <div>
        <div>
          <h1>{this.state.message}</h1>
        </div>
        <button onClick={this.clickHandler}>Click Me</button>
      </div>
    );
  }
}

export default EventBind;
