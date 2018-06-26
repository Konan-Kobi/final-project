import React from 'react';
import IssueContainer from '../containers/IssueContainer';
import { IssueProvider } from '../contexts/IssueContext';
import CommentContainer from '../containers/CommentContainer';
export default class IssuePage extends React.Component {
  render() {
    const issueId = this.props.match.params.issueId;
    const projectId = this.props.match.params.projectId;
    return (
      <IssueProvider issueId={issueId} projectId={projectId}>
        <h1>issue</h1>
        <IssueContainer projectId={projectId} />
        <h1>comments</h1>
        <CommentContainer />
      </IssueProvider>
    );
  }
}
