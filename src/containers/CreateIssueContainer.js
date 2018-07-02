import React from 'react';
import { CreateIssueConsumer } from './../contexts/CreateIssueContext';
import CreateIssueForm from '../components/CreateIssueForm';
import { Dimmer, Loader } from 'semantic-ui-react';

export default class CreateIssueContainer extends React.Component {
  render() {
    return (
      <CreateIssueConsumer>
        {({ suggestions, labelSuggestions, handleWriteClick, loading }) =>
          loading ? (
            <Dimmer active inverted>
              <Loader size="large">Loading</Loader>
            </Dimmer>
          ) : (
            <CreateIssueForm
              suggestions={suggestions}
              labelSuggestions={labelSuggestions}
              handleWriteClick={handleWriteClick}
            />
          )
        }
      </CreateIssueConsumer>
    );
  }
}
