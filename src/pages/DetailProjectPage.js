import React from 'react';
import DetailProjectContainer from '../containers/DetailProjectContainer';
import {
  DetailProjectProvider,
  DetailProjectConsumer,
} from '../contexts/DetailProjectContext';
import { UserConsumer } from '../contexts/UserContext';
import {
  Dimmer,
  Loader,
  Container,
  Icon,
  Card,
  Image,
  Menu,
  Sidebar,
  Segment,
  Grid,
} from 'semantic-ui-react';
export default class DetailProjectPage extends React.Component {
  state = { visible: false };

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
    const { projectId } = this.props.match.params;
    return (
      <UserConsumer>
        {({ userId, logout, username, userDefaultImage, userImg }) => (
          <DetailProjectProvider projectId={projectId}>
            <DetailProjectConsumer>
              {({ loading }) =>
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
                          {userImg ? (
                            <Image
                              className="sidebar__userImg"
                              src={userImg}
                              size="small"
                              circular
                            />
                          ) : (
                            <Image
                              className="sidebar__userImg"
                              src={userDefaultImage}
                              size="small"
                              circular
                            />
                          )}
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
                          <Card fluid color="blue">
                            <Container style={{ padding: '5em 0em 18em 0em' }}>
                              <DetailProjectContainer projectId={projectId} />
                            </Container>
                          </Card>
                        </Segment>
                      </Sidebar.Pusher>
                    </Sidebar.Pushable>
                  </React.Fragment>
                )
              }
            </DetailProjectConsumer>
          </DetailProjectProvider>
        )}
      </UserConsumer>
    );
  }
}
