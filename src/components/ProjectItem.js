import React from 'react';

export default class ProjectItem extends React.Component {
  static defaultProps = {
    title: '',
    sortedIssues: [],
    id: null,
  };
  render() {
    const { title, sortedIssues, id } = this.props;
    console.log(sortedIssues);
    let issue = `0 / 0`;
    let sortedIssue = sortedIssues.find(o => o.projectId === id);
    if (sortedIssue) {
      issue = `${sortedIssue.done}/${sortedIssue.issues}`;
    }
    return (
      <div>
        <div>{title}</div>
        <div>{issue}</div>
      </div>
    );
  }
}
