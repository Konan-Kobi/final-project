import React from 'react';
import DetailProjectList from '../components/DetailProjectList';
import { DetailProjectConsumer } from '../contexts/DetailProjectContext';
import Project from '../components/Project';
import { Link } from 'react-router-dom';
import { Grid, Button, Divider } from 'semantic-ui-react';
export default class DetailProjectContainer extends React.Component {
  render() {
    const { projectId } = this.props;
    return (
      <DetailProjectConsumer>
        {({ issues, projectMembers, projectTitle, projectBody }) => (
          <React.Fragment>
            <Project
              projectMembers={projectMembers}
              projectTitle={projectTitle}
              projectBody={projectBody}
            />
            <Divider section />
            <div className="DetailProject__IssueList">
              <Grid columns="equal">
                <Grid.Row>
                  <Grid.Column textAlign={'left'}>
                    <h2 style={{ display: 'inline-block' }}>이슈 리스트</h2>
                  </Grid.Column>
                  <Grid.Column width={10} id="DetailProject__GridColumn" />
                  <Grid.Column textAlign={'right'}>
                    <Link to={`/create-issue/${projectId}`}>
                      <Button color="grey" id="DetailProject__Button">
                        이슈 추가
                      </Button>
                    </Link>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
            <DetailProjectList issues={issues} />
          </React.Fragment>
        )}
      </DetailProjectConsumer>
    );
  }
}
