import React from 'react';
import { EditIssueConsumer } from './../contexts/EditIssueContext';
import EditIssueForm from '../components/EditIssueForm';
import { Dimmer, Loader } from 'semantic-ui-react';

export default class EditIssueContainer extends React.Component {
  render() {
    return (
      <EditIssueConsumer>
        {({
          title,
          body,
          projectStart,
          deadline,
          label,
          userTag,
          labelSuggestions,
          handleWriteClick,
        }) => (
          <EditIssueForm
            title={title}
            body={body}
            projectStart={projectStart}
            deadline={deadline}
            label={label}
            labelSuggestions={labelSuggestions}
            userTag={userTag}
            handleWriteClick={handleWriteClick}
          />
        )}
      </EditIssueConsumer>
    );
  }
}
