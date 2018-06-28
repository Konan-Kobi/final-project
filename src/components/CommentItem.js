import React from 'react';
import EditCommentContainer from '../containers/EditCommentContainer';
import { IssueConsumer } from '../contexts/IssueContext';
export default class CommentItem extends React.Component {
  state = {
    show: false,
  };
  static defaultProps = {
    deleteComment: () => {}, // 코멘트 삭제 버튼 클릭 시 호출되는 함수
    loggedUser: null, // 현재 로그인한 사용자의 id
    id: null, // 코멘트 아이템의 id
    userId: null, // 코멘트를 생성한 사용자의 id
  };
  commentBodyRef = React.createRef();
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
      <IssueConsumer>
        {({ patchComment, fetchComment }) => (
          <React.Fragment>
            <div>
              username: {username} / created: {created}
            </div>

            {this.state.show ? (
              // 나중에 분리할 것
              // <EditCommentModalContainer id={id} />
              <div>
                <input
                  type="text"
                  ref={this.commentBodyRef}
                  defaultValue={body}
                  autoFocus={true}
                />
                <button
                  onClick={async e => {
                    await patchComment(this.commentBodyRef.current.value, id);
                    await fetchComment();
                    this.setState({
                      show: false,
                    });
                  }}
                >
                  수정하기
                </button>
              </div>
            ) : (
              <div>{body}</div>
            )}
            {userId === loggedUser ? (
              <div>
                <button onClick={deleteComment}>삭제</button>
                {this.state.show ? null : (
                  <button
                    onClick={e => {
                      this.setState({
                        show: true,
                      });
                    }}
                  >
                    수정
                  </button>
                )}
              </div>
            ) : null}
          </React.Fragment>
        )}
      </IssueConsumer>
    );
  }
}
