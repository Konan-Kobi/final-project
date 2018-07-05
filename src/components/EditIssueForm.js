import React from 'react';
import ReactTags from 'react-tag-autocomplete';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { UserConsumer } from '../contexts/UserContext';
import { ProjectProvider, ProjectConsumer } from '../contexts/ProjectContext';

import {
  Icon,
  Input,
  Form,
  Select,
  Image,
  Menu,
  Sidebar,
  Segment,
  Grid,
  Loader,
  Dimmer,
} from 'semantic-ui-react';

export default class CreateIssueForm extends React.Component {
  state = {
    busy: false,
    tags: [],
    projectStart: moment(),
    deadline: moment(),
    visible: false,
  };

  componentWillMount() {
    document.body.classList.add('CreateIssueForm__Layout');
  }

  componentWillUnmount() {
    document.body.classList.remove('CreateIssueForm__Layout');
  }

  titleRef = React.createRef();
  bodyRef = React.createRef();

  handleButtonClick = () =>
    this.setState({
      visible: !this.state.visible,
    });

  handleSidebarHide = () =>
    this.setState({
      visible: false,
    });

  // Tag, Autocomplete 관련 함수
  // 태그 삭제
  handleDelete(i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
  }

  // 태그 추가
  handleAddition(tag) {
    if (this.state.tags.indexOf(tag) === -1) {
      const tags = [].concat(this.state.tags, tag);
      this.setState({ tags });
    } else {
      alert('중복으로 태깅하셨습니다.');
      return;
    }
  }

  // input에 입력한 값과와 일치하는 글자만 출력되게 하는 함수
  handleInputChange(input) {
    if (!this.state.busy) {
      this.setState({ busy: true });
      return fetch(`query=${input}`).then(result => {
        this.setState({ busy: false });
      });
    }
  }

  handleStartChange = date => {
    this.setState({ projectStart: date });
  };

  handleDeadChange = date => {
    this.setState({ deadline: date });
  };

  handleClick = async e => {
    e.preventDefault();
    const postIssue = {
      title: this.titleRef.current.value,
      body: this.bodyRef.current.value,
      tags: this.state.tags,
      label: document.querySelector('.field .text').textContent,
      projectStart: this.state.projectStart.format(),
      deadline: this.state.deadline.format(),
    };
    console.log(postIssue);
    const { handleWriteClick } = this.props;
    handleWriteClick(postIssue);
  };

  render() {
    const { visible } = this.state;
    const { suggestions, labelSuggestions } = this.props;
    return (
      <UserConsumer>
        {({ userId, logout, username, userDefaultImage, userImg }) => (
          <ProjectProvider userId={userId}>
            <ProjectConsumer>
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
                          <Grid columns="equal">
                            <Grid.Column />
                            <Grid.Column width={8}>
                              <Segment
                                className="container"
                                color="blue"
                                textAlign="center"
                              >
                                <h2 className="ui white image header">
                                  <div className="content header">
                                    이슈 등록하기
                                  </div>
                                </h2>
                              </Segment>
                              <Segment
                                className="container"
                                color="blue"
                                textAlign="left"
                              >
                                <Form>
                                  <Form.Field>
                                    <h5 className="ui white image header">
                                      <div className="content">이슈 시작일</div>
                                    </h5>
                                    <DatePicker
                                      selected={this.state.projectStart}
                                      onChange={this.handleStartChange}
                                      showTimeSelect
                                      dateFormat="LLL"
                                    />
                                    <h5 className="ui white image header">
                                      <div className="content">이슈 마감일</div>
                                    </h5>
                                    <DatePicker
                                      selected={this.state.deadline}
                                      onChange={this.handleDeadChange}
                                      showTimeSelect
                                      dateFormat="LLL"
                                    />
                                  </Form.Field>
                                  <Form.Field>
                                    <h5 className="ui white image header">
                                      <div className="content">
                                        이슈 라벨 설정
                                      </div>
                                    </h5>
                                    <Select
                                      placeholder="라벨을 선택해주세요"
                                      options={labelSuggestions}
                                    />
                                  </Form.Field>
                                  <Form.Field>
                                    <h5 className="ui white image header">
                                      <div className="content">
                                        이슈 제목 설정
                                      </div>
                                    </h5>
                                    <input
                                      type="text"
                                      ref={this.titleRef}
                                      placeholder="제목을 입력해주세요"
                                      required
                                    />
                                  </Form.Field>
                                  <Form.Field>
                                    <h5 className="ui white image header">
                                      <div className="content">
                                        이슈 할당자 설정
                                      </div>
                                    </h5>
                                    <ReactTags
                                      placeholder="이슈를 할당받을 담당자를 추가해주세요"
                                      tags={this.state.tags}
                                      minQueryLength={1}
                                      autoresize={false}
                                      suggestions={suggestions}
                                      handleInputChange={this.handleInputChange.bind(
                                        this
                                      )}
                                      handleDelete={this.handleDelete.bind(
                                        this
                                      )}
                                      handleAddition={this.handleAddition.bind(
                                        this
                                      )}
                                      autofocus={false}
                                    />
                                  </Form.Field>
                                  <Form.Field>
                                    <h5 className="ui white image header">
                                      <div className="content">이슈 내용</div>
                                    </h5>
                                    <textarea
                                      id="CreateIssueForm__Textarea"
                                      cols="100"
                                      rows="10"
                                      placeholder="내용을 입력해주세요"
                                      ref={this.bodyRef}
                                      required
                                    />
                                  </Form.Field>
                                  <button
                                    className="ui fluid large blue submit button"
                                    onClick={this.handleClick}
                                  >
                                    작성하기
                                  </button>
                                </Form>
                              </Segment>
                            </Grid.Column>
                            <Grid.Column />
                          </Grid>
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
