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
          <Link to={`issue/${id}`}>제목: {title}</Link>
        </th>
        <th>기한: {deadline}</th>
        <th>라벨: {label}</th>
        <th>진척상황: {progress}</th>
      </tr>
    );
  }
}
