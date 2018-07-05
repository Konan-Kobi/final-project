import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
class HomepageHeading extends Component {
  state = {
    page: 'page',
  };
  onClick = page => {
    this.setState({
      page,
    });
  };
  render() {
    const { mobile } = this.props;
    if (this.state.page === 'login') {
      return <Redirect to="/login" />;
    } else if (this.state.page === 'join') {
      return <Redirect to="/join" />;
    } else {
      return (
        <Container text>
          <Header
            as="h1"
            content="프로젝트를 관리하는 똑똑한 방법"
            inverted
            style={{
              fontSize: mobile ? '2em' : '4em',
              fontWeight: 'normal',
              marginBottom: 0,
              marginTop: mobile ? '1.5em' : '3em',
            }}
          />
          <Header
            as="h2"
            content="지금 바로 시작해보세요!"
            inverted
            style={{
              fontSize: mobile ? '1.5em' : '1.7em',
              fontWeight: 'normal',
              marginTop: mobile ? '0.5em' : '1.5em',
            }}
          />
          <Button primary size="huge" onClick={e => this.onClick('join')}>
            시작하기
            <Icon name="right arrow" />
          </Button>
        </Container>
      );
    }
  }
}

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive {...Responsive.onlyComputer}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item as="a" active>
                  Home
                </Menu.Item>
                <Menu.Item position="right">
                  <Button as="a" inverted={!fixed} onClick>
                    Log in
                  </Button>
                  <Button
                    as="a"
                    inverted={!fixed}
                    primary={fixed}
                    style={{ marginLeft: '0.5em' }}
                  >
                    Sign Up
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

class MobileContainer extends Component {
  state = {};

  handlePusherClick = () => {
    const { sidebarOpened } = this.state;

    if (sidebarOpened) this.setState({ sidebarOpened: false });
  };

  handleToggle = () =>
    this.setState({ sidebarOpened: !this.state.sidebarOpened });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive {...Responsive.onlyMobile}>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="uncover"
            inverted
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as="a" active>
              Home
            </Menu.Item>
            <Menu.Item as="a">Work</Menu.Item>
            <Menu.Item as="a">Company</Menu.Item>
            <Menu.Item as="a">Careers</Menu.Item>
            <Menu.Item as="a">Log in</Menu.Item>
            <Menu.Item as="a">Sign Up</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher
            dimmed={sidebarOpened}
            onClick={this.handlePusherClick}
            style={{ minHeight: '100vh' }}
          >
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                  <Menu.Item position="right">
                    <Button as="a" inverted>
                      Log in
                    </Button>
                    <Button as="a" inverted style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              이제 즐겁게 일하세요.
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              업무를 분담하고, 시시 각각 변하는 업무를 팀원들과 공유할 수
              있습니다. 팀원들이 공통된 목표를 향해 나아가는 과정을 보는 것은
              정말 즐거운 일입니다.
            </p>
            <Header as="h3" style={{ fontSize: '2em' }}>
              업무의 생산성을 높여보세요.
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              자신이 맡은 업무의 모든 사항을 한 눈에 볼 수 있습니다. 우선적인
              일에 집중해보세요!
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image
              bordered
              rounded
              size="large"
              src="https://cdn.glitch.com/0f15b7fc-72a3-4ed2-a6f9-6a5e9b5f52cb%2Fstefan-stefancik-257625-unsplash.jpg?1530703672549"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Button size="huge">Check Them Out</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              우리는 당신의 업무 달성률을 한 눈에 보여줍니다.
            </Header>
            <p style={{ fontSize: '1.33em' }} />
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              "프로젝트 관리를 위한 최적화된 도구를 제공합니다."
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              <Image
                avatar
                src="https://cdn.glitch.com/0f15b7fc-72a3-4ed2-a6f9-6a5e9b5f52cb%2Fgirl.png?1530295823731"
              />
              <b>CEO</b> 프로젝트를 쉽고 편리하게 관리하는 놀라운 경험을 하시게
              될 거예요.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: '2em' }}>
          프로젝트 관리를 위한 모든 기능을 한 곳에
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          프로젝트 관리를 위해 꼭 필요한 기능들을 모두 project++에서 만나보세요.
          더 놀라운 점은 누구나 쉽고 편하게 무료로 사용할 수 있답니다.
        </p>
        <Button as="a" size="large">
          Read More
        </Button>

        <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href="#">Case Studies</a>
        </Divider>

        <Header as="h3" style={{ fontSize: '2em' }}>
          태스크 관리, project++로 멋지게 실현하세요.
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          project++은 당신의 팀이 프로젝트를 정리하고, 업무를 공유하고, 멋진
          결과를 달성하기 위한 완벽한 솔루션입니다.
        </p>
        <Button as="a" size="large">
          지금 바로 시작해보세요!
        </Button>
      </Container>
    </Segment>

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as="a">Sitemap</List.Item>
                <List.Item as="a">Contact Us</List.Item>
                <List.Item as="a">Religious Ceremonies</List.Item>
                <List.Item as="a">Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Services" />
              <List link inverted>
                <List.Item as="a">Banana Pre-Order</List.Item>
                <List.Item as="a">DNA FAQ</List.Item>
                <List.Item as="a">How To Access</List.Item>
                <List.Item as="a">Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4" inverted>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could
                help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
);

export default HomepageLayout;
