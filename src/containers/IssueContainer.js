import React from 'react';
import Issue from '../components/Issue';
import DeleteIssueButtonContainer from '../containers/DeleteIssueButtonContainer';
import { IssueConsumer } from '../contexts/IssueContext';
import { UserConsumer } from '../contexts/UserContext';
import EditIssueButtonContainer from '../containers/EditIssueButtonContainer';
export default class IssueContainer extends React.Component {
  static defaultProps = {
    userId: null, // 로그인 한 사용자의 id
    projectId: null, // 해당 이슈의 프로젝트 아이디 (match)
  };
  render() {
    return (
      <IssueConsumer>
        {({
          issue,
          patchProgress,
          projects,
          projectId,
          username,
          userId,
          loading,
          createUser,
        }) =>
          loading ? (
            <div>...loading</div>
          ) : (
            <React.Fragment>
              {userId === createUser ? (
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
                username={username}
                userId={userId}
                createUser={createUser}
              />
            </React.Fragment>
          )
        }
      </IssueConsumer>
    );
  }
}
