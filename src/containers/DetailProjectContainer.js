import React from 'react';
import DetailProjectList from '../components/DetailProjectList';
import { DetailProjectConsumer } from '../contexts/DetailProjectContext';
import Project from '../components/Project';
export default class DetailProjectContainer extends React.Component {
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
            <DetailProjectList issues={issues} />
          </React.Fragment>
        )}
      </DetailProjectConsumer>
    );
  }
}
