import React from 'react';
import { IssueConsumer } from '../contexts/IssueContext';
import CommentList from '../components/CommentsList';
import { UserConsumer } from '../contexts/UserContext';
import CommentForm from '../components/CommentForm';
export default class CommentContainer extends React.Component {
  state = {
    edit: false,
  };
  onEditComment = () => {
    this.setState({
      edit: !this.state.edit,
    });
  };
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
                  onEditComment={this.onEditComment}
                />
                {this.state.edit ? null : (
                  <CommentForm postComment={postComment} />
                )}
              </div>
            )}
          </UserConsumer>
        )}
      </IssueConsumer>
    );
  }
}
