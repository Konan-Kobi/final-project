import React from 'react';
import { CreateIssueConsumer } from './../contexts/CreateIssueContext';
import CreateIssueForm from '../components/CreateIssueForm';

export default class CreateIssueContainer extends React.Component {
  render() {
    return (
      <CreateIssueConsumer>
        {({ suggestions, labelSuggestions, handleWriteClick }) => (
          <CreateIssueForm
            suggestions={suggestions}
            labelSuggestions={labelSuggestions}
            handleWriteClick={handleWriteClick}
          />
        )}
      </CreateIssueConsumer>
    );
  }
}
