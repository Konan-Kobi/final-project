import React from 'react';
import { CreateProjectConsumer } from './../contexts/CreateProjectContext';
import CreateProjectForm from '../components/CreateProjectForm';

export default class CreateProjectContainer extends React.Component {
  render() {
    return (
      <CreateProjectConsumer>
        {({ suggestions, handleWriteClick }) => (
          <CreateProjectForm
            suggestions={suggestions}
            handleWriteClick={handleWriteClick}
          />
        )}
      </CreateProjectConsumer>
    );
  }
}
