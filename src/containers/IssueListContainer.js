import React from 'react';
import { ProjectConsumer } from '../contexts/ProjectContext';
import IssueList from '../components/IssueList';
import { Table } from 'semantic-ui-react';
export default class IssueListContainer extends React.Component {
  render() {
    return (
      <ProjectConsumer>
        {/* countIssue: 현재 사용자의 총 이슈와 완료 이슈 0/0 */}
        {({ issues, countIssue, projects }) => (
          <div className="issue__container">
            <Table celled selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>라벨</Table.HeaderCell>
                  <Table.HeaderCell>제목</Table.HeaderCell>
                  <Table.HeaderCell>진행상황</Table.HeaderCell>
                  <Table.HeaderCell>시작일</Table.HeaderCell>
                  <Table.HeaderCell>마감일</Table.HeaderCell>
                  <Table.HeaderCell>남은시간</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <IssueList issues={issues} projects={projects} />
            </Table>
          </div>
        )}
      </ProjectConsumer>
    );
  }
}
