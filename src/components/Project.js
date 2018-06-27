import React from 'react';

export default class Project extends React.Component {
  render() {
    const { projectMembers, projectTitle, projectBody } = this.props;
    return (
      <React.Fragment>
        <h1>Project</h1>
        <div>title: {projectTitle}</div>
        <div>body: {projectBody}</div>
        <h1>담당자</h1>
        {projectMembers.map(member => (
          <div key={member.id}>{member.user.username}</div>
        ))}
      </React.Fragment>
    );
  }
}
