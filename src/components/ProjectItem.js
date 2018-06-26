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
    let issueCount = '';
    let issue = issueByProject.find(o => o.projectId === id);
    if (issue) {
      issueCount = `${issue.done}/${issue.issues}`;
    } else {
      issueCount = `0 / 0`;
    }
    return (
      <tr>
        <th>
          <Link to={`project/${id}`}>제목: {title}</Link>
        </th>
        <th>이슈: {issueCount}</th>
      </tr>
    );
  }
}
