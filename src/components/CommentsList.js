import React from 'react';
import CommentItem from '../components/CommentItem';
export default class CommentList extends React.Component {
  static defaultProps = {
    comments: [], //해당 이슈에 해당하는 코멘츠 리스트
  };
  render() {
    const { comments, deleteComment, userId } = this.props;
    return comments.map(comment => (
      <React.Fragment key={comment.id}>
        <CommentItem
          id={comment.id}
          userId={comment.user.id}
          loggedUser={userId}
          username={comment.user.username}
          created={comment.created}
          body={comment.body}
          deleteComment={e => {
            deleteComment(comment.id);
          }}
        />
      </React.Fragment>
    ));
  }
}
