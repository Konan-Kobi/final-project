import React from 'react';
import { IssueConsumer } from '../contexts/IssueContext';
import CommentList from '../components/CommentsList';
import { UserConsumer } from '../contexts/UserContext';
export default class CommentContainer extends React.Component {
  render() {
    return (
      <IssueConsumer>
        {({ comments, deleteComment }) => (
          <UserConsumer>
            {({ userId }) => (
              <CommentList
                comments={comments}
                deleteComment={deleteComment}
                userId={userId}
              />
            )}
          </UserConsumer>
        )}
      </IssueConsumer>
    );
  }
}
