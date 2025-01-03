import React from "react";
import PropTypes from "prop-types";

class ChildComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Message: "Welcome To My Website",
    };
  }

  render() {
    return (
      <div>
        <div>
          <h1>{this.state.Message}</h1>
        </div>
        <button onClick={this.props.greetHandler}>Next</button>
      </div>
    );
  }
}

// Menambahkan validasi PropTypes untuk greetHandler
ChildComponent.propTypes = {
  greetHandler: PropTypes.func.isRequired,
};

export default ChildComponent;
