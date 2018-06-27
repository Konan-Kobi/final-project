import React from 'react';
import EditCommentModalContainer from '../containers/EditCommentModalContainer';
export default class CommentItem extends React.Component {
  static defaultProps = {
    deleteComment: () => {}, // 코멘트 삭제 버튼 클릭 시 호출되는 함수
    loggedUser: null, // 현재 로그인한 사용자의 id
    id: null, // 코멘트 아이템의 id
    userId: null, // 코멘트를 생성한 사용자의 id
  };
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
