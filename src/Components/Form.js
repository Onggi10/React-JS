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
    const { username, comment, topic } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="user_id">User ID : </label>
          <input
            type="text"
            value={username}
            onChange={this.handleUsernameChange}
            placeholder="Silahkan Masukkan ID Anda"
          />
        </div>

        <div>
          <label htmlFor="comment">Comment : </label>
          <textarea
            value={comment}
            onChange={this.handleCommentChange}
            placeholder="Silahkan Masukkan Pesan Anda"
          ></textarea>
        </div>

        <div>
          <label htmlFor="topic">Topic : </label>
          <select value={topic} onChange={this.handleTopicChange}>
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
