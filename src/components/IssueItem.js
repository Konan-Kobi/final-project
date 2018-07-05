import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Label } from 'semantic-ui-react';
import { getRemainingHours } from '../DateAPI';
import { timeConverter } from '../DateAPI';
import { convertProgress, getLabelColor } from '../issueAPI';
export default class IssueItem extends React.Component {
  static defaultProps = {
    title: '', // issue 의 제목
    deadline: '', // issue 의 마감일
    label: '', // issue 의 라벨
    progress: '', // issue 의 진척상황
    id: null, // issue의 id
    projectStart: null, // issue의 시작일
  };
  render() {
    const {
      title,
      deadline,
      label,
      progress,
      id,
      projectId,
      projectStart,
    } = this.props;

    return (
      <Table.Row
        error={!(getRemainingHours(deadline).indexOf('-') || progress === '2')}
      >
        <Table.Cell>
          <Label size={'mini'} color={getLabelColor(label)}>
            {label}
          </Label>
        </Table.Cell>
        <Table.Cell>
          <Link to={`/project/${projectId}/issue/${id}`}>
            <div className="issue__text">{title}</div>
          </Link>
        </Table.Cell>
        <Table.Cell>{convertProgress(progress)}</Table.Cell>
        <Table.Cell>{projectStart}</Table.Cell>
        <Table.Cell>{timeConverter(deadline)[0]}</Table.Cell>
        <Table.Cell>{getRemainingHours(deadline)}</Table.Cell>
      </Table.Row>
    );
  }
}
