import React from 'react';
import { ProjectConsumer } from '../contexts/ProjectContext';
import ProjectList from '../components/ProjectList';
export default class ProjectListContainer extends React.Component {
  render() {
    return (
      <ProjectConsumer>
        {({ projects, issues, sortedIssues }) => (
          <ProjectList
            projects={projects}
            issues={issues}
            sortedIssues={sortedIssues}
          />
        )}
      </ProjectConsumer>
    );
  }
}
