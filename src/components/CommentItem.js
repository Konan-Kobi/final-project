import React from 'react';
import EditCommentModalContainer from '../containers/EditCommentModalContainer';
export default class CommentItem extends React.Component {
  render() {
    const {
      userId,
      loggedUser,
      username,
      created,
      body,
      deleteComment,
      id,
    } = this.props;
    return (
      <React.Fragment key={id}>
        <div>
          username: {username} / created: {created}
        </div>
        <div>{body}</div>
        {userId === loggedUser ? (
          <div>
            <button onClick={deleteComment}>삭제</button>

            <EditCommentModalContainer id={id} />
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}
