import React from 'react';
import pmAPI from '../pmAPI';
const { Provider, Consumer } = React.createContext();
class DetailProjectProvider extends React.Component {
  state = {
    loading: false,
    issues: [],
    projectMembers: [],
    projectTitle: '',
    projectBody: '',
  };
  componentDidMount() {
    this.fetchProjects();
    this.fetchProjectMember();
  }
  fetchProjects = async () => {
    this.setState({
      loading: true,
    });
    const { projectId } = this.props;
    try {
      const res = await pmAPI.get(
        `/issues?projectId=${projectId}&_expand=user`
      );
      this.setState({
        issues: res.data,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };
  fetchProjectMember = async () => {
    const { projectId } = this.props;
    this.setState({
      loading: true,
    });
    try {
      const res = await pmAPI.get(
        `/projectMembers?projectId=${projectId}&_expand=user&_expand=project`
      );
      this.setState({
        projectMembers: res.data,
        projectTitle: res.data[0].project.title,
        projectBody: res.data[0].project.body,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };
  render() {
    const value = {
      ...this.state,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { DetailProjectProvider, Consumer as DetailProjectConsumer };
