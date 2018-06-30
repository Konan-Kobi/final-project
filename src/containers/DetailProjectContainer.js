import React from 'react';
import DetailProjectList from '../components/DetailProjectList';
import { DetailProjectConsumer } from '../contexts/DetailProjectContext';
import Project from '../components/Project';
import Calendar from 'react-calendar';
import { Icon } from 'semantic-ui-react';
export default class DetailProjectContainer extends React.Component {
  state = {
    date: new Date(),
    show: false,
  };
  onChange = date => this.setState({ date });
  onClick = e => this.setState({ show: !this.state.show });
  render() {
    return (
      <DetailProjectConsumer>
        {({ issues, projectMembers, projectTitle, projectBody }) => (
          <React.Fragment>
            <Project
              projectMembers={projectMembers}
              projectTitle={projectTitle}
              projectBody={projectBody}
            />
            <h1>이슈 리스트</h1>
            <Icon
              size="big"
              name="calendar alternate outline"
              onClick={this.onClick}
            />
            {this.state.show ? (
              <Calendar onChange={this.onChange} value={this.state.date} />
            ) : null}
            <DetailProjectList issues={issues} />
          </React.Fragment>
        )}
      </DetailProjectConsumer>
    );
  }
}
