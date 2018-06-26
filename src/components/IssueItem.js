import React from 'react';

export default class IssueItem extends React.Component {
  static defaultProps = {
    title: '',
    deadline: '',
    label: '',
    progress: '',
  };
  render() {
    const { title, deadline, label, progress } = this.props;
    return (
      <tr>
        <th>{title}</th>
        <th>{deadline}</th>
        <th>{label}</th>
        <th>{progress}</th>
      </tr>
    );
  }
}
