import React from 'react';

export default class Issue extends React.Component {
  static defaultProps = {
    issues: {}, //  이슈의 상세 정보 (expand user)
    loading: false, // 이슈 상세 정보 요청
    username: '', // 이슈를 생성한 사용자의 username
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
    const { loading, username } = this.props;
    const { title, deadline, body, created } = this.props.issue;
    const value =
      this.state.value !== this.props.issue.progress &&
      this.state.value === undefined
        ? this.props.issue.progress
        : this.state.value;
    // const username = this.props.issue.user.username
    if (loading) {
      return <div>...loading</div>;
    } else {
      return (
        <React.Fragment>
          <select value={value} onChange={this.handleChange}>
            <option value="todo">todo</option>
            <option value="doing">doing</option>
            <option value="done">done</option>
          </select>
          <div>title: {title}</div>
          <div>created: {created}</div>
          <div>username: {username}</div>
          <div>deadline: {deadline}</div>
          <div>body: {body}</div>
        </React.Fragment>
      );
    }
  }
}
