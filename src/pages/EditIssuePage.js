import React from 'react';
import { EditIssueProvider } from '../contexts/EditIssueContext';
export default class EditIssuePage extends React.Component {
  render() {
    const { issueId } = this.props.match.params;
    return (
      <EditIssueProvider issueId={issueId}>
        {/* 이슈 수정 컴포넌트 */}
      </EditIssueProvider>
    );
  }
}
