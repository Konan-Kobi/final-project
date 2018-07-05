import React from 'react';
import { EditIssueProvider } from '../contexts/EditIssueContext';
import { EditIssueContainer } from '../containers/EditIssueContainer';
export default class EditIssuePage extends React.Component {
  render() {
    const { issueId } = this.props.match.params;
    return (
      <EditIssueProvider issueId={issueId}>
        <EditIssueContainer />
      </EditIssueProvider>
    );
  }
}
