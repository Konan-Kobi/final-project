import React from 'react';

import { Header } from 'semantic-ui-react';

export default class Issue extends React.Component {
  static defaultProps = {
    issues: {}, //  이슈의 상세 정보 (expand user)
    loading: false, // 이슈 상세 정보 요청
    username: '', // 이슈를 생성한 사용자의 username
  };

  render() {
    // 이슈 컨슈머 써주기
    const { username } = this.props;
    const { title, deadline, body, created } = this.props.issue;

    return (
      <React.Fragment>
        <Header as="h1">{title}</Header>

        <p>{`${username} /이슈생성일${created}/ 마감일${deadline}`}</p>

        <Header as="h2">{body}</Header>
      </React.Fragment>
    );
  }
}
