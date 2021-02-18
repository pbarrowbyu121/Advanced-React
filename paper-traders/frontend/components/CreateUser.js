import React from "react";
import axios from "axios";

class CreateUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
    };
  }

  // handler for changing username field
  handleChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  // handler for submitting username
  onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: this.state.username,
    };

    console.log(user);
    // axios
    //   .post("http://localhost:5000/user/add", user)
    //   .then((res) => console.log(res.data));

    this.setState({
      username: "",
    });
  };

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Username: </label>
            <input
              type="text"
              required
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input type="submit" value="Create User" />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateUser;
