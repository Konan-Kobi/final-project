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

  state = {
    value: this.props.issue.progress,
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.state.value !== nextProps.issue.progress &&
      this.state.value === undefined
    ) {
      console.log(this.state);
      this.setState({
        value: this.props.issue.progress,
      });
    }
  }
  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
    this.props.patchProgress(e.target.value);
  };
  render() {
    const { loading } = this.props;
    const { progress, title, deadline, body, created, user } = this.props.issue;
    // const username = this.props.issue.user.username;
    console.log(this.state);
    if (loading) {
      return <div>...loading</div>;
    } else {
      return (
        <React.Fragment>
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="todo">todo</option>
            <option value="doing">doing</option>
            <option value="done">done</option>
          </select>
          <div>title: {title}</div>
          <div>progress: {progress}</div>

          {/* <div>{user}</div> */}
          <div>deadline: {deadline}</div>
          <div>body: {body}</div>
        </React.Fragment>
      );
    }
  }
}
