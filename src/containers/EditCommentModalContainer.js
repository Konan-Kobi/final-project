import React from 'react';
import swal from 'sweetalert';
import { IssueConsumer } from '../contexts/IssueContext';
export default class EditCommentModalContainer extends React.Component {
  commentBodyRef = React.createRef();
  state = {
    show: false,
  };
  render() {
    if (this.state.show) {
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
                  this.setState({
                    show: false,
                  });
                }}
              >
                수정하기
              </button>
            </div>
          )}
        </IssueConsumer>
      );
    } else {
      return (
        <button
          onClick={e =>
            this.setState({
              show: true,
            })
          }
        >
          수정
        </button>
      );
    }
  }
}
