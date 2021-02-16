import React from "react";

class SearchParam extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <label htmlFor={this.props.name}>
          {this.props.fieldName}
          <input
            id={this.props.name}
            name={this.props.name}
            placeholder={this.props.placeholder}
            onChange={this.props.onChange}
          ></input>
        </label>
      </div>
    );
  }
}

export default SearchParam;
