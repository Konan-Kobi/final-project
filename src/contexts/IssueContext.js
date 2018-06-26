import React from 'react';
const { Provider, Consumer } = React.createContext();
class IssueProvider extends React.Component {
  render() {
    return <Provider>{this.props.children}</Provider>;
  }
}

export { IssueProvider, Consumer as IssueConsumer };
