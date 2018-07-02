import React from 'react';
import { IssueConsumer } from '../contexts/IssueContext';

import { UserConsumer } from '../contexts/UserContext';
import { Button } from 'semantic-ui-react';
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
                <Button
                  size="mini"
                  onClick={async e => {
                    await deleteIssue();
                    window.history.back(-1);
                  }}
                >
                  삭제
                </Button>
              ) : null
            }
          </UserConsumer>
        )}
      </IssueConsumer>
    );
  }
  // }
}
