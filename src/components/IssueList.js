import React from 'react';
import IssueItem from './IssueItem';
import { Table } from 'semantic-ui-react';
import { timeConverter } from '../DateAPI';

export default class IssueList extends React.Component {
  static defaultProps = {
    issues: [], // 로그인 한 사용자의 이슈들
  };
  render() {
    const { issues } = this.props;
    return issues.map(issue => (
      <Table.Body key={issue.id}>
        <IssueItem
          title={issue.title}
          deadline={timeConverter(issue.deadline)}
          label={issue.label}
          progress={issue.progress}
          id={issue.id}
          projectId={issue.projectId}
          created={timeConverter(issue.created)}
          projectStart={timeConverter(issue.projectStart)}
        />
      </Table.Body>
    ));
  }
}
