import React from 'react';
import { IssueConsumer } from '../contexts/IssueContext';

export default class Issue extends React.Component {
  static defaultProps = {
    issues: {}, //  이슈의 상세 정보 (expand user)
    loading: false, // 이슈 상세 정보 요청
    username: '', // 이슈를 생성한 사용자의 username
    createUser: null,
  };

  state = {
    value: null,
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
    this.props.patchProgress(e.target.value);
  };
  render() {
    // 이슈 컨슈머 써주기
    const { username, userId, createUser } = this.props;
    const { title, deadline, body, created } = this.props.issue;

    const value =
      this.state.value === null ? this.props.issue.progress : this.state.value;

    return (
      <React.Fragment>
        {createUser === userId ? (
          <select value={value} onChange={this.handleChange}>
            <option value="todo">todo</option>
            <option value="doing">doing</option>
            <option value="done">done</option>
          </select>
        ) : null}
        <div>title: {title}</div>
        <div>created: {created}</div>
        <div>username: {username} </div>
        <div>deadline: {deadline}</div>
        <div>body: {body}</div>
      </React.Fragment>
    );
  }
}
