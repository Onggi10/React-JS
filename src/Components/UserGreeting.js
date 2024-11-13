import React, { Component } from "react";

class UserGreeting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogged: true,
    };
  }
  render() {
    return this.state.isLogged ? (
      <h1>Welcome User You Is login</h1>
    ) : (
      <h1>Welcome Guest You Are Not login</h1>
    );
  }
  // let Message;
  // if (this.state.isLogged) {
  //   Message = (
  //     <div>
  //       <h1>Welcome User Your Is Logged in</h1>
  //     </div>
  //   );
  // } else {
  //   Message = (
  //     <div>
  //       <h1>Please Login Now</h1>
  //     </div>
  //   );
  // }
  // return <div>{Message}</div>;

  // if (this.state.isLogged) {
  //   return (
  //     <div>
  //       <h1>Welcome Onggi, You are logged in</h1>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div>
  //       <h1>Welcome Onggi You are log in</h1>
  //     </div>
  //   );
  // }
}

export default UserGreeting;
