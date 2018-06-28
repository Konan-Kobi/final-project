import React from 'react';
import { IssueConsumer } from '../contexts/IssueContext';

import { UserConsumer } from '../contexts/UserContext';

export default class DeleteIssueButtonContainer extends React.Component {
  static defaultProps = {
    projectId: null, //해당 이슈의 프로젝트 아이디
  };
  render() {
    return (
      <IssueConsumer>
        {({ deleteIssue, projectId, issue }) => (
          <UserConsumer>
            {({ userId }) =>
              issue.userId === userId ? (
                <button
                  onClick={async e => {
                    await deleteIssue();
                    window.history.back(-1);
                  }}
                >
                  삭제
                </button>
              ) : null
            }
          </UserConsumer>
        )}
      </IssueConsumer>
    );
  }
  // }
}
