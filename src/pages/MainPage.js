import React from 'react';
import ProjectListContainer from '../containers/ProjectListContainer';
import { UserConsumer } from '../contexts/UserContext';
import { ProjectProvider, ProjectConsumer } from '../contexts/ProjectContext';
import IssueListContainer from '../containers/IssueListContainer';
export default class MainPage extends React.Component {
  render() {
    return (
      <UserConsumer>
        {({ userId }) => (
          <ProjectProvider userId={userId}>
            <ProjectConsumer>
              {({ loading }) =>
                loading ? (
                  <div>...loading</div>
                ) : (
                  <React.Fragment>
                    <h1>나의 프로젝트 리스트</h1>
                    <ProjectListContainer />
                    <h1>나의 이슈 리스트</h1>

                    <IssueListContainer />
                  </React.Fragment>
                )
              }
            </ProjectConsumer>
          </ProjectProvider>
        )}
      </UserConsumer>
    );
  }
}
