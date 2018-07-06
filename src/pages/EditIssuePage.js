import React from 'react';
import {
  EditIssueProvider,
  EditIssueConsumer,
} from '../contexts/EditIssueContext';
import EditIssueContainer from '../containers/EditIssueContainer';
import { Loader, Dimmer } from 'semantic-ui-react';

export default class EditIssuePage extends React.Component {
  render() {
    const { issueId } = this.props.match.params;
    return (
      <EditIssueProvider issueId={issueId}>
        <EditIssueConsumer>
          {({ loading }) =>
            loading ? (
              <Dimmer active inverted>
                <Loader size="large">Loading</Loader>
              </Dimmer>
            ) : (
              <EditIssueContainer />
            )
          }
        </EditIssueConsumer>
      </EditIssueProvider>
    );
  }
}
