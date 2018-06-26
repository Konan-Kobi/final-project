import React from 'react';
import pmAPI from '../pmAPI';
const { Provider, Consumer } = React.createContext();
class ProjectProvider extends React.Component {
  state = {
    projects: [],
    loading: false,
    userId: null,
    issues: [],
    issueByProject: [],
    countIssue: '',
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    try {
      // prop으로 받아오기 안되서 다시 요청 보냄
      // const { userId } = this.props;
      const userRes = await pmAPI.get('/me');
      const res = await pmAPI.get(
        `/projectMembers?userId=${userRes.data.id}&_expand=project`
      );
      const issueRes = await pmAPI.get(`/issues?userId=${userRes.data.id}`);

      // 프로젝트 별로 현재 접속한 사용자의 이슈 개수와 완료된 이슈 개수 구하기
      let issueByProject = [];
      // 현재 접속한 사용자의 모든 이슈 중 완료된 이슈 구하기
      let issueCount = 0;
      let doneCount = 0;
      issueRes.data.forEach(item => {
        issueCount++;
        let obj = issueByProject.find(o => o.projectId === item.projectId);
        let done = 0;
        if (item.progress === 'done') {
          done++;
          doneCount++;
        }
        if (obj) {
          obj.issues = obj.issues + 1;
          if (item.progress === 'done') {
            obj.done = obj.done + 1;
          }
        } else {
          issueByProject.push({
            projectId: item.projectId,
            issues: 1,
            done: done,
          });
        }
      });
      this.setState({
        loading: true,
        projects: res.data,
        issues: issueRes.data,
        issueByProject: issueByProject,
        countIssue: `${doneCount}/${issueCount}`,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }
  render() {
    const value = {
      projects: this.state.projects,
      issues: this.state.issues,
      issueByProject: this.state.sortedIssues,
      countIssue: this.state.countIssue,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { ProjectProvider, Consumer as ProjectConsumer };
