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
      const res = await pmAPI.get(`/issues/${this.props.issueId}?_expand=user`);
      // console.log(res.data);
      // this.state.issue.push(res.data);
      this.setState({
        issue: res.data,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }
  patchProgress = async progress => {
    this.setState({
      loading: true,
    });
    try {
      const payload = {
        progress: progress,
      };
      await pmAPI.patch(`/issues/${this.props.issueId}`, payload);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };
  deleteIssue = async e => {
    await pmAPI.delete(`/issues/${this.props.issueId}`);
  };
  render() {
    const value = {
      issue: this.state.issue,
      loading: this.state.loading,
      patchProgress: this.patchProgress,
      projectId: this.props.projectId,
      deleteIssue: this.deleteIssue,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { IssueProvider, Consumer as IssueConsumer };
