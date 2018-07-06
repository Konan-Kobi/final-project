import React from 'react';
import { Form, Button, Grid } from 'semantic-ui-react';
export default class CommentForm extends React.Component {
  static defaultProps = {
    postComment: body => {}, // 코멘트 작성 버튼 클릭 시 호출되는 함수
  };
  commentBodyRef = React.createRef();
  onPostComment = async e => {
    const { postComment } = this.props;
    postComment(this.commentBodyRef.current.value);
    this.commentBodyRef.current.value = '';
  };
  render() {
    return (
      <Form>
        <Grid columns="equal">
          <Grid.Column width={10}>
            <Form.Field style={{ display: 'inline-block', width: '140%' }}>
              <textarea rows="1" type="text" ref={this.commentBodyRef} />
            </Form.Field>
          </Grid.Column>
          <Grid.Column />
          <Grid.Column textAlign={'right'}>
            <Button
              content="댓글쓰기"
              primary
              labelPosition="left"
              icon={'edit'}
              size="large"
              onClick={this.onPostComment}
            />
          </Grid.Column>
        </Grid>
      </Form>
    );
  }
}
