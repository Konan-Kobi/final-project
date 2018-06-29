import React from 'react';
import pmAPI from '../pmAPI';
const { Provider, Consumer } = React.createContext();
class DetailProjectProvider extends React.Component {
  state = {
    loading: true,
    issues: [],
    projectMembers: [],
    projectTitle: '',
    projectBody: '',
  };
  async componentDidMount() {
    this.setState({
      loading: true,
    });
    try {
      await this.fetchIssueByProject();
      await this.fetchProjectMember();
    } finally {
      this.setState({
        loading: false,
      });
    }
  }
  fetchIssueByProject = async () => {
    const { projectId } = this.props;

    const res = await pmAPI.get(`/issues?projectId=${projectId}&_expand=user`);

    this.setState({
      issues: res.data,
    });
  };
  fetchProjectMember = async () => {
    const { projectId } = this.props;
    console.log(projectId);
    const res = await pmAPI.get(
      `/projectMembers?projectId=${projectId}&_expand=user&_expand=project`
    );
    console.log(res.data);
    this.setState({
      projectMembers: res.data,
      projectTitle: res.data[0].project.title,
      projectBody: res.data[0].project.body,
    });
  };
  render() {
    const value = {
      ...this.state,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { DetailProjectProvider, Consumer as DetailProjectConsumer };
