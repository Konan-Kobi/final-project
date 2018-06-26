import React from 'react';
import pmAPI from '../pmAPI';
const { Provider, Consumer } = React.createContext();
class IssueProvider extends React.Component {
  state = {
    issue: [],
    loading: false,
  };
  async componentWillMount() {
    this.setState({
      loading: true,
    });
    try {
      const res = await pmAPI.get(`/issues/${this.props.id}?_expand=user`);
      // console.log(res.data);
      // this.state.issue.push(res.data);
      this.setState({
        issue: res.data,
      });
      console.log(this.state);
    } finally {
      this.setState({
        loading: false,
      });
    }
  }
  render() {
    const value = {
      issue: this.state.issue,
      loading: this.state.loading,
    };
    console.log(value);
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { IssueProvider, Consumer as IssueConsumer };
