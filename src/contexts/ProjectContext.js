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
    countIssue: [],
    impendingIssue: [],
  };
  // 프로젝트 별로 현재 접속한 사용자의 이슈 개수와 완료된 이슈 개수 구하기 + doing done 구하기
  sortedIssue = issues => {
    let issueByProject = [];
    // 현재 접속한 사용자의 모든 이슈 중 완료된 이슈 구하기
    let issueCount = 0;
    let doneCount = 0;
    let doingCount = 0;
    let todoCount = 0;
    issues.data.forEach(item => {
      issueCount++;
      let obj = issueByProject.find(o => o.projectId === item.projectId);
      let done = 0;
      let doing = 0;
      let todo = 0;
      if (item.progress === '2') {
        done++;
        doneCount++;
      } else if (item.progress === '1') {
        doing++;
        doingCount++;
      } else {
        todo++;
        todoCount++;
      }
      if (obj) {
        obj.issues = obj.issues + 1;
        if (item.progress === '2') {
          obj.done = obj.done + 1;
        } else if (item.progress === '1') {
          obj.doing = obj.doing + 1;
        } else {
          obj.todo = obj.todo + 1;
        }
      } else {
        issueByProject.push({
          projectId: item.projectId,
          issues: 1,
          todo: todo,
          doing: doing,
          done: done,
        });
      }
    });
    return {
      issueByProject: issueByProject,
      countIssue: [todoCount, doingCount, doneCount, issueCount],
    };
  };
  // 진행상황이 done이 아닌 이슈 중 데드라인이 임박한 순서대로 정렬한 이슈들의 배열
  compare = (a, b) => {
    if (a.deadline < b.deadline) return -1;
    if (a.deadline > b.deadline) return 1;
    return 0;
  };
  getImpendingIssues = issues => {
    let filteredIssues = issues.filter(issue => issue.progress !== '2');
    filteredIssues = filteredIssues.sort(this.compare);
    this.setState({
      impendingIssue: filteredIssues,
    });
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    try {
      // prop으로 받아오기 안되서 다시 요청 보냄
      const userId = this.props.userId;
      // const userRes = await pmAPI.get('/me');
      const res = await pmAPI.get(
        `/projectMembers?userId=${userId}&_expand=project`
      );
      const issueRes = await pmAPI.get(
        `/issues?userId=${userId}&_expand=project&_expand=user`
      );
      const sortedIssue = this.sortedIssue(issueRes);
      this.getImpendingIssues(issueRes.data);
      this.setState({
        loading: true,
        projects: res.data,
        issues: issueRes.data,
        issueByProject: sortedIssue.issueByProject,
        countIssue: sortedIssue.countIssue,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }
  render() {
    const value = {
      ...this.state,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { ProjectProvider, Consumer as ProjectConsumer };
