import React from 'react';
import pmAPI from '../pmAPI';

const { Provider, Consumer } = React.createContext();

class EditIssueProvider extends React.Component {
  async componentDidMount() {
    const { issueId } = this.props;
    const res = await pmAPI.get(`/issues/${issueId}?_expand=user`);
  }

  render() {
    return <Provider>{this.props.children}</Provider>;
  }
}

export { EditIssueProvider, Consumer as EditIssueConsumer };
