import React from 'react';
import DetailProjectList from '../components/DetailProjectList';
import { DetailProjectConsumer } from '../contexts/DetailProjectContext';
import Project from '../components/Project';
import { Link } from 'react-router-dom';
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

            <Link to="/create-issue">
              <button>이슈추가</button>
            </Link>

            <DetailProjectList issues={issues} />
          </React.Fragment>
        )}
      </DetailProjectConsumer>
    );
  }
}
