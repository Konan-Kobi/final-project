import React from 'react';
import CreateProjectContainer from '../containers/CreateProjectContainer';
import { CreateProjectProvider } from '../contexts/CreateProjectContext';

export default class CreateProjectPage extends React.Component {
  render() {
    return (
      <CreateProjectProvider>
        <CreateProjectContainer />
      </CreateProjectProvider>
    );
  }
}
