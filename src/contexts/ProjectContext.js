import React from 'react';
import pmAPI from '../pmAPI';
const { Provider, Consumer } = React.createContext();
class ProjectProvider extends React.Component {
  state = {
    projects: [],
    loading: false,
    userId: null,
    issues: [],
    sortedIssues: [],
    countIssue: '',
  };
  // fetchProjects = async () => {
  //   try {
  //     // prop으로 받아오기 안되서 다시 요청 보냄
  //     const res = await pmAPI.get(
  //       `/projectMembers?userId=${this.state.userId}&_expand=project`
  //     );
  //     this.setState({
  //       projects: res.data,
  //     });
  //   } finally {
  //     this.setState({
  //       loading: true,
  //     });
  //   }
  // };
  // fetchIssues = async () => {
  //   this.setState({ loading: true });
  //   try {
  //     const res = await pmAPI.get(`/issues?userId=${this.state.userId}`);
  //     // 프로젝트 별로 이슈 개수와 완료된 이슈 개수
  //     const arr = [];
  //     res.data.forEach(item => {
  //       let obj = arr.find(o => o.projectId === item.projectId);
  //       let done = 0;
  //       if (item.progress === 'done') {
  //         done++;
  //       }
  //       if (obj) {
  //         obj.issues = obj.issues + 1;
  //         if ((item.progress = 'done')) {
  //           obj.done = obj.done + 1;
  //         } else {
  //           obj.done = 1;
  //         }
  //       } else {
  //         arr.push({ projectId: item.projectId, issues: 1, done: done });
  //       }
  //     });
  //     this.setState({
  //       issues: res.data,
  //       sortedIssues: arr,
  //     });
  //   } finally {
  //     this.setState({ loading: false });
  //   }
  // };
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
      console.log(issueRes.data);
      // 프로젝트 별로 이슈 개수와 완료된 이슈 개수 구하기
      const arr = [];
      // 개인 별 이슈 카운트
      let issueCount = 0;
      let doneCount = 0;
      issueRes.data.forEach(item => {
        issueCount++;
        let obj = arr.find(o => o.projectId === item.projectId);
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
          arr.push({ projectId: item.projectId, issues: 1, done: done });
        }
      });
      this.setState({
        loading: true,
        projects: res.data,
        issues: issueRes.data,
        sortedIssues: arr,
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
      sortedIssues: this.state.sortedIssues,
      countIssue: this.state.countIssue,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { ProjectProvider, Consumer as ProjectConsumer };
