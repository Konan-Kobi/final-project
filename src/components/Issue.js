import React from 'react';

import { Header } from 'semantic-ui-react';
import { timeConverter } from '../DateAPI';
export default class Issue extends React.Component {
  static defaultProps = {
    issue: {}, // 해당 이슈의 정보들
    loading: false, // 이슈 상세 정보 요청 상태
    username: '', // 이슈를 생성한 사용자의 username
  };

  render() {
    // 이슈 컨슈머 써주기
    const { username } = this.props;
    const { title, deadline, body, created, projectStart } = this.props.issue;

    return (
      <React.Fragment>
        <Header as="h2">{title}</Header>

        <p
          style={{ color: 'rgba(0, 0, 0, 0.4)' }}
        >{`${username} /이슈생성일${timeConverter(
          projectStart
        )}/ 마감일${timeConverter(deadline)}`}</p>

        <Header as="h4">{body}</Header>
      </React.Fragment>
    );
  }
}
