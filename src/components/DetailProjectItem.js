import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import { timeConverter, getRemainingHours } from '../DateAPI';
export default class DetailProjectItem extends React.Component {
  static defaultProps = {
    username: '', // 해당 이슈의 username
    label: '', // 해당 이슈의 label
    title: '', // 해당 이슈의 title
    deadline: '', // 해당 이슈의 마감일
    id: null, // 해당 이슈 생성자의 id
    projectId: null, // 해당 이슈에 해당하는 프로젝트 id,
    projectStart: null, // 해당 이슈의 시작일
  };
  render() {
    const username = this.props.user.username;
    const {
      label,
      title,
      deadline,
      progress,
      id,
      projectId,
      projectStart,
    } = this.props;
    return (
      <Table.Row>
        <Table.Cell>{username}</Table.Cell>
        <Table.Cell>{label}</Table.Cell>
        <Table.Cell>
          <Link to={`/project/${projectId}/issue/${id}`}>{title}</Link>
        </Table.Cell>
        <Table.Cell>{progress}</Table.Cell>
        <Table.Cell>{timeConverter(projectStart)}</Table.Cell>
        <Table.Cell>{timeConverter(deadline)}</Table.Cell>
        <Table.Cell>{getRemainingHours(deadline)}</Table.Cell>
      </Table.Row>
    );
  }
}
