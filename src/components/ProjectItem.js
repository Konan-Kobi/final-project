import React from 'react';
import { Link } from 'react-router-dom';
export default class ProjectItem extends React.Component {
  static defaultProps = {
    title: '', // project의 title
    issueByProject: [], // 접속한 사용자가 맡은 프로젝트별로 issue와 done의 개수 [{projectId: 1, issues: 4. done: 3}]
    id: null, // projectId
  };
  render() {
    const { title, issueByProject, id } = this.props;
    let issue = `0 / 0`;
    let sortedIssue = issueByProject.find(o => o.projectId === id);
    if (sortedIssue) {
      issue = `${issueByProject.done}/${issueByProject.issues}`;
    }
    return (
      <tr>
        <th>
          <Link to={`project/${id}`}>{title}</Link>
        </th>
        <th>{issue}</th>
      </tr>
    );
  }
}
