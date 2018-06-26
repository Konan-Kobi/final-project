import React from 'react';
import { Link } from 'react-router-dom';
export default class IssueItem extends React.Component {
  static defaultProps = {
    title: '', // issue title
    deadline: '', // issue deadline
    label: '', // issue label
    progress: '', // issue progress
  };
  render() {
    const { title, deadline, label, progress, id } = this.props;
    return (
      <tr>
        <th>
          <Link to={`issue/${id}`}>{title}</Link>
        </th>
        <th>{deadline}</th>
        <th>{label}</th>
        <th>{progress}</th>
      </tr>
    );
  }
}
