import React from 'react';
import { Label, Header } from 'semantic-ui-react';
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
        <Header as="h1">{projectTitle}</Header>
        <Header as="h2">{projectBody}</Header>
        <Header as="h3">Project Members</Header>
        {projectMembers.map((member, index) => (
          <Label key={member.id} color={colors[index]}>
            {member.user.username}
          </Label>
        ))}
      </React.Fragment>
    );
  }
}
