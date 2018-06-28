import React from 'react';
import pmAPI from '../pmAPI';
const { Provider, Consumer } = React.createContext();
class IssueProvider extends React.Component {
  static defaultProps = {
    userId: null, // 현재 로그인 한 사용자의 id
    projectId: null, // 이슈의 프로젝트 아이디(match)
    issueId: null, // 클릭한 이슈의 id (match)
  };
  state = {
    issue: {},
    loading: false,
    comments: [], // 해당 이슈의 코멘트
    username: '', // 이슈를 생성한 사용자의 useranme
    createUser: null, //이슈를 생성한 사용자의 id
  };
  async componentDidMount() {
    await this.fetchComment();
    await this.fetchIssue();
  }
  fetchIssue = async () => {
    this.setState({
      loading: true,
    });
    try {
      const res = await pmAPI.get(`/issues/${this.props.issueId}?_expand=user`);
      this.setState({
        issue: res.data,
        username: res.data.user.username,
        userId: this.props.userId,
        createUser: res.data.user.id,
      });
      console.log(this.state);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  fetchComment = async () => {
    this.setState({
      loading: true,
    });
    try {
      const commentRes = await pmAPI.get(
        `/comments?issueId=${this.props.issueId}&_expand=user`
      );
      this.setState({
        comments: commentRes.data,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };
  patchProgress = async progress => {
    this.setState({
      loading: true,
    });
    try {
      const payload = {
        progress: progress,
      };
      await pmAPI.patch(`/issues/${this.props.issueId}`, payload);
      this.fetchIssue();
    } finally {
      this.setState({
        loading: false,
      });
    }
  };
  deleteIssue = async e => {
    await pmAPI.delete(`/issues/${this.props.issueId}`);
  };
  deleteComment = async commentId => {
    await pmAPI.delete(`/comments/${commentId}`);
    this.fetchComment();
  };
  postComment = async body => {
    console.log(this.props.userId);
    const payload = {
      body: body,
      userId: this.props.userId,
      issueId: this.props.issueId,
      created: '',
    };
    await pmAPI.post(`/comments`, payload);
    this.fetchComment();
  };
  patchComment = async (body, commentId) => {
    await pmAPI.patch(`/comments/${commentId}`, {
      body: body,
    });
    // this.fetchComment();
  };
  render() {
    const value = {
      ...this.state,
      patchProgress: this.patchProgress,
      projectId: this.props.projectId,
      deleteIssue: this.deleteIssue,
      deleteComment: this.deleteComment,
      postComment: this.postComment,
      patchComment: this.patchComment,
      fetchComment: this.fetchComment,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { IssueProvider, Consumer as IssueConsumer };
