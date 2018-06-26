import React from 'react';
import IssueContainer from '../containers/IssueContainer';
import { IssueProvider } from '../contexts/IssueContext';
import { UserConsumer } from '../contexts/UserContext';
export default class IssuePage extends React.Component {
  render() {
    const issueId = this.props.match.params.issueId;
    const projectId = this.props.match.params.projectId;
    return (
      <IssueProvider issueId={issueId} projectId={projectId}>
        <IssueContainer projectId={projectId} />
      </IssueProvider>
    );
  }
}
