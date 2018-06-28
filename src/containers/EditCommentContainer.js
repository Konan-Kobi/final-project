import React from 'react';
import { IssueConsumer } from '../contexts/IssueContext';
export default class EditCommentContainer extends React.Component {
  static defaultProps = {
    id: null, // 해당 코멘트의 아이디
  };
  commentBodyRef = React.createRef();
  state = {
    show: false,
  };
  render() {
    return (
      <IssueConsumer>
        {({ patchComment }) => (
          <div>
            <input type="text" ref={this.commentBodyRef} />
            <button
              onClick={async e => {
                await patchComment(
                  this.commentBodyRef.current.value,
                  this.props.id
                );
              }}
            >
              수정하기
            </button>
          </div>
        )}
      </IssueConsumer>
    );
  }
}
