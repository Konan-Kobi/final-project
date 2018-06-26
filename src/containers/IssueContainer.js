import React from 'react';
import Issue from '../components/Issue';
import { IssueConsumer } from '../contexts/IssueContext';
export default class IssueContainer extends React.Component {
  render() {
    return (
      <IssueConsumer>{({ issue }) => <Issue issue={issue} />}</IssueConsumer>
    );
  }
}
