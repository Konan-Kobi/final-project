import React from 'react';
import { ProjectConsumer } from '../contexts/ProjectContext';
import IssueList from '../components/IssueList';
export default class IssueListContainer extends React.Component {
  render() {
    return (
      <ProjectConsumer>
        {/* countIssue: 현재 사용자의 총 이슈와 완료 이슈 0/0 */}
        {({ issues, countIssue }) => (
          <div>
            TOTAL: {countIssue}
            <table>
              <IssueList issues={issues} />
            </table>
          </div>
        )}
      </ProjectConsumer>
    );
  }
}
