import React from 'react';
import ProjectItem from '../components/ProjectItem';
export default class ProjectList extends React.Component {
  static defaultProps = {
    projects: [],
    sortedIssues: [],
  };
  render() {
    const { projects, sortedIssues } = this.props;
    return projects.map(project => (
      <table>
        <ProjectItem
          key={project.id}
          title={project.project.title}
          id={project.projectId}
          sortedIssues={sortedIssues}
        />
      </table>
    ));
  }
}
