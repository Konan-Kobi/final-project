import React from 'react';
import DetailProjectContainer from '../containers/DetailProjectContainer';
import { DetailProjectProvider } from '../contexts/DetailProjectContext';

export default class DetailProjectPage extends React.Component {
  render() {
    const { projectId } = this.props.match.params;
    return (
      <DetailProjectProvider projectId={projectId}>
        <DetailProjectContainer />
      </DetailProjectProvider>
    );
  }
}
