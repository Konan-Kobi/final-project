import React from 'react';
import { ProjectConsumer } from '../contexts/ProjectContext';
import { Table } from 'semantic-ui-react';
import { timeConverter, getRemainingHours } from '../DateAPI';
import { Link } from 'react-router-dom';
export default class ImpendingIssueContainer extends React.Component {
  render() {
    return (
      <ProjectConsumer>
        {({ impendingIssue }) =>
          impendingIssue.length === 0 ? (
            <div>등록 된 이슈가 없습니다.</div>
          ) : (
            <div className="issue__container">
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>title</Table.HeaderCell>
                    <Table.HeaderCell>마감기한</Table.HeaderCell>
                    <Table.HeaderCell>남은시간</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {impendingIssue.map(issue => (
                    <Table.Row
                      error={
                        !(
                          getRemainingHours(issue.deadline).indexOf('-') ||
                          issue.progress === '2'
                        )
                      }
                    >
                      <Table.Cell>
                        <Link
                          to={`/project/${issue.id}/issue/${issue.projectId}`}
                        >
                          {issue.title}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        {timeConverter(issue.deadline)[0]}
                      </Table.Cell>
                      <Table.Cell>
                        {getRemainingHours(issue.deadline)}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          )
        }
      </ProjectConsumer>
    );
  }
}
