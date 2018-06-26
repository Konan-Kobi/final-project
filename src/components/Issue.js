import React from 'react';

export default class Issue extends React.Component {
  static defaultProps = {
    issue: {
      progress: '',
      title: '',
      username: '',
      deadline: '',
      body: '',
      created: '',
    },
  };
  render() {
    console.log(this.props);
    const { loading } = this.props;
    const { progress, title, deadline, body, created, user } = this.props.issue;
    // const username = this.props.issue.user.username;
    console.log(user);
    if (loading) {
      return <div>...loading</div>;
    } else {
      return (
        <React.Fragment>
          <button>{progress}</button>
          <div>{title}</div>

          {/* <div>{user}</div> */}
          <div>{deadline}</div>
          <div>{body}</div>
        </React.Fragment>
      );
    }
  }
}
