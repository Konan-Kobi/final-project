import React from 'react';
import IssueContainer from '../containers/IssueContainer';
import { IssueProvider, IssueConsumer } from '../contexts/IssueContext';
import CommentContainer from '../containers/CommentContainer';
import { UserConsumer } from '../contexts/UserContext';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

export default class IssuePage extends React.Component {
  render() {
    const { issueId, projectId } = this.props.match.params;

    return (
      <UserConsumer>
        {({ userId }) => (
          <IssueProvider
            issueId={issueId}
            projectId={projectId}
            userId={userId}
          >
            <IssueConsumer>
              {({ loading }) =>
                loading ? (
                  <Dimmer active inverted>
                    <Loader size="large">Loading</Loader>
                  </Dimmer>
                ) : (
                  <React.Fragment>
                    <IssueContainer projectId={projectId} />

                    <CommentContainer />
                  </React.Fragment>
                )
              }
            </IssueConsumer>
          </IssueProvider>
        )}
      </UserConsumer>
    );
  }
}
