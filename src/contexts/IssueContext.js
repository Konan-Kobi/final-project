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
    this.setState({
      loading: true,
    });
    await this.fetchComment();
    await this.fetchIssue();
    this.setState({
      loading: false,
    });
  }

  fetchIssue = async () => {
    const res = await pmAPI.get(`/issues/${this.props.issueId}?_expand=user`);
    this.setState({
      issue: res.data,
      username: res.data.user.username,
      userId: this.props.userId,
      createUser: res.data.user.id,
    });
  };

  fetchComment = async () => {
    const commentRes = await pmAPI.get(
      `/comments?issueId=${this.props.issueId}&_expand=user`
    );
    this.setState({
      comments: commentRes.data,
    });
  };
  // issue를 작성한 username을 사용하고 있어서 한 번에 통신을 할 수가 없다.
  // comments?issueId=1&_expnad=user&_expand=issue
  patchProgress = async progress => {
    const payload = {
      progress: progress,
    };
    await pmAPI.patch(`/issues/${this.props.issueId}`, payload);
    this.fetchIssue();
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
