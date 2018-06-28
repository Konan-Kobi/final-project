import React from 'react';

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
      <div>
        <label>
          댓글내용:
          <input type="text" ref={this.commentBodyRef} />
        </label>
        <button onClick={this.onPostComment}>댓글쓰기</button>
      </div>
    );
  }
}
