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
      <select value={value} onChange={this.handleChange}>
        <option value={0}>todo</option>
        <option value={1}>doing</option>
        <option value={2}>done</option>
      </select>
    );
  }
}
