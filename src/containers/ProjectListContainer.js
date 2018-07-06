import React from 'react';
import { ProjectConsumer } from '../contexts/ProjectContext';
import ProjectList from '../components/ProjectList';
import { Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
export default class ProjectListContainer extends React.Component {
  render() {
    return (
      <ProjectConsumer>
        {({ projects, issues, issueByProject }) =>
          projects.length === 0 ? (
            <Segment textAlign="center">
              <div className="create__project">
                <div>참여중인 프로젝트가 없습니다.</div>
              </div>
              <Link to="/create-project">
                <Button>프로젝트 등록하기</Button>
              </Link>
            </Segment>
          ) : (
            <ProjectList
              projects={projects}
              issues={issues}
              issueByProject={issueByProject}
            />
          )
        }
      </ProjectConsumer>
    );
  }
}
