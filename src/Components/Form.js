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
      username: event.target.value, // Perbaikan di sini
    });
  };

  handleCommentChange = (event) => {
    this.setState({
      comment: event.target.value, // Perbaikan di sini
    });
  };

  handleTopicChange = (event) => {
    this.setState({
      topic: event.target.value, // Perbaikan di sini
    });
  };

  handleSubmit = (event) => {
    // event.preventDefault(); // Agar form tidak langsung refresh setelah submit
    alert(`${this.state.username} ${this.state.comment} ${this.state.topic}`);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>User ID : </label>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleUsernameChange}
            placeholder="Silahkan Masukkan ID Anda"
          />
        </div>

        <div>
          <label>Comment : </label>
          <textarea
            value={this.state.comment}
            onChange={this.handleCommentChange}
            placeholder="Silahkan Masukkan Pesan Anda"
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

        <button type="submit">Save</button>
      </form>
    );
  }
}

export default Form;
