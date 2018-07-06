import React from 'react';
import ProjectListContainer from '../containers/ProjectListContainer';
import { UserConsumer } from '../contexts/UserContext';
import { ProjectProvider, ProjectConsumer } from '../contexts/ProjectContext';
import IssueListContainer from '../containers/IssueListContainer';
import ImpendingIssueContainer from '../containers/ImpendingIssueContainer';

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
  Header,
} from 'semantic-ui-react';
import IssueChart from '../components/IssueChart';
export default class MyPage extends React.Component {
  state = {
    visible: false,
    files: [],
    animation: 'overlay',
    direction: 'left',
  };

  handleSidebarHide = () =>
    this.setState({
      visible: false,
    });

  handleAnimationChange = animation => () =>
    this.setState({ animation, visible: !this.state.visible });

  render() {
    const { animation, direction, visible } = this.state;

    return (
      <UserConsumer>
        {({ userId, logout, username, userDefaultImage, userImg }) => (
          <ProjectProvider userId={userId}>
            <ProjectConsumer>
              {({ loading, countIssue }) =>
                loading ? (
                  <Dimmer active inverted>
                    <Loader size="large">Loading</Loader>
                  </Dimmer>
                ) : (
                  <React.Fragment>
                    <Menu
                      secondary
                      attached="top"
                      id="myPage__Menu"
                      inverted
                      style={{ marginBottom: 0 }}
                    >
                      <Menu.Item
                        id="myPage__sidebarButton"
                        onClick={this.handleAnimationChange('overlay')}
                        onChange={this.handleDimmedChange}
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
                    <Sidebar.Pushable
                      as={Segment}
                      className="myPage__sidebar"
                      style={{ marginTop: 0 }}
                    >
                      <Sidebar
                        id="myPage__sidebar"
                        as={Menu}
                        animation={animation}
                        direction={direction}
                        inverted
                        onHide={this.handleSidebarHide}
                        icon="labeled"
                        vertical
                        visible={visible}
                        width="thin"
                      >
                        <Menu.Item as="a" id="menuItem__user">
                          <Image
                            className="sidebar__userImg"
                            src={userImg}
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
                          <Container style={{ padding: '7em 0em 26.5em 0em' }}>
                            <Grid columns={2}>
                              <Grid.Row>
                                <Grid.Column>
                                  <Header as="h1">나의 이슈 현황</Header>
                                  <Segment>
                                    <IssueChart countIssue={countIssue} />
                                  </Segment>
                                </Grid.Column>

                                <Grid.Column>
                                  <Header as="h1">확인해 주세요!</Header>
                                  <Segment>
                                    <ImpendingIssueContainer />
                                  </Segment>
                                </Grid.Column>
                              </Grid.Row>
                              <Grid.Row>
                                <Grid.Column width={6}>
                                  <h1>나의 프로젝트 리스트</h1>
                                  <ProjectListContainer />
                                </Grid.Column>
                                <Grid.Column width={10}>
                                  <h1>나의 이슈 리스트</h1>
                                  <Segment>
                                    <IssueListContainer />
                                  </Segment>
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
