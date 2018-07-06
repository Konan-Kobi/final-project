import React from 'react';
import pmAPI from '../pmAPI';
const { Provider, Consumer } = React.createContext();

class EditIssueProvider extends React.Component {
  state = {
    loading: false,
    projectStart: '',
    deadline: '',
    label: '',
    title: '',
    body: '',
    userTag: [],
    created: new Date(),
    labelSuggestions: [
      { key: 'bug', text: 'bug', value: 'bug' },
      { key: 'design', text: 'design', value: 'design' },
      { key: 'testing', text: 'testing', value: 'testing' },
      { key: 'duplicate', text: 'duplicate', value: 'duplicate' },
      { key: 'help wanted', text: 'help wanted', value: 'help wanted' },
      { key: 'enhancement', text: 'enhancement', value: 'enhancement' },
      { key: 'feature', text: 'feature', value: 'feature' },
      { key: 'invalid', text: 'invalid', value: 'invalid' },
      { key: 'question', text: 'question', value: 'question' },
      { key: 'refactor', text: 'refactor', value: 'refactor' },
    ],
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    try {
      this.fetchInitial();
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  fetchInitial = async () => {
    const { issueId } = this.props;
    console.log(issueId); // Undefined?
    const res = await pmAPI.get(`/issues/${issueId}?_expand=user`);
    this.setState({
      projectStart: new Date(res.data.projectStart * 1000),
      deadline: new Date(res.data.deadline * 1000),
      label: res.data.label,
      title: res.data.title,
      body: res.data.body,
    });
    if (Array.isArray(res.data.user)) {
      for (let i = 0; i < res.data.user.length; i++) {
        this.state.userTag.push({
          id: res.data.user[i].id,
          name: res.data.user[i].username,
        });
      }
    } else {
      this.state.userTag.push({
        id: res.data.user.id,
        name: res.data.user.username,
      });
    }
    console.log(this.state);
  };

  handleWriteClick = async postEditIssue => {
    this.setState({
      loading: true,
    });
    try {
      const { issueId } = this.props;
      for (let i = 0; i < postEditIssue.tags.length; i++) {
        const editIssuePayload = {
          title: postEditIssue.title,
          body: postEditIssue.body,
          created: Math.round(this.state.created.getTime() / 1000),
          projectStart: Math.round(
            new Date(postEditIssue.projectStart).getTime() / 1000
          ),
          deadline: Math.round(
            new Date(postEditIssue.deadline).getTime() / 1000
          ),
          // progress가 0은 todo, 1은 doing, 2는 done
          label: postEditIssue.label,
          userId: postEditIssue.tags[i].id,
        };
        await pmAPI.patch(`issues/${issueId}`, editIssuePayload);
      }
    } finally {
      this.setState({
        loading: false,
      });
    }
    alert('이슈가 정상적으로 수정되었습니다.');
    window.history.back(-1);
  };

  render() {
    const value = {
      ...this.state,
      issueID: this.props.issueId,
      handleWriteClick: this.handleWriteClick,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { EditIssueProvider, Consumer as EditIssueConsumer };
