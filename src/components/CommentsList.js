import React from 'react';
import CommentItem from '../components/CommentItem';
import { Comment, Header } from 'semantic-ui-react';

export default class CommentList extends React.Component {
  static defaultProps = {
    comments: [], //해당 이슈에 해당하는 코멘트 리스트
    deleteComment: () => {}, // 코멘트 삭제 클릭 시 호출되는 함수
    userId: null, // 현재 로그인 한 사용자의 id
  };
  render() {
    const {
      comments,
      deleteComment,
      userId,
      onEditComment,
      userImg,
    } = this.props;
    return (
      <Comment.Group>
        <Header as="h3" dividing>
          Comments
        </Header>
        {comments.length === 0 ? (
          <h3>댓글이 없습니다.</h3>
        ) : (
          <React.Fragment>
            {comments.map(comment => (
              <CommentItem
                key={comment.id}
                id={comment.id}
                userId={comment.user.id}
                loggedUser={userId}
                username={comment.user.username}
                created={comment.created}
                body={comment.body}
                issueId={comment.issueId}
                updated={comment.updated}
                onEditComment={onEditComment}
                deleteComment={e => {
                  deleteComment(comment.id);
                }}
              />
            ))}
          </React.Fragment>
        )}
      </Comment.Group>
    );
  }
}
