import React from 'react';
import IssueContainer from '../containers/IssueContainer';
import { IssueProvider } from '../contexts/IssueContext';
import CommentContainer from '../containers/CommentContainer';
import { UserConsumer } from '../contexts/UserContext';

export default class IssuePage extends React.Component {
  render() {
    const { issueId, projectId } = this.props.match.params;

    return (
      <UserConsumer>
        {({ userId }) => (
          <IssueProvider
            issueId={issueId}
            projectId={projectId}
            userId={userId}
          >
            <h1>issue</h1>
            <IssueContainer projectId={projectId} />
            <h1>comments</h1>
            <CommentContainer />
          </IssueProvider>
        )}
      </UserConsumer>
    );
  }
}
