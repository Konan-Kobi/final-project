import React from 'react';

export default class IssueItem extends React.Component {
  render() {
    return (
      <tr>
        <th>title</th>
        <th>deadline</th>
        <th>label</th>
        <th>progress</th>
      </tr>
    );
  }
}
