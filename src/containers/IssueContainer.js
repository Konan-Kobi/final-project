import React from 'react';
import Issue from '../components/Issue';
import DeleteIssueButtonContainer from '../containers/DeleteIssueButtonContainer';
import { IssueConsumer } from '../contexts/IssueContext';
import { UserConsumer } from '../contexts/UserContext';
import EditIssueButtonContainer from '../containers/EditIssueButtonContainer';
export default class IssueContainer extends React.Component {
  render() {
    return (
      <IssueConsumer>
        {({ issue, patchProgress, projects, projectId }) => (
          <UserConsumer>
            {({ userId }) => (
              <React.Fragment>
                {userId === issue.userId ? (
                  <React.Fragment>
                    <DeleteIssueButtonContainer
                      issueId={issue.id}
                      userId={this.props.userId}
                      projectId={this.props.projectId}
                    />
                    <EditIssueButtonContainer />
                  </React.Fragment>
                ) : null}
                <Issue
                  issue={issue}
                  patchProgress={patchProgress}
                  projects={projects}
                />
              </React.Fragment>
            )}
          </UserConsumer>
        )}
      </IssueConsumer>
    );
  }
}
