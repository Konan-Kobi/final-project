import React from 'react';
import { IssueConsumer } from '../contexts/IssueContext';
import CommentList from '../components/CommentsList';
import { UserConsumer } from '../contexts/UserContext';
import CommentForm from '../components/CommentForm';
export default class CommentContainer extends React.Component {
  render() {
    return (
      <IssueConsumer>
        {({ comments, deleteComment, postComment }) => (
          <UserConsumer>
            {({ userId }) => (
              <div>
                <CommentList
                  comments={comments}
                  deleteComment={deleteComment}
                  userId={userId}
                />
                <CommentForm postComment={postComment} />
              </div>
            )}
          </UserConsumer>
        )}
      </IssueConsumer>
    );
  }
}
