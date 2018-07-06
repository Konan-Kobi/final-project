import React from 'react';

import { Header, Divider } from 'semantic-ui-react';
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
        <Divider Inverted />
        <div>
          <b>{`이슈 작성자 `}</b>
          <span style={{ color: 'grey' }}>{`${username}`}</span>
          <b>{` / 이슈 생성일 `}</b>
          <span style={{ color: 'grey' }}>
            {`${timeConverter(projectStart)[0]}`}
          </span>
          <b>{` / 마감일 `}</b>
          <span style={{ color: 'grey' }}>{`${
            timeConverter(deadline)[0]
          }`}</span>
        </div>
        <Divider Inverted />
        <Header as="h4">{body}</Header>
      </React.Fragment>
    );
  }
}
