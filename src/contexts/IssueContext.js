import React from 'react';
import pmAPI from '../pmAPI';
const { Provider, Consumer } = React.createContext();
class IssueProvider extends React.Component {
  state = {
    issue: [],
    username: [],
    loading: false,
  };
  async componentWillMount() {
    this.setState({
      loading: true,
    });
    try {
      const res = await pmAPI.get(`/issues/${this.props.id}?_expand=user`);
      this.state.issue.push(res.data);
      this.state.username.push(res.data.user['username']);
      this.setState({
        issue: this.state.issue[0],
        username: this.state.username[0],
      });
      console.log(this.state.username);
    } finally {
      this.setState({
        loading: false,
      });
    }
  }
  render() {
    const value = {
      username: this.state.username,
      issue: this.state.issue,
      loading: this.state.loading,
    };
    console.log(value.username);
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { IssueProvider, Consumer as IssueConsumer };
