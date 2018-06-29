import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
export default class DetailProjectItem extends React.Component {
  render() {
    const username = this.props.user.username;
    const {
      label,
      title,
      deadline,
      progress,
      id,
      projectId,
      created,
    } = this.props;

    return (
      <Table.Row>
        <Table.Cell>{username}</Table.Cell>
        <Table.Cell>{label}</Table.Cell>
        <Table.Cell>
          <Link to={`/project/${projectId}/issue/${id}`}>{title}</Link>
        </Table.Cell>
        <Table.Cell>{progress}</Table.Cell>
        <Table.Cell>{created}</Table.Cell>
        <Table.Cell>{deadline}</Table.Cell>
        <Table.Cell>{'남은시간 넣을 것'}</Table.Cell>
      </Table.Row>
    );
  }
}
