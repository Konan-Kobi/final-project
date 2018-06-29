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
          <React.Fragment>
            <Table celled selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>label</Table.HeaderCell>
                  <Table.HeaderCell>title</Table.HeaderCell>
                  <Table.HeaderCell>progress</Table.HeaderCell>
                  <Table.HeaderCell>start</Table.HeaderCell>
                  <Table.HeaderCell>end</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <IssueList issues={issues} projects={projects} />
            </Table>
          </React.Fragment>
        )}
      </ProjectConsumer>
    );
  }
}
