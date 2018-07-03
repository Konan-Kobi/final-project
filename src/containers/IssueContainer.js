import React from 'react';
import Issue from '../components/Issue';
import DeleteIssueButtonContainer from '../containers/DeleteIssueButtonContainer';
import { IssueConsumer } from '../contexts/IssueContext';
import EditIsueButtonContainer from '../containers/EditIssueButtonContainer';
import { Segment, Button } from 'semantic-ui-react';
import EditIssueProgress from '../components/EditIssueProgress';
import { Link } from 'react-router-dom';
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
        }) => (
          <Segment>
            {userId === createUser ? (
              <React.Fragment>
                <EditIssueProgress
                  patchProgress={patchProgress}
                  issue={issue}
                />
                <Link to={`/project/${projectId}/issue/${issue.id}/edit`}>
                  <Button size="mini">수정</Button>
                </Link>
                <DeleteIssueButtonContainer
                  issueId={issue.id}
                  userId={this.props.userId}
                  projectId={this.props.projectId}
                />
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
          </Segment>
        )}
      </IssueConsumer>
    );
  }
}
