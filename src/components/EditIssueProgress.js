import React from 'react';

export default class EditIssueProgress extends React.Component {
  state = {
    value: null,
  };

  handleChange = e => {
    this.props.patchProgress(e.target.value);
    this.setState({
      value: e.target.value,
    });
  };
  render() {
    const value =
      this.state.value === null ? this.props.issue.progress : this.state.value;
    return (
      <select
        value={value}
        onChange={this.handleChange}
        id="EditIssueProgress__Select"
      >
        <option value="todo">todo</option>
        <option value="doing">doing</option>
        <option value="done">done</option>
      </select>
    );
  }
}
