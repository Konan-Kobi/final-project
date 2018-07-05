import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Icon, Header } from 'semantic-ui-react';
export default class ProjectItem extends React.Component {
  static defaultProps = {
    title: '', // project의 title
    issueByProject: [], // 접속한 사용자가 맡은 프로젝트별로 issue와 done의 개수 [{projectId: 1, issues: 4. done: 3}]
    id: null, // projectId
  };
  render() {
    const { title, issueByProject, id } = this.props;
    let issueCount = [];
    let issue = issueByProject.find(o => o.projectId == id);
    console.log(id, issueByProject, issue);
    if (issue) {
      issueCount = [issue.todo, issue.doing, issue.done];
    } else {
      issueCount = [0, 0, 0];
    }

    return (
      <Grid centered celled>
        <Grid.Row>
          <div className="title">
            <Header as="h2">
              <Link to={`project/${id}`}>{title}</Link>
            </Header>
          </div>
        </Grid.Row>
        <Grid.Row>
          <Grid.Row>
            <Grid columns="equal">
              <Grid.Column>
                <Icon name="tasks" />
              </Grid.Column>
              <Grid.Column>{`Todo ${issueCount[0]}`}</Grid.Column>
              <Grid.Column>{`Doing ${issueCount[1]}`}</Grid.Column>
              <Grid.Column>{`Done ${issueCount[2]}`}</Grid.Column>
            </Grid>
          </Grid.Row>
        </Grid.Row>
      </Grid>
    );
  }
}
