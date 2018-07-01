import React from 'react';
import CreateProjectContainer from '../containers/CreateProjectContainer';
import { CreateProjectProvider } from '../contexts/CreateProjectContext';

export default class CreateProjectPage extends React.Component {
  render() {
    const { projectId } = this.props.match.params;
    return (
      <CreateProjectProvider projectId={projectId}>
        <CreateProjectContainer />
      </CreateProjectProvider>
    );
  }
}
