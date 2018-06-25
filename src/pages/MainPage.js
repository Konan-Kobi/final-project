import React from 'react';
import ProjectListContainer from '../containers/ProjectListContainer';
import { UserConsumer } from '../contexts/UserContext';
import { ProjectProvider } from '../contexts/ProjectContext';
export default class MainPage extends React.Component {
  render() {
    return (
      <UserConsumer>
        {({ userId }) => (
          <ProjectProvider userId={userId}>
            <ProjectListContainer />;
          </ProjectProvider>
        )}
      </UserConsumer>
    );
  }
}
