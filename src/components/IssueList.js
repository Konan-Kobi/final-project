import React from 'react';
import IssueItem from './IssueItem';
export default class IssueList extends React.Component {
  static defaultProps = {
    title: '',
    deadline: '1111',
    label: '라벨',
    progress: '',
  };
  render() {
    const { issues } = this.props;
    console.log(issues);
    return issues.map(issue => (
      <tbody>
        <IssueItem
          key={issue.id}
          title={issue.title}
          deadline={issue.deadline}
          label={issue.label}
          progress={issue.progress}
        />
      </tbody>
    ));
  }
}
