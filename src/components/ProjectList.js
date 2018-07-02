import React from 'react';
import ProjectItem from '../components/ProjectItem';
export default class ProjectList extends React.Component {
  static defaultProps = {
    projects: [], //접속한 사용자가 맡은 프로젝트 리스트
    issueByProject: [], // 접속한 사용자가 맡은 프로젝트별로 issue와 done의 개수 [{projectId: 1, issues: 4. done: 3}]
  };
  render() {
    const { projects, issueByProject } = this.props;
    return projects.map(project => (
      <ProjectItem
        key={project.id}
        title={project.project.title}
        id={project.projectId}
        issueByProject={issueByProject}
      />
    ));
  }
}
