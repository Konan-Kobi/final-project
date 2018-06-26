import React from 'react';
import Issue from '../components/Issue';
import DeleteIssueButtonContainer from '../containers/DeleteIssueButtonContainer';
import { IssueConsumer } from '../contexts/IssueContext';
export default class IssueContainer extends React.Component {
  render() {
    return (
      <IssueConsumer>
        {({ issue, patchProgress, projects, projectId }) => (
          <React.Fragment>
            <DeleteIssueButtonContainer
              issueId={issue.id}
              userId={this.props.userId}
              projectId={this.props.projectId}
            />
            <Issue
              issue={issue}
              patchProgress={patchProgress}
              projects={projects}
            />
          </React.Fragment>
        )}
      </IssueConsumer>
    );
  }
}
