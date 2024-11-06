import React, { Component } from "react";
import PropTypes from "prop-types";

class Welcome extends Component {
  render() {
    const { names, username } = this.props;
    return (
      <div>
        <h1>
          Welcome {names}, Your username is : {username}
        </h1>
      </div>
    );
  }
}

Welcome.propTypes = {
  names: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default Welcome;
