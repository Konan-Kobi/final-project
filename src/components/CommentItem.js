import React from 'react';
import { IssueConsumer } from '../contexts/IssueContext';
import { Comment, Button, Form } from 'semantic-ui-react';
import { timeConverter } from '../DateAPI';
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
      updated,
    } = this.props;
    return (
      <IssueConsumer>
        {({ patchComment, fetchComment }) => (
          <Comment>
            <Comment.Avatar src="https://cdn.glitch.com/0f15b7fc-72a3-4ed2-a6f9-6a5e9b5f52cb%2Fgirl.png?1530295823731" />
            <Comment.Content>
              <Comment.Author>{username}</Comment.Author>
              <Comment.Metadata>
                {updated ? (
                  <div>{timeConverter(updated)}</div>
                ) : (
                  <div>{timeConverter(created)}</div>
                )}
              </Comment.Metadata>
              {this.state.show ? (
                // 나중에 분리할 것
                // <EditCommentModalContainer id={id} />
                <Form>
                  <Form.Field>
                    <label>댓글 수정</label>
                    <input
                      type="text"
                      ref={this.commentBodyRef}
                      defaultValue={body}
                      autoFocus={true}
                    />
                  </Form.Field>
                </Form>
              ) : (
                <Comment.Text>{body}</Comment.Text>
              )}
              <React.Fragment>
                {userId === loggedUser ? (
                  <React.Fragment>
                    {this.state.show ? (
                      <Button
                        size="mini"
                        onClick={async e => {
                          await patchComment(
                            this.commentBodyRef.current.value,
                            id
                          );
                          await fetchComment();
                          this.setState({
                            show: false,
                          });
                        }}
                      >
                        수정 완료
                      </Button>
                    ) : (
                      <Comment.Actions>
                        <a
                          onClick={e =>
                            this.setState({
                              show: true,
                            })
                          }
                        >
                          수정
                        </a>

                        <a onClick={deleteComment}>삭제</a>
                      </Comment.Actions>
                    )}
                  </React.Fragment>
                ) : null}
              </React.Fragment>
            </Comment.Content>
          </Comment>
        )}
      </IssueConsumer>
    );
  }
}
