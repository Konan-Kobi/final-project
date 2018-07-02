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
          <Label key={member.id} color={colors[index]} image>
            <img src="https://cdn.glitch.com/0f15b7fc-72a3-4ed2-a6f9-6a5e9b5f52cb%2Fgirl.png?1530295823731" />
            {member.user.username}
          </Label>
        ))}
      </React.Fragment>
    );
  }
}
