import React from 'react';
import pmAPI from '../pmAPI';
const { Provider, Consumer } = React.createContext();

class CreateProjectProvider extends React.Component {
  state = {
    // value: "",
    busy: false,
    tags: [],
    suggestions: [],
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    try {
      await this.fetchInitial();
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  fetchInitial = async () => {
    const res = await pmAPI.get('users');
    const resdata = {
      id: res.data.map(item => item.id),
      name: res.data.map(item => item.username),
    };
    for (let i = 0; i < resdata.name.length; i++) {
      this.state.suggestions.push({
        id: resdata.id[i],
        name: resdata.name[i],
      });
    }
  };

  posting = async postProject => {
    const payload = {
      title: postProject.title,
      body: postProject.body,
    };
    await pmAPI.post(`projects`, payload);
    const resPro = await pmAPI.get('projects');
    for (let i = 0; i < postProject.tags.length; i++) {
      const projectpayload = {
        userId: postProject.tags[i].id,
        projectId: resPro.data[resPro.data.length - 1].id,
      };
      await pmAPI.post(`projectMembers`, projectpayload);
    }
  };

  handleWriteClick = async () => {
    this.setState({
      loading: true,
    });
    try {
      await this.posting();
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const value = {
      ...this.state,
      handleWriteClick: this.handleWriteClick,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { CreateProjectProvider, Consumer as CreateProjectConsumer };
