import React from 'react';

export default class Project extends React.Component {
  render() {
    const projects = this.props.projectMembers;
    return (
      <React.Fragment>
        <h1>담당자</h1>
        {projects.map(project => (
          <div key={project.id}>{project.user.username}</div>
        ))}
        {/* <div>{projects}</div>
        <div>{projects.project}</div> */}
      </React.Fragment>
    );
  }
}
