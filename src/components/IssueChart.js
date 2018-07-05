import React from 'react';
import { Pie } from 'react-chartjs-2';

export default class IssueChart extends React.Component {
  static defaultProps = {
    countIssue: [], // 현재 로그인 한 사용자가 맡은 이슈의 개수 [todo, doing, done] 순으로 정렬되어있음
  };
  state = {
    Data: {},
  };
  componentDidMount() {
    const { countIssue } = this.props;
    this.setState({
      Data: {
        labels: ['Todo', 'Doing', 'Done'],
        datasets: [
          {
            label: '이슈 현황',
            data: [countIssue[0], countIssue[1], countIssue[2]],
            backgroundColor: [
              'rgba(255,105,145,0.6)',
              'rgba(155,100,210,0.6)',
              'rgba(90,178,255,0.6)',
            ],
            title: {
              text: '나의 이슈 현황',
            },
          },
        ],
      },
    });
  }
  render() {
    return (
      <Pie data={this.state.Data} options={{ maintainAspectRatio: false }} />
    );
  }
}
