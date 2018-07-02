import React from 'react';
import pmAPI from '../pmAPI';
const { Provider, Consumer } = React.createContext();

class CreateIssueProvider extends React.Component {
  state = {
    suggestions: [],
    labelSuggestions: [
      { id: '에러수정필요', name: '에러수정필요' },
      { id: '추가작업필요', name: '추가작업필요' },
      { id: '협업요청', name: '협업요청' },
      { id: '최적화작업필요', name: '최적화작업필요' },
      { id: '긴급', name: '긴급' },
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
    const res = await pmAPI.get(`projects/2/projectMembers?_expand=user`);
    const resdata = {
      id: res.data.map(item => item.id),
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
      for (let i = 0; i < postIssue.tags.length; i++) {
        const issuePayload = {
          title: postIssue.title,
          body: postIssue.body,
          projectId: 2,
          created: Math.round(this.state.created.getTime() / 1000),
          projectStart: Math.round(
            new Date(postIssue.projectStart).getTime() / 1000
          ),
          deadline: Math.round(new Date(postIssue.deadline).getTime() / 1000),
          // progress가 0은 todo, 1은 doing, 2는 done
          progress: 0,
          label: postIssue.label[0].name,
          userId: postIssue.tags[i].id,
        }; // 지금 2라고 해놓은 것은 테스트임!! 반드시 id 인자로 받게되면 projectId의 값 바꿔줘야한다
        await pmAPI.post(`issues`, issuePayload);
      }
    } finally {
      this.setState({
        loading: false,
      });
    }
    alert('이슈가 정상적으로 등록되었습니다.');
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
