import React from 'react';
import pmAPI from '../pmAPI';
const { Provider, Consumer } = React.createContext();

class CreateIssueProvider extends React.Component {
  state = {
    suggestions: [],
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
    created: new Date(),
  };

  // 처음 화면이 렌더될 때 필요한 정보들을 가져오기 위한 것들
  async componentDidMount() {
    // fixture Get
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
    const { projectId } = this.props;
    const res = await pmAPI.get(
      `projects/${projectId}/projectMembers?_expand=user`
    );
    const resdata = {
      id: res.data.map(item => item.user.id),
      name: res.data.map(item => item.user.username),
    };
    for (let i = 0; i < resdata.name.length; i++) {
      this.state.suggestions.push({
        id: resdata.id[i],
        name: resdata.name[i],
      });
    }
  };

  // 작성완료라는 버튼을 누르면 Json-server로 전송하는 함수
  handleWriteClick = async postIssue => {
    this.setState({
      loading: true,
    });
    try {
      console.log(postIssue);
      const { projectId } = this.props;
      for (let i = 0; i < postIssue.tags.length; i++) {
        const issuePayload = {
          title: postIssue.title,
          body: postIssue.body,
          projectId: projectId,
          created: Math.round(this.state.created.getTime() / 1000),
          projectStart: Math.round(
            new Date(postIssue.projectStart).getTime() / 1000
          ),
          deadline: Math.round(new Date(postIssue.deadline).getTime() / 1000),
          // progress가 0은 todo, 1은 doing, 2는 done
          progress: '0',
          label: postIssue.label,
          userId: postIssue.tags[i].id,
        };
        console.log(issuePayload);
        await pmAPI.post(`issues`, issuePayload);
      }
    } finally {
      this.setState({
        loading: false,
      });
    }
    alert('이슈가 정상적으로 등록되었습니다.');
    window.history.back(-1);
  };

  render() {
    const value = {
      ...this.state,
      handleWriteClick: this.handleWriteClick,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { CreateIssueProvider, Consumer as CreateIssueConsumer };
