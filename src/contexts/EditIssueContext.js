import React from 'react';
import pmAPI from '../pmAPI';

const { Provider, Consumer } = React.createContext();

class EditIssueProvider extends React.Component {
  getIssue = async () => {
    const { issueId } = this.props;
    await pmAPI.get(`/issues/${issueId}?_expand=user`);
  };

  render() {
    return <Provider>{this.props.children}</Provider>;
  }
}

export { EditIssueProvider, Consumer as EditIssueConsumer };
