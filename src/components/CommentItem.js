import React from 'react';
export default class CommentItem extends React.Component {
  render() {
    const {
      userId,
      loggedUser,
      username,
      created,
      body,
      deleteComment,
    } = this.props;
    return (
      <React.Fragment>
        <div>
          username: {username} / created: {created}
        </div>
        <div>{body}</div>
        {userId === loggedUser ? (
          <button onClick={deleteComment}>삭제</button>
        ) : null}
      </React.Fragment>
    );
  }
}
