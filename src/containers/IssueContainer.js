import React from 'react';
import Issue from '../components/Issue';
import { IssueConsumer } from '../contexts/IssueContext';
export default class IssueContainer extends React.Component {
  render() {
    return (
      <IssueConsumer>
        {({ issue, patchProgress }) => (
          <Issue issue={issue} patchProgress={patchProgress} />
        )}
      </IssueConsumer>
    );
  }
}
