import React from 'react';
import CreateIssueContainer from '../containers/CreateIssueContainer';
import { CreateIssueProvider } from '../contexts/CreateIssueContext';

export default class CreateProjectPage extends React.Component {
  render() {
    return (
      <CreateIssueProvider>
        <CreateIssueContainer />
      </CreateIssueProvider>
    );
  }
}
