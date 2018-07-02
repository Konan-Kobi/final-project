import React from 'react';
import IssueItem from './IssueItem';
import { Table } from 'semantic-ui-react';
export default class IssueList extends React.Component {
  static defaultProps = {
    title: '', //issue의 title
    deadline: '', // issue의 기한
    label: '', // issue의 라벨
    progress: '', // issue의 진척상황
  };
  render() {
    const { issues } = this.props;
    return issues.map(issue => (
      <Table.Body key={issue.id}>
        <IssueItem
          title={issue.title}
          deadline={issue.deadline}
          label={issue.label}
          progress={issue.progress}
          id={issue.id}
          projectId={issue.projectId}
          created={issue.created}
        />
      </Table.Body>
    ));
  }
}
