import React from 'react';
import { IssueConsumer } from '../contexts/IssueContext';
import { Comment, Button, Form, Grid } from 'semantic-ui-react';
import { timeConverter } from '../DateAPI';
export default class CommentItem extends React.Component {
  state = {
    show: false,
    buttonClick: false,
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
      onEditComment,
      userImg,
    } = this.props;
    return (
      <IssueConsumer>
        {({ patchComment, fetchComment }) => (
          <Comment>
            <Comment.Avatar src={userImg} />
            <Comment.Content>
              <Comment.Author>{username}</Comment.Author>
              <Comment.Metadata>
                {updated ? (
                  <div>{timeConverter(updated)[0]}</div>
                ) : (
                  <div>{timeConverter(created)[0]}</div>
                )}
              </Comment.Metadata>
              {this.state.show ? (
                // 나중에 분리할 것
                // <EditCommentModalContainer id={id} />
                <React.Fragment>
                  <Form>
                    <div>
                      <Grid columns="equal">
                        <Grid.Column width={10}>
                          <Form.Field style={{ display: 'inline-block' }}>
                            <textarea
                              rows="1"
                              style={{ width: '450px' }}
                              type="text"
                              ref={this.commentBodyRef}
                              defaultValue={body}
                              autoFocus={true}
                            />
                          </Form.Field>
                        </Grid.Column>
                        <Grid.Column />
                        <Grid.Column width={5} textAlign={'right'}>
                          <Button
                            inverted
                            color="blue"
                            size="large"
                            onClick={async e => {
                              await patchComment(
                                this.commentBodyRef.current.value,
                                id
                              );
                              await fetchComment();
                              this.setState({
                                show: false,
                              });
                              onEditComment();
                            }}
                          >
                            수정 완료
                          </Button>
                        </Grid.Column>
                      </Grid>
                    </div>
                  </Form>
                </React.Fragment>
              ) : (
                <Comment.Text>{body}</Comment.Text>
              )}
              <React.Fragment>
                {userId === loggedUser && !this.state.show ? (
                  <React.Fragment>
                    <Comment.Actions>
                      <a
                        onClick={e => {
                          onEditComment();
                          this.setState({
                            show: true,
                          });
                        }}
                      >
                        수정
                      </a>

                      <a onClick={deleteComment}>삭제</a>
                    </Comment.Actions>
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
