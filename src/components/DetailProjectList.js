import React from 'react';
import DetailProjectItem from '../components/DetailProjectItem';
export default class DetailProjectList extends React.Component {
  render() {
    const { issues } = this.props;
    return (
      <table>
        {issues.map(issue => <DetailProjectItem key={issue.id} {...issue} />)}
      </table>
    );
  }
}
