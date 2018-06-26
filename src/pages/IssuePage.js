import React from 'react';
import IssueContainer from '../containers/IssueContainer';
import { IssueProvider } from '../contexts/IssueContext';
export default class IssuePage extends React.Component {
  render() {
    const id = this.props.match.params.id;
    console.log(id);
    return (
      <IssueProvider id={id}>
        <IssueContainer />;
      </IssueProvider>
    );
  }
}
