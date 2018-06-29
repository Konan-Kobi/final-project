import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
export default class IssueItem extends React.Component {
  static defaultProps = {
    title: '', // issue title
    deadline: '', // issue deadline
    label: '', // issue label
    progress: '', // issue progress
  };
  render() {
    const {
      title,
      deadline,
      label,
      progress,
      id,
      projectId,
      created,
    } = this.props;
    return (
      <Table.Row>
        <Table.Cell>{label}</Table.Cell>
        <Table.Cell>
          <Link to={`/project/${projectId}/issue/${id}`}>{title}</Link>
        </Table.Cell>
        <Table.Cell>{progress}</Table.Cell>
        <Table.Cell>{created}</Table.Cell>
        <Table.Cell>{deadline}</Table.Cell>
      </Table.Row>
    );
  }
}
