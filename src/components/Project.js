import React from 'react';
import { Label } from 'semantic-ui-react';
export default class Project extends React.Component {
  render() {
    const colors = [
      'red',
      'orange',
      'yellow',
      'olive',
      'green',
      'teal',
      'blue',
      'violet',
      'purple',
      'pink',
      'brown',
      'grey',
      'black',
    ];
    const { projectMembers, projectTitle, projectBody } = this.props;
    return (
      <React.Fragment>
        <h1>Project</h1>
        <div>title: {projectTitle}</div>
        <div>body: {projectBody}</div>
        <h1>담당자</h1>
        {projectMembers.map((member, index) => (
          <Label key={member.id} color={colors[index]}>
            {member.user.username}
          </Label>
        ))}
      </React.Fragment>
    );
  }
}
