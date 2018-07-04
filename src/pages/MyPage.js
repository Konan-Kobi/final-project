import React from 'react';
import ProjectListContainer from '../containers/ProjectListContainer';
import { UserConsumer } from '../contexts/UserContext';
import { ProjectProvider, ProjectConsumer } from '../contexts/ProjectContext';
import IssueListContainer from '../containers/IssueListContainer';
import {
  Icon,
  Image,
  Menu,
  Sidebar,
  Segment,
  Grid,
  Loader,
  Dimmer,
  Container,
} from 'semantic-ui-react';
import IssueChart from '../components/IssueChart';
export default class MyPage extends React.Component {
  state = { visible: true };

  handleButtonClick = () =>
    this.setState({
      visible: !this.state.visible,
    });

  handleSidebarHide = () =>
    this.setState({
      visible: false,
    });

  render() {
    const { visible } = this.state;
    return (
      <UserConsumer>
        {({ userId, logout, username, userDefaultImage }) => (
          <ProjectProvider userId={userId}>
            <ProjectConsumer>
              {({ loading, countIssue }) =>
                loading ? (
                  <Dimmer active inverted>
                    <Loader size="large">Loading</Loader>
                  </Dimmer>
                ) : (
                  <React.Fragment>
                    <Menu attached="top" id="myPage__Menu" inverted>
                      <Menu.Item
                        id="myPage__sidebarButton"
                        onClick={this.handleButtonClick}
                      >
                        <Icon name="bars" size="large" />
                      </Menu.Item>
                      <Menu.Menu position="right">
                        <Menu.Item as="a">
                          <Icon name="laptop" />
                          {username}님 환영합니다.
                        </Menu.Item>
                      </Menu.Menu>
                      <Menu.Menu>
                        <Menu.Item as="a" onClick={logout}>
                          <Icon name="log out" />
                          로그아웃
                        </Menu.Item>
                      </Menu.Menu>
                    </Menu>

                    <Sidebar.Pushable as={Segment} className="myPage__sidebar">
                      <Sidebar
                        id="myPage__sidebar"
                        as={Menu}
                        inverted
                        onHide={this.handleSidebarHide}
                        animation="overlay"
                        icon="labeled"
                        vertical
                        visible={visible}
                        width="thin"
                      >
                        <Menu.Item as="a" id="menuItem__user">
                          <Image
                            className="sidebar__userImg"
                            src={userDefaultImage}
                            size="small"
                            circular
                          />
                          {username}
                        </Menu.Item>
                        <Menu.Item as="a" href="/create-project" id="menuItem">
                          <Icon name="file text" />
                          프로젝트 생성
                        </Menu.Item>
                        <Menu.Item as="a" href="/myPage" id="menuItem">
                          <Icon name="user circle" />
                          마이페이지
                        </Menu.Item>
                        <Menu.Item as="a" id="menuItem" onClick={logout}>
                          <Icon name="log out" />
                          로그아웃
                        </Menu.Item>
                      </Sidebar>
                      <Sidebar.Pusher>
                        <Segment basic>
                          <Container style={{ padding: '5em 0em' }}>
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
                          </Container>
                        </Segment>
                      </Sidebar.Pusher>
                    </Sidebar.Pushable>
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
