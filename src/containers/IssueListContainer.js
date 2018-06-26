import React from 'react';
import { ProjectConsumer } from '../contexts/ProjectContext';
import IssueList from '../components/IssueList';
export default class IssueListContainer extends React.Component {
  render() {
    return (
      <ProjectConsumer>
        {({ issues, countIssue }) => (
          <div>
            {countIssue}
            <table>
              <IssueList issues={issues} />
            </table>
          </div>
        )}
      </ProjectConsumer>
    );
  }
}
