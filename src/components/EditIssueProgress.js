import React from 'react';
import { Dropdown } from 'semantic-ui-react';

export default class EditIssueProgress extends React.Component {
  state = {
    value: null,
    loading: false,
  };

  handleChange = async (e, value) => {
    this.setState({
      loading: true,
    });
    await this.props.patchProgress(value.value);
    this.setState({
      value: value.value,
      loading: false,
    });
  };

  render() {
    let value =
      this.state.value === null ? this.props.issue.progress : this.state.value;
    if (value === '0') {
      value = 'todo';
    } else if (value === '1') {
      value = 'doing';
    } else {
      value = 'done';
    }
    return (
      <React.Fragment>
        {/* <select value={value} onChange={this.handleChange}>
          <option value={0}>todo</option>
          <option value={1}>doing</option>
          <option value={2}>done</option>
        </select> */}
        <Dropdown
          options={[
            { key: 'todo', value: '0', text: 'todo' },
            { key: 'doing', value: '1', text: 'doing' },
            { key: 'done', value: '2', text: 'done' },
          ]}
          placeholder={value}
          onChange={this.handleChange}
          loading={this.state.loading}
        />
      </React.Fragment>
    );
  }
}
