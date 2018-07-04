import React from 'react';
import { Label, Header, Divider } from 'semantic-ui-react';
export default class Project extends React.Component {
  static defaultProps = {
    projectMembers: [], // 해당 프로젝트의 프로젝트 멤버들의 리스트
    projectTitle: '', // 해당 프로젝트의 title
    projectBody: '', // 해당 프로젝트의 body
  };
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
        <Divider section />
        <Header as="h4">{projectBody}</Header>
        <Divider section />
        <Header as="h3">Project Members</Header>
        <div>
          {projectMembers.map((member, index) => (
            <Label key={member.id} color={colors[index]} image>
              <img src="https://cdn.glitch.com/0f15b7fc-72a3-4ed2-a6f9-6a5e9b5f52cb%2Fgirl.png?1530295823731" />
              {member.user.username}
            </Label>
          ))}
        </div>
      </React.Fragment>
    );
  }
}
