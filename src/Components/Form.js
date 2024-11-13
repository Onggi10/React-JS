// Basic of form handling

import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      comment: "",
      topic: "",
    };
  }

  handleUsernameChange = (event) => {
    this.setState({
      username: event.targetValue,
    });
  };

  handleCommentChange = (event) => {
    this.setState({
      comment: event.targetValue,
    });
  };

  handleTopicChange = (event) => {
    this.setState({
      topic: event.targetValue,
    });
  };

  render() {
    return (
      <form>
        <div>
          <label>User ID : </label>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />
        </div>

        <div>
          <label>Comment : </label>
          <textarea
            value={this.state.comment}
            onChange={this.handleCommentChange}
          ></textarea>
        </div>

        <div>
          <label>Topic : </label>
          <select value={this.state.topic} onChange={this.handleTopicChange}>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="react">React</option>
          </select>
        </div>
      </form>
    );
  }
}

export default Form;
