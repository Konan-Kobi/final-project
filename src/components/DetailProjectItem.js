import React from 'react';
import { Link } from 'react-router-dom';
export default class DetailProjectItem extends React.Component {
  render() {
    const username = this.props.user.username;
    const { label, title, deadline, progress, id, projectId } = this.props;
    return (
      <tbody>
        <tr>
          <td>{username}</td>
          <td>{label}</td>
          <td>
            <Link to={`/project/${projectId}/issue/${id}`}>{title}</Link>
          </td>
          <td>{deadline}</td>
          <td>{progress}</td>
        </tr>
      </tbody>
    );
  }
}
