import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import { getRemainingHours } from '../DateAPI';
import { timeConverter } from '../DateAPI';
import convertProgress from '../progressAPI';
export default class IssueItem extends React.Component {
  static defaultProps = {
    title: '', // issue 의 제목
    deadline: '', // issue 의 마감일
    label: '', // issue 의 라벨
    progress: '', // issue 의 진척상황
    id: null, // issue의 id
    projectStart: null, // issue의 시작일
  };
  render() {
    const {
      title,
      deadline,
      label,
      progress,
      id,
      projectId,
      projectStart,
    } = this.props;
    console.log(deadline);
    return (
      <Table.Row>
        <Table.Cell>{label}</Table.Cell>
        <Table.Cell>
          <Link to={`/project/${projectId}/issue/${id}`}>{title}</Link>
        </Table.Cell>
        <Table.Cell>{convertProgress(progress)}</Table.Cell>
        <Table.Cell>{projectStart}</Table.Cell>
        <Table.Cell>{timeConverter(deadline)}</Table.Cell>
        <Table.Cell>{getRemainingHours(deadline)}</Table.Cell>
      </Table.Row>
    );
  }
}
