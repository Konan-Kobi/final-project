import React from 'react';
import DetailProjectItem from '../components/DetailProjectItem';
import { Table } from 'semantic-ui-react';
export default class DetailProjectList extends React.Component {
  static defaultProps = {
    issues: [], // 해당 프로젝트의 이슈들
  };
  render() {
    const { issues } = this.props;
    return (
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>담당자</Table.HeaderCell>
            <Table.HeaderCell>라벨</Table.HeaderCell>
            <Table.HeaderCell>제목</Table.HeaderCell>
            <Table.HeaderCell>진척상황</Table.HeaderCell>
            <Table.HeaderCell>시작일</Table.HeaderCell>
            <Table.HeaderCell>마감일</Table.HeaderCell>
            <Table.HeaderCell>남은시간</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => <DetailProjectItem key={issue.id} {...issue} />)}
        </Table.Body>
      </Table>
    );
  }
}
