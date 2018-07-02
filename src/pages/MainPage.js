import React from 'react';
import ProjectListContainer from '../containers/ProjectListContainer';
import { UserConsumer } from '../contexts/UserContext';
import { ProjectProvider, ProjectConsumer } from '../contexts/ProjectContext';
import IssueListContainer from '../containers/IssueListContainer';
import { Segment, Grid, Loader, Dimmer } from 'semantic-ui-react';
import IssueChart from '../components/IssueChart';
export default class MainPage extends React.Component {
  render() {
    return (
      <UserConsumer>
        {({ userId }) => (
          <ProjectProvider userId={userId}>
            <ProjectConsumer>
              {({ loading, countIssue }) =>
                loading ? (
                  <Dimmer active inverted>
                    <Loader size="large">Loading</Loader>
                  </Dimmer>
                ) : (
                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column>
                        <Segment>
                          <IssueChart countIssue={countIssue} />
                        </Segment>
                      </Grid.Column>
                      <Grid.Column>
                        <Segment>기한임박이슈</Segment>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <h1>나의 프로젝트 리스트</h1>
                        <ProjectListContainer />
                      </Grid.Column>
                      <Grid.Column>
                        <h1>나의 이슈 리스트</h1>

                        <IssueListContainer />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                )
              }
            </ProjectConsumer>
          </ProjectProvider>
        )}
      </UserConsumer>
    );
  }
}
